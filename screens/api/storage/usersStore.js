import AsyncStorage from "@react-native-async-storage/async-storage";

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
