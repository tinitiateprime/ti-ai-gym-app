import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { Picker } from "@react-native-picker/picker";

import {
  getDailyWorkoutSession,
  getUserExercisesFilePath,
  saveWorkoutProgress,
  debugPrintUserExercisesJson,
} from "../../api/storage/userExercisesStorage";
import { findWorkoutById } from "../../constants/workoutCatalog";
import { getWorkoutVideoSource } from "../../constants/videoRegistry";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function makeGuid() {
    `sess_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function buildInitialSetStates(totalSets, defaultTimerSec, defaultReps) {
  return Array.from({ length: totalSets }, (_, i) => ({
    index: i,
    timerSec: defaultTimerSec,
    targetReps: defaultReps ?? 10,
    completedReps: defaultReps ?? 10,
    elapsedSec: 0,
    status: "idle",
    startedAtIso: null,
    stoppedAtIso: null,
    progress: 0,
  }));
}

export default function ExerciseSessionScreen({ route }) {
  const userEmail = (
    route?.params?.userEmail ||
    route?.params?.email ||
    ""
  ).toLowerCase();

  const userName = route?.params?.fullName || route?.params?.userName || "";

  const routeWorkoutId = route?.params?.workoutId || null;
  const routeWorkoutConfig = route?.params?.workoutConfig || null;

  const workout =
    routeWorkoutConfig ||
    findWorkoutById(routeWorkoutId) || {
      id: "fallback-workout",
      name: route?.params?.exerciseName || "Exercise",
      category: route?.params?.category || "Workout",
      workoutTypeId: route?.params?.workoutTypeId || "general",
      workoutTypeName: route?.params?.workoutTypeName || "General",
      defaultSets: Number(route?.params?.setsCount || 3),
      defaultTimerSec: Number(route?.params?.defaultTimerSec || 20),
      defaultReps: Number(route?.params?.defaultReps || 10),
      mode: route?.params?.mode || "timer",
      videoKey: route?.params?.videoKey || "default",
      timerOptions: [10, 15, 20, 30, 45, 60],
      repsOptions: [5, 8, 10, 12, 15, 20],
      setOptions: [1, 2, 3, 4, 5, 6, 8, 10],
    };

  const workoutId = workout.id;
  const workoutName = workout.name || "Exercise";
  const category = workout.category || "Workout";
  const workoutTypeName = workout.workoutTypeName || "General";
  const mode = workout.mode || "timer";

  const baseDefaultSets = Number(workout.defaultSets || 3);
  const defaultTimerSec = Number(workout.defaultTimerSec || 20);
  const defaultReps = Number(workout.defaultReps || 10);

  const timerOptions =
    Array.isArray(workout.timerOptions) && workout.timerOptions.length
      ? workout.timerOptions
      : [10, 15, 20, 30, 45, 60];

  const repsOptions =
    Array.isArray(workout.repsOptions) && workout.repsOptions.length
      ? workout.repsOptions
      : [5, 8, 10, 12, 15, 20];

  const setOptions =
    Array.isArray(workout.setOptions) && workout.setOptions.length
      ? workout.setOptions
      : [1, 2, 3, 4, 5, 6, 8, 10];

  const videoSource = getWorkoutVideoSource(workout.videoKey || "default");

  const sessionGuidRef = useRef(makeGuid());
  const sessionStartRef = useRef(null);

  const intervalRefs = useRef({});
  const timeoutRefs = useRef({});
  const outerScrollRef = useRef(null);
  const rowYRef = useRef({});

  const [plannedSets, setPlannedSets] = useState(baseDefaultSets);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isClosedForToday, setIsClosedForToday] = useState(false);
  const [loadingTodayState, setLoadingTodayState] = useState(true);

  const initialSets = useMemo(() => {
    return buildInitialSetStates(plannedSets, defaultTimerSec, defaultReps);
  }, [plannedSets, defaultTimerSec, defaultReps]);

  const [setStates, setSetStates] = useState(initialSets);

  useEffect(() => {
    console.log("userExercises.json saved at:", getUserExercisesFilePath());
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingTodayState(true);

        const existing = await getDailyWorkoutSession(userEmail, workoutId);

        if (!mounted) return;

        if (existing) {
          const totalSets = Number(existing.total_sets_planned || baseDefaultSets);
          const nextStates = buildInitialSetStates(
            totalSets,
            defaultTimerSec,
            defaultReps
          );

          (existing.metrics || []).forEach((m, idx) => {
            const targetIndex = Number(m?.set_number || idx + 1) - 1;
            if (!nextStates[targetIndex]) return;

            nextStates[targetIndex] = {
              ...nextStates[targetIndex],
              targetReps: Number(m?.reps || defaultReps),
              completedReps: Number(m?.reps || defaultReps),
              elapsedSec: Number(m?.duration_sec || 0),
              timerSec: Number(m?.timer_sec || defaultTimerSec),
              status: "done",
              startedAtIso: m?.started_at_iso || null,
              stoppedAtIso: m?.stopped_at_iso || null,
              progress: 1,
            };
          });

          setPlannedSets(totalSets);
          setSetStates(nextStates);
          setActiveIndex(
            existing.session_closed_for_day
              ? null
              : Math.min(Number(existing.completed_sets || 0), totalSets - 1)
          );
          setIsClosedForToday(!!existing.session_closed_for_day);
          setIsSaved(true);

          const startIso = existing.workout_datetime || null;
          sessionStartRef.current = startIso ? new Date(startIso) : null;

          if (sessionStartRef.current) {
            const now = new Date();
            const diff = Math.max(
              0,
              Math.floor((now.getTime() - sessionStartRef.current.getTime()) / 1000)
            );
            setSessionSeconds(diff);
          }
        } else {
          sessionGuidRef.current = makeGuid();
          sessionStartRef.current = null;
          setPlannedSets(baseDefaultSets);
          setSetStates(buildInitialSetStates(baseDefaultSets, defaultTimerSec, defaultReps));
          setActiveIndex(0);
          setSessionSeconds(0);
          setIsSaved(false);
          setIsClosedForToday(false);
        }
      } catch (error) {
        console.warn("Failed to load daily workout session:", error);
      } finally {
        if (mounted) {
          setLoadingTodayState(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userEmail, workoutId, baseDefaultSets, defaultTimerSec, defaultReps]);

  useEffect(() => {
    const id = setInterval(() => {
      const anyRunning = setStates.some((s) => s.status === "running");
      if (!anyRunning) return;

      const start = sessionStartRef.current;
      if (!start) return;

      const now = new Date();
      setSessionSeconds(
        Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000))
      );
    }, 1000);

    return () => clearInterval(id);
  }, [setStates]);

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  const doneCount = setStates.filter((s) => s.status === "done").length;

  const totalRepsDone = setStates
    .filter((s) => s.status === "done")
    .reduce((sum, s) => sum + Number(s.completedReps || 0), 0);

  const clearSetTimers = (idx) => {
    const intervalId = intervalRefs.current[idx];
    if (intervalId) {
      clearInterval(intervalId);
      delete intervalRefs.current[idx];
    }

    const timeoutId = timeoutRefs.current[idx];
    if (timeoutId) {
      clearTimeout(timeoutId);
      delete timeoutRefs.current[idx];
    }
  };

  const persistWorkout = async (nextStates) => {
    try {
      const startIso =
        sessionStartRef.current?.toISOString() || new Date().toISOString();

      const saved = await saveWorkoutProgress({
        userEmail,
        userName,
        workout: {
          ...workout,
          totalSetsPlanned: plannedSets,
        },
        sessionStartIso: startIso,
        setStates: nextStates,
      });

      console.log("Saved workout session =>", saved);
      console.log("userExercises.json saved at =>", getUserExercisesFilePath());
      await debugPrintUserExercisesJson();

      setIsSaved(true);
      setIsClosedForToday(!!saved?.session_closed_for_day);
      return saved;
    } catch (error) {
      console.warn("Failed to save workout progress:", error);
      setIsSaved(false);
      return null;
    }
  };

  const startOrResumeSet = (idx) => {
    if (isClosedForToday) return;

    const now = new Date();
    const current = setStates[idx];
    if (!current) return;

    if (!sessionStartRef.current) {
      sessionStartRef.current = now;
      setSessionSeconds(0);
    }

    const alreadyElapsed = current.elapsedSec || 0;
    const timerSec = current.timerSec || defaultTimerSec;
    const remainingSec = Math.max(1, timerSec - alreadyElapsed);

    setIsSaved(false);

    const nextStates = setStates.map((s, i) =>
      i === idx
        ? {
            ...s,
            status: "running",
            startedAtIso: s.startedAtIso || now.toISOString(),
            stoppedAtIso: null,
          }
        : s
    );

    setSetStates(nextStates);
    clearSetTimers(idx);

    intervalRefs.current[idx] = setInterval(() => {
      setSetStates((prev) => {
        const cur = prev[idx];
        if (!cur || cur.status !== "running") return prev;

        const nextElapsed = Math.min(cur.timerSec, cur.elapsedSec + 1);
        const nextProgress = clamp(nextElapsed / (cur.timerSec || 1), 0, 1);

        return prev.map((s, i) =>
          i === idx
            ? {
                ...s,
                elapsedSec: nextElapsed,
                progress: nextProgress,
              }
            : s
        );
      });
    }, 1000);

    timeoutRefs.current[idx] = setTimeout(() => {
      stopSetAndSave(idx, "auto");
    }, remainingSec * 1000);
  };

  const pauseSet = (idx) => {
    if (isClosedForToday) return;

    setIsSaved(false);
    clearSetTimers(idx);

    setSetStates((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, status: "paused" } : s))
    );
  };

  const stopSetAndSave = async (idx, stopReason = "manual") => {
    if (isClosedForToday) return;

    const now = new Date();
    clearSetTimers(idx);

    const current = setStates[idx];
    if (!current) return;

    const finalElapsed =
      stopReason === "auto"
        ? current.timerSec
        : Math.min(current.elapsedSec || 0, current.timerSec || 0);

    const completedReps = Number(current.completedReps ?? current.targetReps ?? defaultReps);

    const nextStates = setStates.map((s, i) =>
      i === idx
        ? {
            ...s,
            elapsedSec: finalElapsed,
            completedReps,
            progress: 1,
            status: "done",
            stoppedAtIso: now.toISOString(),
            startedAtIso: s.startedAtIso || now.toISOString(),
          }
        : s
    );

    setSetStates(nextStates);

    const nextDoneCount = nextStates.filter((s) => s.status === "done").length;

    if (nextDoneCount < plannedSets) {
      const nextIdx = idx + 1;
      setActiveIndex(nextIdx);

      const y = rowYRef.current[nextIdx];
      if (typeof y === "number" && outerScrollRef.current?.scrollTo) {
        outerScrollRef.current.scrollTo({
          y: Math.max(0, y - 220),
          animated: true,
        });
      }
    } else {
      setActiveIndex(null);
    }

    await persistWorkout(nextStates);
  };

  const onChangeTimer = (idx, valStr) => {
    if (isClosedForToday) return;

    const timerSec = parseInt(String(valStr), 10);
    setIsSaved(false);

    setSetStates((prev) =>
      prev.map((s, i) => {
        if (i !== idx) return s;
        if (s.status === "running" || s.status === "done") return s;

        return {
          ...s,
          timerSec,
          elapsedSec: 0,
          startedAtIso: null,
          stoppedAtIso: null,
          status: "idle",
          progress: 0,
        };
      })
    );
  };

  const onChangeReps = (idx, valStr) => {
    if (isClosedForToday) return;

    const reps = parseInt(String(valStr), 10);
    setIsSaved(false);

    setSetStates((prev) =>
      prev.map((s, i) => {
        if (i !== idx) return s;
        if (s.status === "done") return s;

        return {
          ...s,
          targetReps: reps,
          completedReps: reps,
        };
      })
    );
  };

  const onChangePlannedSets = (valStr) => {
    if (doneCount > 0 || isClosedForToday) return;

    const nextTotal = parseInt(String(valStr), 10);
    setPlannedSets(nextTotal);
    setSetStates(buildInitialSetStates(nextTotal, defaultTimerSec, defaultReps));
    setActiveIndex(0);
    setSessionSeconds(0);
    sessionStartRef.current = null;
    sessionGuidRef.current = makeGuid();
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

    const canStart = !isClosedForToday && (st.status === "idle" || st.status === "paused");
    const canPause = !isClosedForToday && st.status === "running";
    const canStop = !isClosedForToday && (st.status === "running" || st.status === "paused");

    return (
      <View style={styles.controlsRow}>
        {iconBtn(() => startOrResumeSet(idx), "play", !canStart)}
        {st.status === "running"
          ? iconBtn(() => pauseSet(idx), "pause", !canPause)
          : iconBtn(
              () => startOrResumeSet(idx),
              "play-forward",
              st.status !== "paused" || isClosedForToday
            )}
        {iconBtn(() => stopSetAndSave(idx, "manual"), "stop", !canStop, true)}
      </View>
    );
  };

  const toggleExpand = (idx) => {
    if (isClosedForToday) return;
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  if (loadingTodayState) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.screen, styles.centered]}>
          <Text style={styles.loadingText}>Loading today’s workout...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
  <SafeAreaView style={styles.safe}>
    <View style={styles.screen}>
      <View style={styles.fixedTopArea}>
        <View style={styles.headerContent}>
          <View style={styles.videoBox}>
            <Video
              source={videoSource}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              useNativeControls
              isLooping
              shouldPlay={false}
            />
          </View>

          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{workoutName}</Text>
              <Text style={styles.titleSub}>
                {workoutTypeName} • {category} • {mode}
              </Text>
            </View>

            <View style={styles.savedPill}>
              <Ionicons
                name={isClosedForToday ? "lock-closed" : isSaved ? "save" : "save-outline"}
                size={16}
                color={isClosedForToday ? "#22c55e" : isSaved ? "#38bdf8" : "#94a3b8"}
              />
              <Text
                style={[
                  styles.savedText,
                  isClosedForToday && { color: "#22c55e" },
                  isSaved && !isClosedForToday && { color: "#38bdf8" },
                ]}
              >
                {isClosedForToday
                  ? "Completed for today"
                  : isSaved
                  ? "Saved to JSON"
                  : "Not saved yet"}
              </Text>
            </View>
          </View>

          {isClosedForToday ? (
            <View style={styles.closedBanner}>
              <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
              <Text style={styles.closedBannerText}>
                Today’s workout is already completed. You can start again tomorrow.
              </Text>
            </View>
          ) : null}

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="timer-outline" size={16} color="#38bdf8" />
              <Text style={styles.metaText}>{sessionSeconds}s</Text>
            </View>

            <View style={styles.metaPill}>
              <Ionicons name="checkmark-done-outline" size={16} color="#22c55e" />
              <Text style={styles.metaText}>
                {doneCount}/{plannedSets} sets
              </Text>
            </View>

            <View style={styles.metaPill}>
              <Ionicons name="repeat-outline" size={16} color="#f59e0b" />
              <Text style={styles.metaText}>{totalRepsDone} reps done</Text>
            </View>
          </View>

          <View style={styles.configBox}>
            <Text style={styles.configLabel}>Select sets for today</Text>
            <View style={styles.configPickerBox}>
              <Picker
                selectedValue={String(plannedSets)}
                onValueChange={(val) => onChangePlannedSets(val)}
                style={styles.picker}
                dropdownIconColor="#e5e7eb"
                enabled={doneCount === 0 && !isClosedForToday}
                mode="dropdown"
              >
                {setOptions.map((n) => (
                  <Picker.Item key={n} label={`${n} sets`} value={String(n)} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        ref={outerScrollRef}
        style={styles.setsScroll}
        contentContainerStyle={styles.setsScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.setsBox}>
          <View style={styles.setsHeader}>
            <Text style={styles.sectionTitle}>Sets</Text>
            <Text style={styles.sectionSub}>
              Each set stores reps, duration, and status in userExercises.json
            </Text>
          </View>

          <View style={styles.setsList}>
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
                    delayPressIn={120}
                    onPress={() => toggleExpand(idx)}
                    style={[
                      styles.setCard,
                      isActive && styles.setCardActive,
                      st.status === "done" && styles.setCardDone,
                      isClosedForToday && styles.setCardLocked,
                    ]}
                  >
                    <View pointerEvents="none" style={styles.progressBack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.round(clamp(st.progress, 0, 1) * 100)}%`,
                            opacity: isActive ? 0.3 : 0.18,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.setTopRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.setTitle}>Set {idx + 1}</Text>
                        <Text style={styles.setSub}>
                          {st.elapsedSec}s / {st.timerSec}s • Reps {st.completedReps || st.targetReps}
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

                    {isActive && !isClosedForToday && (
                      <View style={styles.expandArea}>
                        <View style={styles.row}>
                          <View style={styles.pickerWrap}>
                            <Ionicons name="time-outline" size={16} color="#94a3b8" />
                            <Text style={styles.pickerLabel}>Timer</Text>
                          </View>

                          <View style={styles.pickerBox}>
                            <Picker
                              selectedValue={String(st.timerSec)}
                              onValueChange={(val) => onChangeTimer(idx, val)}
                              style={styles.picker}
                              dropdownIconColor="#e5e7eb"
                              enabled={st.status !== "running" && st.status !== "done"}
                              mode="dropdown"
                            >
                              {timerOptions.map((n) => (
                                <Picker.Item key={n} label={`${n} sec`} value={String(n)} />
                              ))}
                            </Picker>
                          </View>
                        </View>

                        <View style={[styles.row, { marginTop: 10 }]}>
                          <View style={styles.pickerWrap}>
                            <Ionicons name="repeat-outline" size={16} color="#94a3b8" />
                            <Text style={styles.pickerLabel}>Reps</Text>
                          </View>

                          <View style={styles.pickerBox}>
                            <Picker
                              selectedValue={String(st.completedReps || st.targetReps)}
                              onValueChange={(val) => onChangeReps(idx, val)}
                              style={styles.picker}
                              dropdownIconColor="#e5e7eb"
                              enabled={st.status !== "done"}
                              mode="dropdown"
                            >
                              {repsOptions.map((n) => (
                                <Picker.Item key={n} label={`${n} reps`} value={String(n)} />
                              ))}
                            </Picker>
                          </View>
                        </View>

                        {renderControls(idx, st)}

                        <Text style={styles.hint}>
                          Once all sets are completed, this workout is locked for today.
                          Tomorrow it starts fresh again.
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
);
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  screen: { flex: 1 },

  fixedTopArea: {
    paddingHorizontal: 14,
    paddingTop: 0,
  },

  headerContent: {
    paddingBottom: 6,
  },

  setsScroll: {
    flex: 1,
  },

  setsScrollContent: {
    paddingHorizontal: 14,
    paddingTop: 0,
    paddingBottom: 30,
  },

  centered: { alignItems: "center", justifyContent: "center" },
  loadingText: { color: "#cbd5e1", fontSize: 15, fontWeight: "700" },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    gap: 10,
  },
  title: { color: "#f8fafc", fontSize: 22, fontWeight: "900" },
  titleSub: { color: "#94a3b8", marginTop: 2, fontSize: 10, fontWeight: "700" },

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
  marginTop: 0,
  marginBottom: 8,
  borderRadius: 16,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#1e293b",
  backgroundColor: "#0f172a",
},

  video: { width: "100%", height: 200, backgroundColor: "#0f172a" },

  closedBanner: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    backgroundColor: "rgba(34,197,94,0.10)",
  },
  closedBannerText: {
    color: "#dcfce7",
    fontWeight: "800",
    fontSize: 12,
    flex: 1,
  },

  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },
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

  configBox: {
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#07101f",
    padding: 12,
  },
  configLabel: {
    color: "#e5e7eb",
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 8,
  },
  configPickerBox: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#061021",
    overflow: "hidden",
    justifyContent: "center",
  },

  setsBox: {
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

  setsList: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
  },

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
  setCardDone: {
    borderColor: "rgba(34,197,94,0.45)",
    backgroundColor: "#081a12",
  },
  setCardLocked: {
    opacity: 0.95,
  },

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

  pickerWrap: { flexDirection: "row", alignItems: "center", gap: 6, minWidth: 70 },
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
  iconBtnDanger: {
    borderColor: "rgba(239,68,68,0.45)",
    backgroundColor: "rgba(239,68,68,0.12)",
  },

  hint: { marginTop: 8, color: "#94a3b8", fontSize: 11, fontWeight: "700" },
});