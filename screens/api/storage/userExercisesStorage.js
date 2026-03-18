const API_BASE_URL = "http://10.0.2.2:3001"; // change this to your laptop IP and backend port

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeId(value) {
  return String(value || "").trim();
}

function buildUrl(path, queryParams = {}) {
  const cleanBase = String(API_BASE_URL || "").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      params.append(key, String(value));
    }
  });

  const query = params.toString();
  return `${cleanBase}${cleanPath}${query ? `?${query}` : ""}`;
}

async function parseJsonResponse(response, fallbackMessage) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || fallbackMessage || "Request failed");
  }

  return data;
}

export function getUserExercisesFilePath() {
  return "backend/data/userExercises.json";
}

export async function readUserExercises() {
  try {
    const response = await fetch(buildUrl("/api/user-exercises"));
    const data = await parseJsonResponse(
      response,
      "Failed to fetch user exercises"
    );
    return Array.isArray(data?.items) ? data.items : [];
  } catch (error) {
    console.warn("Failed to read user exercises:", error);
    return [];
  }
}

export async function writeUserExercises(data) {
  try {
    const safeData = Array.isArray(data) ? data : [];

    const response = await fetch(buildUrl("/api/user-exercises/replace-all"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: safeData }),
    });

    await parseJsonResponse(response, "Failed to replace user exercises");
    return true;
  } catch (error) {
    console.warn("Failed to write user exercises:", error);
    throw error;
  }
}

export async function appendUserExercise(exerciseItem) {
  try {
    const response = await fetch(buildUrl("/api/user-exercises"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseItem || {}),
    });

    const data = await parseJsonResponse(
      response,
      "Failed to append user exercise"
    );

    return data?.item || null;
  } catch (error) {
    console.warn("Failed to append user exercise:", error);
    throw error;
  }
}

export async function clearUserExercises() {
  try {
    const response = await fetch(buildUrl("/api/user-exercises/clear"), {
      method: "DELETE",
    });

    await parseJsonResponse(response, "Failed to clear user exercises");
    return true;
  } catch (error) {
    console.warn("Failed to clear user exercises:", error);
    return false;
  }
}

export async function getUserExercisesForRange(userEmail, rangeKey = "7d") {
  try {
    const response = await fetch(
      buildUrl("/api/user-exercises/range", {
        userEmail: normalizeEmail(userEmail),
        rangeKey,
      })
    );

    const data = await parseJsonResponse(
      response,
      "Failed to fetch user exercises for range"
    );

    return Array.isArray(data?.items) ? data.items : [];
  } catch (error) {
    console.warn("Failed to get user exercises for range:", error);
    return [];
  }
}

export async function getDailyWorkoutSession(userEmail, workoutId) {
  try {
    const response = await fetch(
      buildUrl("/api/user-exercises/daily-session", {
        userEmail: normalizeEmail(userEmail),
        workoutId: normalizeId(workoutId),
      })
    );

    const data = await parseJsonResponse(
      response,
      "Failed to fetch daily workout session"
    );

    return data?.item || null;
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
    const response = await fetch(buildUrl("/api/user-exercises/save-progress"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        userName,
        workout,
        sessionStartIso,
        setStates,
      }),
    });

    const data = await parseJsonResponse(
      response,
      "Failed to save workout progress"
    );

    return data?.item || null;
  } catch (error) {
    console.warn("Failed to save workout progress:", error);
    throw error;
  }
}

export async function resetTodayWorkoutSession(userEmail, workoutId) {
  try {
    const response = await fetch(
      buildUrl("/api/user-exercises/today-session", {
        userEmail: normalizeEmail(userEmail),
        workoutId: normalizeId(workoutId),
      }),
      {
        method: "DELETE",
      }
    );

    await parseJsonResponse(
      response,
      "Failed to reset today's workout session"
    );

    return true;
  } catch (error) {
    console.warn("Failed to reset today's workout session:", error);
    return false;
  }
}

export async function debugPrintUserExercisesJson() {
  try {
    const response = await fetch(buildUrl("/api/user-exercises"));
    const data = await parseJsonResponse(
      response,
      "Failed to debug print user exercises JSON"
    );

    console.log("API base URL:", API_BASE_URL);
    console.log("userExercises.json saved at:", getUserExercisesFilePath());
    console.log("userExercises.json content:", JSON.stringify(data?.items || [], null, 2));
  } catch (error) {
    console.warn("Failed to debug print user exercises JSON:", error);
  }
}