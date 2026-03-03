// screens/member/exercise/ExerciseSessionScreen.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Picker } from "@react-native-picker/picker";
import { upsertExerciseSessionByGuid } from "../../../db/exerciseDb";

function pad2(n) {
  return String(n).padStart(2, "0");
}
function toDateIso(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

const VIDEO_MAP = {
  pushup: require("../../../assets/videos/pushup.mp4"),
  pushups: require("../../../assets/videos/pushup.mp4"),
  squat: require("../../../assets/videos/squats.mp4"),
  squats: require("../../../assets/videos/squats.mp4"),
  running: require("../../../assets/videos/running.mp4"),
  default: require("../../../assets/videos/pushup.mp4"),
};

const COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

function estimateTargetSeconds(count) {
  return Math.max(8, Math.round(count * 2));
}
function makeGuid() {
  return `sess_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

export default function ExerciseSessionScreen({ route }) {
  const userEmail = (route?.params?.userEmail || route?.params?.email || "").toLowerCase();
  const userName = route?.params?.fullName || route?.params?.userName || "";
  const exerciseName = route?.params?.exerciseName || "Exercise";

  const setsParam = route?.params?.sets;
  const setsCount =
    typeof route?.params?.setsCount === "number"
      ? route.params.setsCount
      : Array.isArray(setsParam)
      ? setsParam.length
      : 6;

  const videoKey = (exerciseName || "").toLowerCase();
  const videoSource = VIDEO_MAP[videoKey] || VIDEO_MAP.default;

  const sessionGuidRef = useRef(makeGuid());
  const sessionStartRef = useRef(null);
  const sessionLastStopRef = useRef(null);

  // ✅ FIX #3: not expanded by default
  const [activeIndex, setActiveIndex] = useState(null);

  const initialSets = useMemo(() => {
    return Array.from({ length: setsCount }, (_, i) => {
      const prefill =
        Array.isArray(setsParam) && Array.isArray(setsParam[i]) && typeof setsParam[i][0] === "number"
          ? setsParam[i][0]
          : 10;

      const count = COUNT_OPTIONS.includes(prefill) ? prefill : 10;

      return {
        index: i,
        count,
        targetSec: estimateTargetSeconds(count),
        elapsedSec: 0,
        status: "idle", // idle | running | paused | done
        startedAtIso: null,
        stoppedAtIso: null,
        progress: 0,
      };
    });
  }, [setsCount, setsParam]);

  const [setStates, setSetStates] = useState(initialSets);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const timersRef = useRef({});
  const scrollRef = useRef(null);
  const rowYRef = useRef({});

  // session timer (seconds)
  useEffect(() => {
    const id = setInterval(() => {
      const anyRunning = setStates.some((s) => s.status === "running");
      if (!anyRunning) return;
      const start = sessionStartRef.current;
      if (!start) return;

      const now = new Date();
      setSessionSeconds(Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000)));
    }, 1000);

    return () => clearInterval(id);
  }, [setStates]);

  const doneCount = setStates.filter((s) => s.status === "done").length;

  const stopTimer = (idx) => {
    const id = timersRef.current[idx];
    if (id) {
      clearInterval(id);
      delete timersRef.current[idx];
    }
  };

  const startSet = (idx) => {
    const now = new Date();
    if (!sessionStartRef.current) {
      sessionStartRef.current = now;
      setSessionSeconds(0);
    }

    setIsSaved(false);

    // set running
    setSetStates((prev) =>
      prev.map((s, i) =>
        i === idx
          ? {
              ...s,
              status: "running",
              startedAtIso: s.startedAtIso || now.toISOString(),
              stoppedAtIso: null,
            }
          : s
      )
    );

    stopTimer(idx);
    timersRef.current[idx] = setInterval(() => {
      setSetStates((prev) => {
        const cur = prev[idx];
        if (!cur || cur.status !== "running") return prev;

        const nextElapsed = cur.elapsedSec + 1;
        const p = clamp(nextElapsed / (cur.targetSec || 1), 0, 1);

        return prev.map((s, i) =>
          i === idx ? { ...s, elapsedSec: nextElapsed, progress: p } : s
        );
      });
    }, 1000);
  };

  const pauseSet = (idx) => {
    setIsSaved(false);
    stopTimer(idx);
    setSetStates((prev) => prev.map((s, i) => (i === idx ? { ...s, status: "paused" } : s)));
  };

  const resumeSet = (idx) => startSet(idx);

  const stopSetAndSave = async (idx) => {
    const now = new Date();
    stopTimer(idx);

    // mark done
    setSetStates((prev) =>
      prev.map((s, i) =>
        i === idx
          ? { ...s, status: "done", progress: 1, stoppedAtIso: now.toISOString() }
          : s
      )
    );

    sessionLastStopRef.current = now;

    // auto-scroll to next set & open it
    const nextIdx = idx + 1;
    if (nextIdx < setStates.length) {
      setActiveIndex(nextIdx);
      const y = rowYRef.current[nextIdx];
      if (typeof y === "number" && scrollRef.current?.scrollTo) {
        scrollRef.current.scrollTo({ y: Math.max(0, y - 8), animated: true });
      }
    } else {
      setActiveIndex(null);
    }

    // silent autosave
    try {
      const guid = sessionGuidRef.current;
      const sessionStart = sessionStartRef.current || now;
      const sessionStop = sessionLastStopRef.current || now;

      const durationSec = Math.max(
        0,
        Math.floor((sessionStop.getTime() - sessionStart.getTime()) / 1000)
      );

      const payloadSets = setStates.map((s, i) => ({
        setNumber: i + 1,
        count: s.count,
        targetSec: s.targetSec,
        elapsedSec: s.elapsedSec,
        status: i === idx ? "done" : s.status,
        progress: i === idx ? 1 : s.progress,
        startedAtIso: s.startedAtIso,
        stoppedAtIso: i === idx ? now.toISOString() : s.stoppedAtIso,
      }));

      await upsertExerciseSessionByGuid(guid, {
        userEmail,
        userName,
        exerciseName,
        startTimeIso: sessionStart.toISOString(),
        stopTimeIso: sessionStop.toISOString(),
        dateIso: toDateIso(sessionStart),
        durationSec,
        setsJson: JSON.stringify(payloadSets),
      });

      setIsSaved(true);
    } catch (e) {
      console.warn("Auto-save failed:", e);
      setIsSaved(false);
    }
  };

  // ✅ FIX #2: picker values as strings (Android picker selection becomes stable)
  const onChangeCount = (idx, valStr) => {
    const count = parseInt(String(valStr), 10);
    const targetSec = estimateTargetSeconds(count);

    setIsSaved(false);

    setSetStates((prev) =>
      prev.map((s, i) => {
        if (i !== idx) return s;
        if (s.status === "running") return s; // still block while running
        return {
          ...s,
          count,
          targetSec,
          progress: clamp(s.elapsedSec / (targetSec || 1), 0, 1),
        };
      })
    );
  };

  const renderControls = (idx, st) => {
    const iconBtn = (onPress, icon, disabled = false, danger = false) => (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.iconBtn,
          disabled && { opacity: 0.35 },
          danger && styles.iconBtnDanger,
        ]}
      >
        <Ionicons name={icon} size={18} color="#e5e7eb" />
      </TouchableOpacity>
    );

    const canStart = st.status === "idle" || st.status === "paused";
    const canPause = st.status === "running";
    const canStop = st.status === "running" || st.status === "paused";

    return (
      <View style={styles.controlsRow}>
        {iconBtn(() => startSet(idx), "play", !canStart)}
        {st.status === "running"
          ? iconBtn(() => pauseSet(idx), "pause", !canPause)
          : iconBtn(() => resumeSet(idx), "play-forward", st.status !== "paused")}
        {iconBtn(() => stopSetAndSave(idx), "stop", !canStop, true)}
      </View>
    );
  };

  const toggleExpand = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Title + Saved indicator */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{exerciseName}</Text>
          <View style={styles.savedPill}>
            <Ionicons
              name={isSaved ? "save" : "save-outline"}
              size={16}
              color={isSaved ? "#38bdf8" : "#94a3b8"}
            />
            <Text style={[styles.savedText, isSaved && { color: "#38bdf8" }]}>
              {isSaved ? "Saved" : "Saving"}
            </Text>
          </View>
        </View>

        {/* Video */}
        <View style={styles.videoBox}>
          <Video
            source={videoSource}
            style={styles.video}
            resizeMode="cover"
            useNativeControls
            isLooping
            shouldPlay={false}
          />
        </View>

        {/* Meta pills */}
        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Ionicons name="timer-outline" size={16} color="#38bdf8" />
            <Text style={styles.metaText}>{sessionSeconds}s</Text>
          </View>
          <View style={styles.metaPill}>
            <Ionicons name="checkmark-done-outline" size={16} color="#22c55e" />
            <Text style={styles.metaText}>
              {doneCount}/{setStates.length} sets
            </Text>
          </View>
        </View>

        {/* ✅ FIX #1: inner scroll works (with visible scrollbar) */}
        <View style={styles.setsBox}>
          <View style={styles.setsHeader}>
            <Text style={styles.sectionTitle}>Sets</Text>
            <Text style={styles.sectionSub}>Tap a set to expand • Stop auto-saves</Text>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.setsScroll}
            contentContainerStyle={styles.setsScrollContent}
            persistentScrollbar={true}        // ✅ Android visible scrollbar
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {setStates.map((st, idx) => {
              const isActive = idx === activeIndex;

              return (
                <View
                  key={idx}
                  onLayout={(e) => {
                    rowYRef.current[idx] = e.nativeEvent.layout.y;
                  }}
                  style={styles.setCardWrap}
                >
                  <TouchableOpacity
                    activeOpacity={0.92}
                    delayPressIn={120} // helps scroll gestures win over press
                    onPress={() => toggleExpand(idx)}
                    style={[
                      styles.setCard,
                      isActive && styles.setCardActive,
                      st.status === "done" && styles.setCardDone,
                    ]}
                  >
                    {/* progress bar behind */}
                    <View pointerEvents="none" style={styles.progressBack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.round(clamp(st.progress, 0, 1) * 100)}%`,
                            opacity: isActive ? 0.30 : 0.18,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.setTopRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.setTitle}>Set {idx + 1}</Text>
                        <Text style={styles.setSub}>
                          {st.elapsedSec}s / {st.targetSec}s • {st.count} reps
                        </Text>
                      </View>

                      <View style={styles.statusDotWrap}>
                        {st.status === "done" ? (
                          <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                        ) : st.status === "running" ? (
                          <Ionicons name="pulse" size={18} color="#f97316" />
                        ) : st.status === "paused" ? (
                          <Ionicons name="pause-circle" size={18} color="#38bdf8" />
                        ) : (
                          <Ionicons name="ellipse-outline" size={18} color="#94a3b8" />
                        )}
                      </View>
                    </View>

                    {isActive && (
                      <View style={styles.expandArea}>
                        <View style={styles.row}>
                          <View style={styles.pickerWrap}>
                            <Ionicons name="list-outline" size={16} color="#94a3b8" />
                            <Text style={styles.pickerLabel}>Reps</Text>
                          </View>

                          <View style={styles.pickerBox}>
                            <Picker
                              selectedValue={String(st.count)} // ✅ string
                              onValueChange={(val) => onChangeCount(idx, val)}
                              style={styles.picker}
                              dropdownIconColor="#e5e7eb"
                              enabled={st.status !== "running"}
                              mode="dropdown"
                            >
                              {COUNT_OPTIONS.map((n) => (
                                <Picker.Item key={n} label={`${n}`} value={String(n)} />
                              ))}
                            </Picker>
                          </View>

                          <View style={styles.targetPill}>
                            <Ionicons name="hourglass-outline" size={16} color="#38bdf8" />
                            <Text style={styles.targetText}>{st.targetSec}s</Text>
                          </View>
                        </View>

                        {renderControls(idx, st)}

                        <Text style={styles.hint}>
                          Start → Pause/Resume → Stop (Stop = Done + Auto-save)
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  screen: { flex: 1, padding: 14 },

  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  title: { color: "#f8fafc", fontSize: 22, fontWeight: "900" },

  savedPill: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0b1220",
  },
  savedText: { color: "#94a3b8", fontWeight: "800", fontSize: 12 },

  videoBox: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  video: { width: "100%", height: 200, backgroundColor: "#0f172a" },

  metaRow: { flexDirection: "row", gap: 10, marginTop: 12, marginBottom: 10 },
  metaPill: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0b1220",
  },
  metaText: { color: "#e5e7eb", fontWeight: "800", fontSize: 12 },

  // ✅ important for Android: minHeight: 0 lets inner ScrollView scroll properly in flex layouts
  setsBox: {
    flex: 1,
    minHeight: 0,
    marginTop: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#07101f",
    overflow: "hidden",
  },
  setsHeader: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0f1b33",
    backgroundColor: "#07101f",
  },
  sectionTitle: { color: "#e5e7eb", fontWeight: "900", fontSize: 14 },
  sectionSub: { color: "#94a3b8", marginTop: 4, fontSize: 12 },

  setsScroll: { flex: 1, minHeight: 0, paddingHorizontal: 12, paddingTop: 10 },
  setsScrollContent: { paddingBottom: 18 },

  setCardWrap: { marginBottom: 10 },
  setCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#13213d",
    backgroundColor: "#0b152a",
    padding: 12,
    overflow: "hidden",
  },
  setCardActive: {
    borderColor: "rgba(56,189,248,0.55)",
    shadowColor: "#38bdf8",
    shadowOpacity: Platform.OS === "ios" ? 0.18 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  setCardDone: { borderColor: "rgba(34,197,94,0.45)", backgroundColor: "#081a12" },

  progressBack: { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 },
  progressFill: { height: "100%", backgroundColor: "#38bdf8" },

  setTopRow: { flexDirection: "row", alignItems: "center" },
  setTitle: { color: "#f8fafc", fontWeight: "900", fontSize: 14 },
  setSub: { color: "#94a3b8", marginTop: 3, fontSize: 12, fontWeight: "700" },

  statusDotWrap: {
    marginLeft: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "rgba(2,6,23,0.55)",
  },

  expandArea: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(148,163,184,0.18)",
  },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },

  pickerWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  pickerLabel: { color: "#94a3b8", fontWeight: "800", fontSize: 12 },

  pickerBox: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#061021",
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: { height: 38, color: "#e5e7eb", marginTop: -6 },

  targetPill: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#061021",
  },
  targetText: { color: "#e5e7eb", fontWeight: "900", fontSize: 12 },

  controlsRow: { marginTop: 10, flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 42,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "rgba(2,6,23,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnDanger: { borderColor: "rgba(239,68,68,0.45)", backgroundColor: "rgba(239,68,68,0.12)" },

  hint: { marginTop: 8, color: "#94a3b8", fontSize: 11, fontWeight: "700" },
});
