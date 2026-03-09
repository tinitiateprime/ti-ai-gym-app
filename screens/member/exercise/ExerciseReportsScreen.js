import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

import {
  getUserExercisesForRange,
  getUserExercisesFilePath,
} from "../../api/storage/userExercisesStorage";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatDateTime(iso) {
  if (!iso) return "-";

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());

  let h = d.getHours();
  const m = pad2(d.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;

  return `${yyyy}-${mm}-${dd} ${h}:${m} ${ampm}`;
}

function rangeTitle(rangeKey) {
  if (rangeKey === "today") return "Today";
  if (rangeKey === "month") return "Last Month";
  return "Last 7 Days";
}

export default function ExerciseReportsScreen({ route }) {
  const userEmail = (
    route?.params?.email ||
    route?.params?.userEmail ||
    ""
  ).toLowerCase();

  const userName = route?.params?.fullName || route?.params?.userName || "";

  const [rangeKey, setRangeKey] = useState("7d");
  const [chartType, setChartType] = useState("bar");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log("userExercises.json saved at:", getUserExercisesFilePath());
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getUserExercisesForRange(userEmail, rangeKey);
        if (mounted) {
          setRows(data);
        }
      } catch (error) {
        console.warn("Failed to load exercise report data:", error);
        if (mounted) {
          setRows([]);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userEmail, rangeKey]);

  const counts = useMemo(() => {
    const map = {};

    rows.forEach((item) => {
      const name = item?.workout_name || "Workout";
      map[name] = (map[name] || 0) + 1;
    });

    return Object.entries(map)
      .map(([exerciseName, cnt]) => ({ exerciseName, cnt }))
      .sort((a, b) => b.cnt - a.cnt);
  }, [rows]);

  const totalWorkoutSessions = rows.length;
  const totalSets = rows.reduce(
    (sum, item) => sum + Number(item?.completed_sets || 0),
    0
  );
  const totalReps = rows.reduce(
    (sum, item) => sum + Number(item?.total_reps_completed || 0),
    0
  );
  const totalMinutes = Math.round(
    rows.reduce((sum, item) => sum + Number(item?.total_duration_sec || 0), 0) / 60
  );

  const labels = counts.map((x) => x.exerciseName);
  const data = counts.map((x) => x.cnt);

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { margin:0; background:#020617; color:#e5e7eb; font-family: Arial, sans-serif; }
        .wrap { padding: 12px; }
        canvas { background:#0f172a; border:1px solid #1e293b; border-radius:12px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <canvas id="c"></canvas>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        const ctx = document.getElementById('c');
        new Chart(ctx, {
          type: '${chartType}',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Workout Sessions',
              data: ${JSON.stringify(data)},
              backgroundColor: [
                '#38bdf8',
                '#22c55e',
                '#f97316',
                '#a78bfa',
                '#f43f5e',
                '#eab308'
              ],
              borderColor: '#0f172a',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: '#e5e7eb' } }
            },
            scales: ${
              chartType === "bar"
                ? `{
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
                    y: { beginAtZero: true, ticks: { color: '#94a3b8', precision: 0 }, grid: { color: '#1e293b' } }
                  }`
                : "{}"
            }
          }
        });
      </script>
    </body>
  </html>
  `;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Workout Reports</Text>

        <Text style={styles.sub}>
          {userName ? `${userName} • ` : ""}
          {rangeTitle(rangeKey)}
        </Text>

        <View style={styles.topStatsRow}>
          <View style={styles.topStatCard}>
            <Text style={styles.topStatValue}>{totalWorkoutSessions}</Text>
            <Text style={styles.topStatLabel}>Workout Days</Text>
          </View>

          <View style={styles.topStatCard}>
            <Text style={styles.topStatValue}>{totalSets}</Text>
            <Text style={styles.topStatLabel}>Completed Sets</Text>
          </View>

          <View style={styles.topStatCard}>
            <Text style={styles.topStatValue}>{totalReps}</Text>
            <Text style={styles.topStatLabel}>Total Reps</Text>
          </View>

          <View style={styles.topStatCard}>
            <Text style={styles.topStatValue}>{totalMinutes}</Text>
            <Text style={styles.topStatLabel}>Minutes</Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              rangeKey === "today" && styles.filterBtnActive,
            ]}
            onPress={() => setRangeKey("today")}
          >
            <Text
              style={[
                styles.filterText,
                rangeKey === "today" && styles.filterTextActive,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              rangeKey === "7d" && styles.filterBtnActive,
            ]}
            onPress={() => setRangeKey("7d")}
          >
            <Text
              style={[
                styles.filterText,
                rangeKey === "7d" && styles.filterTextActive,
              ]}
            >
              Last 7 Days
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              rangeKey === "month" && styles.filterBtnActive,
            ]}
            onPress={() => setRangeKey("month")}
          >
            <Text
              style={[
                styles.filterText,
                rangeKey === "month" && styles.filterTextActive,
              ]}
            >
              Last Month
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              chartType === "bar" && styles.filterBtnActive,
            ]}
            onPress={() => setChartType("bar")}
          >
            <Text
              style={[
                styles.filterText,
                chartType === "bar" && styles.filterTextActive,
              ]}
            >
              Bar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              chartType === "doughnut" && styles.filterBtnActive,
            ]}
            onPress={() => setChartType("doughnut")}
          >
            <Text
              style={[
                styles.filterText,
                chartType === "doughnut" && styles.filterTextActive,
              ]}
            >
              Circle
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartBox}>
          <WebView
            originWhitelist={["*"]}
            source={{ html }}
            style={{ height: 320, backgroundColor: "#020617" }}
          />
        </View>

        <Text style={styles.sectionTitle}>Saved Workout Entries</Text>

        {rows.length === 0 ? (
          <Text style={styles.empty}>No workout data found for this range.</Text>
        ) : (
          rows.map((item) => (
            <View key={item.session_id} style={styles.sessionCard}>
              <Text style={styles.sessionTitle}>
                {item.workout_name} • {item.exercise_type}
              </Text>

              <Text style={styles.sessionText}>
                Workout Type: {item.workout_type}
              </Text>

              <Text style={styles.sessionText}>
                Start: {formatDateTime(item.workout_datetime)}
              </Text>

              <Text style={styles.sessionText}>
                Completed Sets: {item.completed_sets}/{item.total_sets_planned}
              </Text>

              <Text style={styles.sessionText}>
                Total Reps: {item.total_reps_completed}
              </Text>

              <Text style={styles.sessionText}>
                Total Duration: {item.total_duration_sec}s
              </Text>

              <Text style={styles.sessionText}>
                Status: {item.status}
              </Text>

              {(item.metrics || []).map((m) => (
                <View key={`${item.session_id}_${m.set_number}`} style={styles.metricRow}>
                  <Text style={styles.metricText}>
                    Set {m.set_number} • Reps {m.reps} • {m.duration_sec}s
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { padding: 16, paddingBottom: 40 },

  title: { color: "#fff", fontSize: 22, fontWeight: "900", marginBottom: 6 },
  sub: { color: "#94a3b8", marginBottom: 14 },

  topStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  topStatCard: {
    minWidth: "47%",
    flexGrow: 1,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  topStatValue: {
    color: "#38bdf8",
    fontSize: 20,
    fontWeight: "900",
  },
  topStatLabel: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  filterBtnActive: {
    backgroundColor: "#38bdf8",
    borderColor: "#38bdf8",
  },
  filterText: { color: "#cbd5e1", fontWeight: "800" },
  filterTextActive: { color: "#020617" },

  chartBox: {
    height: 320,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 10,
  },
  empty: { color: "#94a3b8" },

  sessionCard: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 12,
    marginBottom: 10,
  },
  sessionTitle: { color: "#e5e7eb", fontWeight: "900" },
  sessionText: { color: "#94a3b8", marginTop: 4 },
  metricRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },
  metricText: { color: "#cbd5e1", fontSize: 12, fontWeight: "700" },
});