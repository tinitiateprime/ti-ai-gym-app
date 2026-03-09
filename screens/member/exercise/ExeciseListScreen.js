// api/storage/userExercisesStorage.js

import * as FileSystem from "expo-file-system";

const USER_EXERCISES_FILE = `${FileSystem.documentDirectory}userExercises.json`;

export function getUserExercisesFilePath() {
  return USER_EXERCISES_FILE;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

async function ensureFileExists() {
  const info = await FileSystem.getInfoAsync(USER_EXERCISES_FILE);

  if (!info.exists) {
    await FileSystem.writeAsStringAsync(USER_EXERCISES_FILE, "[]");
  }
}

async function readAllExercises() {
  await ensureFileExists();

  const raw = await FileSystem.readAsStringAsync(USER_EXERCISES_FILE);

  if (!raw || !raw.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Failed to parse userExercises.json:", error);
    return [];
  }
}

async function writeAllExercises(items) {
  await FileSystem.writeAsStringAsync(
    USER_EXERCISES_FILE,
    JSON.stringify(items, null, 2)
  );
}

export async function appendUserExercise(entry) {
  const items = await readAllExercises();
  const nowIso = new Date().toISOString();

  const nextEntry = {
    id: entry?.id || `ex_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    sessionGuid: entry?.sessionGuid || null,

    userEmail: normalizeEmail(entry?.userEmail),
    userName: String(entry?.userName || ""),

    workoutTypeId: String(entry?.workoutTypeId || ""),
    workoutTypeName: String(entry?.workoutTypeName || ""),
    exerciseId: String(entry?.exerciseId || ""),
    exerciseName: String(entry?.exerciseName || "Exercise"),

    mode: String(entry?.mode || "timer_reps"),
    videoKey: String(entry?.videoKey || ""),

    setNumber: Number(entry?.setNumber ?? 1),
    targetReps: Number(entry?.targetReps ?? 0),
    completedReps: Number(entry?.completedReps ?? 0),

    startedAtIso: entry?.startedAtIso || nowIso,
    stoppedAtIso: entry?.stoppedAtIso || null,
    durationSec: Number(entry?.durationSec ?? 0),
    timerSec: Number(entry?.timerSec ?? 0),

    stopReason: entry?.stopReason || "manual",
    createdAt: entry?.createdAt || nowIso,
  };

  items.push(nextEntry);
  await writeAllExercises(items);

  return nextEntry;
}

function getStartDateForRange(rangeKey) {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (rangeKey === "today") {
    return start;
  }

  if (rangeKey === "month") {
    start.setDate(start.getDate() - 30);
    return start;
  }

  start.setDate(start.getDate() - 6);
  return start;
}

export async function getUserExercisesForRange(userEmail, rangeKey = "7d") {
  const items = await readAllExercises();
  const targetEmail = normalizeEmail(userEmail);
  const start = getStartDateForRange(rangeKey);

  return items
    .filter((item) => {
      const itemEmail = normalizeEmail(item?.userEmail);
      const dateValue =
        item?.startedAtIso || item?.createdAt || item?.stoppedAtIso;
      const itemDate = new Date(dateValue);

      if (Number.isNaN(itemDate.getTime())) {
        return false;
      }

      const emailMatch = !targetEmail || itemEmail === targetEmail;
      return emailMatch && itemDate >= start;
    })
    .sort((a, b) => {
      const aTime = new Date(a?.startedAtIso || a?.createdAt || 0).getTime();
      const bTime = new Date(b?.startedAtIso || b?.createdAt || 0).getTime();
      return bTime - aTime;
    });
}

export async function getAllUserExercises(userEmail = "") {
  const items = await readAllExercises();
  const targetEmail = normalizeEmail(userEmail);

  return items
    .filter((item) => {
      if (!targetEmail) return true;
      return normalizeEmail(item?.userEmail) === targetEmail;
    })
    .sort((a, b) => {
      const aTime = new Date(a?.startedAtIso || a?.createdAt || 0).getTime();
      const bTime = new Date(b?.startedAtIso || b?.createdAt || 0).getTime();
      return bTime - aTime;
    });
}