// screens/member/exercise/ExerciseReportsScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { getSessionsForUserSince, getWeeklyCounts } from "../../../db/exerciseDb";

function pad2(n) {
  return String(n).padStart(2, "0");
}
function toDateIso(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function formatTime(iso) {
  const d = new Date(iso);
  let h = d.getHours();
  const m = pad2(d.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

export default function ExerciseReportsScreen({ route }) {
  // ✅ accept both param keys
  const userEmail = (route?.params?.email || route?.params?.userEmail || "").toLowerCase();
  const userName = route?.params?.fullName || route?.params?.userName || "";

  const [counts, setCounts] = useState([]);
  const [sessions, setSessions] = useState([]);

  const sinceIso = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6); // last 7 days inclusive
    return toDateIso(d);
  }, []);

  useEffect(() => {
    (async () => {
      if (!userEmail) return;

      const c = await getWeeklyCounts(userEmail, sinceIso);
      const s = await getSessionsForUserSince(userEmail, sinceIso);

      setCounts(c);
      setSessions(s);
    })();
  }, [userEmail, sinceIso]);

  const labels = counts.map((x) => x.exerciseName);
  const data = counts.map((x) => x.cnt);

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { margin:0; background:#020617; color:#e5e7eb; font-family: Arial; }
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
          type: 'bar',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Exercise Count (Last 7 days)',
              data: ${JSON.stringify(data)}
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#e5e7eb' } } },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
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
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.sub}>
          {userName ? `${userName} • ` : ""}Last 7 days (since {sinceIso})
        </Text>

        <View style={styles.chartBox}>
          <WebView originWhitelist={["*"]} source={{ html }} style={{ height: 320 }} />
        </View>

        <Text style={styles.sectionTitle}>Sessions</Text>
        {sessions.length === 0 ? (
          <Text style={styles.empty}>No sessions saved yet.</Text>
        ) : (
          sessions.map((s) => (
            <View key={s.id} style={styles.sessionCard}>
              <Text style={styles.sessionTitle}>{s.exerciseName}</Text>
              <Text style={styles.sessionText}>
                {s.dateIso} • {formatTime(s.startTimeIso)} → {formatTime(s.stopTimeIso)}
              </Text>
              <Text style={styles.sessionText}>
                Duration: {Math.round((s.durationSec || 0) / 60)} min
              </Text>
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
  sub: { color: "#94a3b8", marginBottom: 12 },

  chartBox: { height: 320, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "#1e293b" },

  sectionTitle: { color: "#e5e7eb", fontSize: 16, fontWeight: "800", marginTop: 16, marginBottom: 10 },
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
});
