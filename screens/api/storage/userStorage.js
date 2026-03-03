// api/storage/userStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ================================
   USER PROFILE STORAGE (Payment)
================================ */
const USER_PROFILE_KEY_PREFIX = "USER_PROFILE_";

function buildKey(emailKey) {
  return `${USER_PROFILE_KEY_PREFIX}${emailKey}`;
}

export async function getUserProfile(emailKey) {
  try {
    const key = buildKey(emailKey);
    const json = await AsyncStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json);
  } catch (err) {
    console.warn("getUserProfile error", err);
    return null;
  }
}

export async function saveUserProfile(emailKey, profile) {
  try {
    const key = buildKey(emailKey);
    const json = JSON.stringify(profile);
    await AsyncStorage.setItem(key, json);
  } catch (err) {
    console.warn("saveUserProfile error", err);
  }
}

export async function getAllUserProfiles() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const userKeys = allKeys.filter((k) => k.startsWith(USER_PROFILE_KEY_PREFIX));

    if (userKeys.length === 0) return [];

    const keyValuePairs = await AsyncStorage.multiGet(userKeys);

    return keyValuePairs
      .map(([_, value]) => (value ? JSON.parse(value) : null))
      .filter(Boolean);
  } catch (err) {
    console.warn("getAllUserProfiles error", err);
    return [];
  }
}

export async function deleteUserProfile(emailKey) {
  try {
    const key = buildKey(emailKey);
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn("deleteUserProfile error", err);
  }
}

/* ================================
   USERS DB (your OLD code kept)
================================ */
const KEY = "USERS_DB";

export const getUsers = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const addUser = async (user) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(KEY, JSON.stringify(users));
};

export const findUserByEmail = async (email) => {
  const users = await getUsers();
  return users.find((u) => u.email === email);
};
