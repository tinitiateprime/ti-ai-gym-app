// ../../api/storage/userExercisesStorage.js
import * as FileSystem from "expo-file-system/legacy";

const FILE_NAME = "userExercisesStorage.json";

export function getUserExercisesFilePath() {
  return `${FileSystem.documentDirectory ?? ""}${FILE_NAME}`;
}

export async function readUserExercises() {
  try {
    const path = getUserExercisesFilePath();
    const info = await FileSystem.getInfoAsync(path);

    if (!info.exists) {
      return [];
    }

    const content = await FileSystem.readAsStringAsync(path);

    if (!content || !content.trim()) {
      return [];
    }

    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Failed to read user exercises:", error);
    return [];
  }
}

export async function writeUserExercises(data) {
  try {
    const path = getUserExercisesFilePath();
    const safeData = Array.isArray(data) ? data : [];

    await FileSystem.writeAsStringAsync(
      path,
      JSON.stringify(safeData, null, 2)
    );

    return true;
  } catch (error) {
    console.warn("Failed to write user exercises:", error);
    throw error;
  }
}

export async function appendUserExercise(exerciseItem) {
  const existing = await readUserExercises();
  const next = [...existing, exerciseItem];
  await writeUserExercises(next);
  return exerciseItem;
}

export async function clearUserExercises() {
  try {
    const path = getUserExercisesFilePath();
    const info = await FileSystem.getInfoAsync(path);

    if (info.exists) {
      await FileSystem.deleteAsync(path, { idempotent: true });
    }

    return true;
  } catch (error) {
    console.warn("Failed to clear user exercises:", error);
    return false;
  }
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfLastNDays(daysBack) {
  const d = startOfToday();
  d.setDate(d.getDate() - daysBack);
  return d;
}

function startOfLastMonth() {
  const d = startOfToday();
  d.setMonth(d.getMonth() - 1);
  return d;
}

function getItemDate(item) {
  const raw =
    item?.createdAt ||
    item?.updatedAt ||
    item?.workout_datetime ||
    item?.stoppedAtIso ||
    item?.startedAtIso ||
    null;

  if (!raw) return null;

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;

  return d;
}

function normalizeEmail(value) {
  return String(value || "").toLowerCase().trim();
}

function normalizeId(value) {
  return String(value || "").trim();
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function getUserExercisesForRange(userEmail, rangeKey = "7d") {
  const all = await readUserExercises();
  const normalizedEmail = normalizeEmail(userEmail);

  let fromDate;

  if (rangeKey === "today") {
    fromDate = startOfToday();
  } else if (rangeKey === "month") {
    fromDate = startOfLastMonth();
  } else {
    fromDate = startOfLastNDays(6);
  }

  return all
    .filter((item) => {
      const itemEmail = normalizeEmail(item?.userEmail);

      if (normalizedEmail && itemEmail !== normalizedEmail) {
        return false;
      }

      const dt = getItemDate(item);
      if (!dt) return false;

      return dt >= fromDate;
    })
    .sort((a, b) => {
      const da = getItemDate(a)?.getTime() || 0;
      const db = getItemDate(b)?.getTime() || 0;
      return db - da;
    });
}

export async function getDailyWorkoutSession(userEmail, workoutId) {
  try {
    const all = await readUserExercises();
    const normalizedEmail = normalizeEmail(userEmail);
    const normalizedWorkoutId = normalizeId(workoutId);
    const today = new Date();

    const candidates = all.filter((item) => {
      const itemEmail = normalizeEmail(item?.userEmail);
      const itemWorkoutId = normalizeId(item?.workoutId);
      const itemDate = getItemDate(item);

      if (!itemDate) return false;
      if (normalizedEmail && itemEmail !== normalizedEmail) return false;
      if (normalizedWorkoutId && itemWorkoutId !== normalizedWorkoutId)
        return false;

      return isSameDay(itemDate, today);
    });

    if (!candidates.length) {
      return null;
    }

    candidates.sort((a, b) => {
      const da = getItemDate(a)?.getTime() || 0;
      const db = getItemDate(b)?.getTime() || 0;
      return db - da;
    });

    return candidates[0];
  } catch (error) {
    console.warn("Failed to get daily workout session:", error);
    return null;
  }
}

export async function saveWorkoutProgress({
  userEmail,
  userName,
  workout,
  sessionStartIso,
  setStates,
}) {
  try {
    const all = await readUserExercises();

    const normalizedEmail = normalizeEmail(userEmail);
    const workoutId = normalizeId(workout?.id);
    const nowIso = new Date().toISOString();

    const safeSetStates = Array.isArray(setStates) ? setStates : [];
    const doneStates = safeSetStates.filter((s) => s.status === "done");

    const metrics = doneStates.map((s, idx) => ({
      set_number: idx + 1,
      reps: Number(s?.completedReps ?? s?.targetReps ?? 0),
      duration_sec: Number(s?.elapsedSec ?? 0),
      timer_sec: Number(s?.timerSec ?? 0),
      started_at_iso: s?.startedAtIso || null,
      stopped_at_iso: s?.stoppedAtIso || null,
      status: s?.status || "done",
    }));

    const totalSetsPlanned = Number(
      workout?.totalSetsPlanned || safeSetStates.length || 0
    );
    const completedSets = doneStates.length;
    const sessionClosedForDay =
      totalSetsPlanned > 0 && completedSets >= totalSetsPlanned;

    const nextRecord = {
      id: `workout_${Date.now()}`,
      createdAt: nowIso,
      updatedAt: nowIso,

      userEmail: normalizedEmail,
      userName: userName || "",

      workoutId,
      workout_name: workout?.name || "Exercise",
      category: workout?.category || "Workout",
      workout_type_id: workout?.workoutTypeId || "general",
      workout_type_name: workout?.workoutTypeName || "General",
      mode: workout?.mode || "timer",

      workout_datetime: sessionStartIso || nowIso,
      total_sets_planned: totalSetsPlanned,
      completed_sets: completedSets,
      total_reps_done: doneStates.reduce(
        (sum, s) => sum + Number(s?.completedReps ?? s?.targetReps ?? 0),
        0
      ),
      session_closed_for_day: sessionClosedForDay,
      metrics,
    };

    const today = new Date();

    const filtered = all.filter((item) => {
      const itemEmail = normalizeEmail(item?.userEmail);
      const itemWorkoutId = normalizeId(item?.workoutId);
      const itemDate = getItemDate(item);

      if (!itemDate) return true;

      const sameUser = itemEmail === normalizedEmail;
      const sameWorkout = itemWorkoutId === workoutId;
      const sameDay = isSameDay(itemDate, today);

      return !(sameUser && sameWorkout && sameDay);
    });

    const nextAll = [...filtered, nextRecord];
    await writeUserExercises(nextAll);

    return nextRecord;
  } catch (error) {
    console.warn("Failed to save workout progress:", error);
    throw error;
  }
}

export async function resetTodayWorkoutSession(userEmail, workoutId) {
  try {
    const all = await readUserExercises();
    const normalizedEmail = normalizeEmail(userEmail);
    const normalizedWorkoutId = normalizeId(workoutId);
    const today = new Date();

    const filtered = all.filter((item) => {
      const itemEmail = normalizeEmail(item?.userEmail);
      const itemWorkoutId = normalizeId(item?.workoutId);
      const itemDate = getItemDate(item);

      if (!itemDate) return true;

      const sameUser = itemEmail === normalizedEmail;
      const sameWorkout = itemWorkoutId === normalizedWorkoutId;
      const sameDay = isSameDay(itemDate, today);

      return !(sameUser && sameWorkout && sameDay);
    });

    await writeUserExercises(filtered);
    return true;
  } catch (error) {
    console.warn("Failed to reset today's workout session:", error);
    return false;
  }
}

export async function debugPrintUserExercisesJson() {
  try {
    const path = getUserExercisesFilePath();
    const info = await FileSystem.getInfoAsync(path);

    if (!info.exists) {
      console.log(`${FILE_NAME} does not exist yet:`, path);
      return;
    }

    const content = await FileSystem.readAsStringAsync(path);
    console.log(`${FILE_NAME} path:`, path);
    console.log(`${FILE_NAME} content:`, content);
  } catch (error) {
    console.warn("Failed to debug print user exercises JSON:", error);
  }
}