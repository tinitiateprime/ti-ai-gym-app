const fs = require("fs/promises");
const path = require("path");

const USER_EXERCISES_FILE = path.join(
  __dirname,
  "../../data/userExercises.json"
);

async function ensureUserExercisesFile() {
  try {
    await fs.access(USER_EXERCISES_FILE);
  } catch {
    await fs.mkdir(path.dirname(USER_EXERCISES_FILE), { recursive: true });
    await fs.writeFile(USER_EXERCISES_FILE, "[]", "utf8");
  }
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeId(value) {
  return String(value || "").trim();
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
    item?.performedAt ||
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

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function generateId(prefix = "exercise") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

async function readUserExercises() {
  await ensureUserExercisesFile();

  try {
    const raw = await fs.readFile(USER_EXERCISES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUserExercises(items) {
  await ensureUserExercisesFile();
  const safeItems = Array.isArray(items) ? items : [];
  await fs.writeFile(
    USER_EXERCISES_FILE,
    JSON.stringify(safeItems, null, 2),
    "utf8"
  );
}

async function appendUserExercise(exerciseItem) {
  const all = await readUserExercises();

  const nowIso = new Date().toISOString();
  const nextItem = {
    id: generateId("exercise"),
    createdAt: nowIso,
    updatedAt: nowIso,
    ...exerciseItem,
  };

  all.push(nextItem);
  await writeUserExercises(all);

  return nextItem;
}

async function clearUserExercises() {
  await writeUserExercises([]);
  return true;
}

async function replaceAllUserExercises(items) {
  await writeUserExercises(items);
  return true;
}

async function getUserExercisesForRange(userEmail, rangeKey = "7d") {
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

async function getDailyWorkoutSession(userEmail, workoutId) {
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
    if (normalizedWorkoutId && itemWorkoutId !== normalizedWorkoutId) return false;

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
}

async function saveWorkoutProgress({
  userEmail,
  userName,
  workout,
  sessionStartIso,
  setStates,
}) {
  const all = await readUserExercises();

  const normalizedEmail = normalizeEmail(userEmail);
  const workoutId = normalizeId(workout?.id);
  const nowIso = new Date().toISOString();

  const safeSetStates = Array.isArray(setStates) ? setStates : [];
  const doneStates = safeSetStates.filter((s) => s?.status === "done");

  const sets = doneStates.map((s, idx) => {
    const reps = Number(s?.completedReps ?? s?.targetReps ?? 0);
    const startedAt = s?.startedAtIso || null;
    const stoppedAt = s?.stoppedAtIso || null;

    return {
      set_number: idx + 1,
      reps_completed: reps,
      target_reps: Number(s?.targetReps ?? reps ?? 0),
      duration_sec: Number(s?.elapsedSec ?? 0),
      timer_sec: Number(s?.timerSec ?? 0),
      started_at_iso: startedAt,
      stopped_at_iso: stoppedAt,
      performed_at_iso: stoppedAt || startedAt || nowIso,
      status: s?.status || "done",
    };
  });

  const totalSetsPlanned = Number(
    workout?.totalSetsPlanned || safeSetStates.length || 0
  );

  const completedSets = sets.length;
  const totalRepsDone = sets.reduce(
    (sum, setItem) => sum + Number(setItem?.reps_completed || 0),
    0
  );

  const sessionClosedForDay =
    totalSetsPlanned > 0 && completedSets >= totalSetsPlanned;

  const nextRecord = {
    id: generateId("workout"),
    createdAt: nowIso,
    updatedAt: nowIso,

    userEmail: normalizedEmail,
    userName: String(userName || "").trim(),

    workoutId,
    workout_name: workout?.name || "Exercise",
    category: workout?.category || "Workout",
    workout_type_id: workout?.workoutTypeId || "general",
    workout_type_name: workout?.workoutTypeName || "General",
    mode: workout?.mode || "timer",

    workout_datetime: sessionStartIso || nowIso,
    performedAt: nowIso,

    total_sets_planned: totalSetsPlanned,
    completed_sets: completedSets,
    total_reps_done: totalRepsDone,
    session_closed_for_day: sessionClosedForDay,

    sets,
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
}

async function resetTodayWorkoutSession(userEmail, workoutId) {
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
}

module.exports = {
  USER_EXERCISES_FILE,
  readUserExercises,
  writeUserExercises,
  appendUserExercise,
  clearUserExercises,
  replaceAllUserExercises,
  getUserExercisesForRange,
  getDailyWorkoutSession,
  saveWorkoutProgress,
  resetTodayWorkoutSession,
};