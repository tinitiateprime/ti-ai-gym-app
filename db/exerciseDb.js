// db/exerciseDb.js (Expo SDK 54+ compatible)
import * as SQLite from "expo-sqlite";

let dbPromise = null;

async function getDb() {
  if (!dbPromise) {
    if (SQLite.openDatabaseAsync) {
      dbPromise = SQLite.openDatabaseAsync("gymflow.db");
    } else if (SQLite.openDatabaseSync) {
      const db = SQLite.openDatabaseSync("gymflow.db");
      dbPromise = Promise.resolve(db);
    } else {
      throw new Error("expo-sqlite not available. Are you running on web? Use Android/iOS.");
    }
  }
  return dbPromise;
}

async function safeExec(db, sql) {
  try {
    await db.execAsync(sql);
  } catch (e) {
    // ignore (for idempotent migrations)
  }
}



export async function initExerciseDb() {
  const db = await getDb();

  // Base table (keeps your old columns)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS exercise_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userEmail TEXT NOT NULL,
      userName TEXT,
      exerciseName TEXT NOT NULL,
      startTimeIso TEXT NOT NULL,
      stopTimeIso TEXT NOT NULL,
      dateIso TEXT NOT NULL,
      durationSec INTEGER,
      setsJson TEXT
    );
  `);

  // ✅ Migration: add sessionGuid column for upsert support
  await safeExec(db, `ALTER TABLE exercise_sessions ADD COLUMN sessionGuid TEXT;`);

  // ✅ Optional index (ignore if exists)
  await safeExec(db, `CREATE UNIQUE INDEX IF NOT EXISTS idx_exercise_sessions_guid ON exercise_sessions(sessionGuid);`);

  return db;
}

export async function insertExerciseSession(session) {
  const db = await initExerciseDb();

  const {
    userEmail,
    userName,
    exerciseName,
    startTimeIso,
    stopTimeIso,
    dateIso,
    durationSec,
    setsJson,
    sessionGuid, // optional
  } = session;

  await db.runAsync(
    `INSERT INTO exercise_sessions
      (userEmail, userName, exerciseName, startTimeIso, stopTimeIso, dateIso, durationSec, setsJson, sessionGuid)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userEmail,
      userName || "",
      exerciseName,
      startTimeIso,
      stopTimeIso,
      dateIso,
      durationSec || 0,
      setsJson || "[]",
      sessionGuid || null,
    ]
  );
}

// ✅ NEW: upsert by sessionGuid (used by the new ExerciseSessionScreen)
export async function upsertExerciseSessionByGuid(sessionGuid, session) {
  const db = await initExerciseDb();

  const {
    userEmail,
    userName,
    exerciseName,
    startTimeIso,
    stopTimeIso,
    dateIso,
    durationSec,
    setsJson,
  } = session;

  if (!sessionGuid) throw new Error("sessionGuid is required for upsert");

  const existing = await db.getFirstAsync(
    `SELECT id FROM exercise_sessions WHERE sessionGuid = ? LIMIT 1`,
    [sessionGuid]
  );

  if (existing?.id) {
    await db.runAsync(
      `UPDATE exercise_sessions
       SET userEmail = ?,
           userName = ?,
           exerciseName = ?,
           startTimeIso = ?,
           stopTimeIso = ?,
           dateIso = ?,
           durationSec = ?,
           setsJson = ?
       WHERE id = ?`,
      [
        userEmail,
        userName || "",
        exerciseName,
        startTimeIso,
        stopTimeIso,
        dateIso,
        durationSec || 0,
        setsJson || "[]",
        existing.id,
      ]
    );
  } else {
    await db.runAsync(
      `INSERT INTO exercise_sessions
        (userEmail, userName, exerciseName, startTimeIso, stopTimeIso, dateIso, durationSec, setsJson, sessionGuid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userEmail,
        userName || "",
        exerciseName,
        startTimeIso,
        stopTimeIso,
        dateIso,
        durationSec || 0,
        setsJson || "[]",
        sessionGuid,
      ]
    );
  }
}

export async function getSessionsForUserSince(userEmail, sinceIsoDate) {
  const db = await initExerciseDb();

  const rows = await db.getAllAsync(
    `SELECT *
     FROM exercise_sessions
     WHERE userEmail = ?
       AND dateIso >= ?
     ORDER BY startTimeIso DESC`,
    [userEmail, sinceIsoDate]
  );

  return rows || [];
}

export async function getWeeklyCounts(userEmail, sinceIsoDate) {
  const db = await initExerciseDb();

  const rows = await db.getAllAsync(
    `SELECT exerciseName, COUNT(*) as cnt
     FROM exercise_sessions
     WHERE userEmail = ?
       AND dateIso >= ?
     GROUP BY exerciseName
     ORDER BY cnt DESC`,
    [userEmail, sinceIsoDate]
  );

  return rows || [];
}
