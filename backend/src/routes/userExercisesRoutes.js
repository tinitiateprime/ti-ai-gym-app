const express = require("express");
const {
  readUserExercises,
  appendUserExercise,
  clearUserExercises,
  replaceAllUserExercises,
  getUserExercisesForRange,
  getDailyWorkoutSession,
  saveWorkoutProgress,
  resetTodayWorkoutSession,
} = require("../services/userExercisesJsonService");

const router = express.Router();

// GET /api/user-exercises
router.get("/", async (_req, res) => {
  try {
    const items = await readUserExercises();
    return res.json({ ok: true, items });
  } catch (error) {
    console.error("Failed to get user exercises:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to get user exercises",
    });
  }
});

// PUT /api/user-exercises/replace-all
router.put("/replace-all", async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    await replaceAllUserExercises(items);

    return res.json({
      ok: true,
      message: "User exercises replaced successfully",
    });
  } catch (error) {
    console.error("Failed to replace user exercises:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to replace user exercises",
    });
  }
});

// POST /api/user-exercises
router.post("/", async (req, res) => {
  try {
    const item = await appendUserExercise(req.body || {});
    return res.status(201).json({
      ok: true,
      message: "User exercise added successfully",
      item,
    });
  } catch (error) {
    console.error("Failed to append user exercise:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to append user exercise",
    });
  }
});

// DELETE /api/user-exercises/clear
router.delete("/clear", async (_req, res) => {
  try {
    await clearUserExercises();
    return res.json({
      ok: true,
      message: "User exercises cleared successfully",
    });
  } catch (error) {
    console.error("Failed to clear user exercises:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to clear user exercises",
    });
  }
});

// GET /api/user-exercises/range?userEmail=...&rangeKey=7d
router.get("/range", async (req, res) => {
  try {
    const { userEmail, rangeKey } = req.query;
    const items = await getUserExercisesForRange(userEmail, rangeKey);

    return res.json({
      ok: true,
      items,
    });
  } catch (error) {
    console.error("Failed to get user exercises for range:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to get user exercises for range",
    });
  }
});

// GET /api/user-exercises/daily-session?userEmail=...&workoutId=...
router.get("/daily-session", async (req, res) => {
  try {
    const { userEmail, workoutId } = req.query;

    if (!userEmail || !workoutId) {
      return res.status(400).json({
        ok: false,
        error: "userEmail and workoutId are required",
      });
    }

    const item = await getDailyWorkoutSession(userEmail, workoutId);

    return res.json({
      ok: true,
      item,
    });
  } catch (error) {
    console.error("Failed to get daily workout session:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to get daily workout session",
    });
  }
});

// POST /api/user-exercises/save-progress
router.post("/save-progress", async (req, res) => {
  try {
    const { userEmail, userName, workout, sessionStartIso, setStates } =
      req.body || {};

    if (!userEmail || !workout) {
      return res.status(400).json({
        ok: false,
        error: "userEmail and workout are required",
      });
    }

    const item = await saveWorkoutProgress({
      userEmail,
      userName,
      workout,
      sessionStartIso,
      setStates,
    });

    return res.status(201).json({
      ok: true,
      message: "Workout progress saved successfully",
      item,
    });
  } catch (error) {
    console.error("Failed to save workout progress:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to save workout progress",
    });
  }
});

// DELETE /api/user-exercises/today-session?userEmail=...&workoutId=...
router.delete("/today-session", async (req, res) => {
  try {
    const { userEmail, workoutId } = req.query;

    if (!userEmail || !workoutId) {
      return res.status(400).json({
        ok: false,
        error: "userEmail and workoutId are required",
      });
    }

    await resetTodayWorkoutSession(userEmail, workoutId);

    return res.json({
      ok: true,
      message: "Today's workout session reset successfully",
    });
  } catch (error) {
    console.error("Failed to reset today's workout session:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to reset today's workout session",
    });
  }
});

module.exports = router;