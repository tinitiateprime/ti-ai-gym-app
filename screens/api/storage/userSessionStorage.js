import * as FileSystem from "expo-file-system";

const FILE_NAME = "userSession.json";

export function getUserSessionFilePath() {
  return `${FileSystem.documentDirectory}${FILE_NAME}`;
}

export async function readUserSession() {
  try {
    const path = getUserSessionFilePath();
    const info = await FileSystem.getInfoAsync(path);

    if (!info.exists) {
      return null;
    }

    const content = await FileSystem.readAsStringAsync(path);

    if (!content || !content.trim()) {
      return null;
    }

    return JSON.parse(content);
  } catch (error) {
    console.warn("Failed to read user session:", error);
    return null;
  }
}

export async function writeUserSession(sessionData) {
  try {
    const path = getUserSessionFilePath();

    await FileSystem.writeAsStringAsync(
      path,
      JSON.stringify(sessionData || {}, null, 2)
    );

    return true;
  } catch (error) {
    console.warn("Failed to write user session:", error);
    throw error;
  }
}

export async function saveUserSession(user) {
  const session = {
    ...user,
    savedAt: new Date().toISOString(),
  };

  await writeUserSession(session);
  return session;
}

export async function clearUserSession() {
  try {
    const path = getUserSessionFilePath();
    const info = await FileSystem.getInfoAsync(path);

    if (info.exists) {
      await FileSystem.deleteAsync(path, { idempotent: true });
    }

    return true;
  } catch (error) {
    console.warn("Failed to clear user session:", error);
    return false;
  }
}

export async function getCurrentUserEmail() {
  const session = await readUserSession();
  return String(session?.email || session?.userEmail || "").toLowerCase();
}

export async function isUserLoggedIn() {
  const session = await readUserSession();
  return !!session;
}