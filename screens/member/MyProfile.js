import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberProfileScreen({ navigation, route }) {
  const { fullName, email, role } = route.params || {};

  const [name, setName] = useState(fullName || "");
  const [mobile, setMobile] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    if (!name || !mobile) {
      Alert.alert("Error", "Name and Mobile cannot be empty");
      return;
    }
    Alert.alert("Success", "Profile updated successfully");
    setEditMode(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={26} color="#e5e7eb" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={40} color="#38bdf8" />
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSub}>
            View & update your personal details
          </Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.editPicButton}>
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <Field
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            editable={editMode}
          />

          <Field
            label="Email"
            icon="mail-outline"
            value={email}
            editable={false}
          />

          <Field
            label="Mobile"
            icon="call-outline"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            editable={editMode}
          />

          <Field
            label="Role"
            icon="shield-checkmark-outline"
            value={role}
            editable={false}
          />

          <TouchableOpacity
            style={editMode ? styles.saveBtn : styles.editBtn}
            onPress={editMode ? handleSave : () => setEditMode(true)}
          >
            <Ionicons
              name={editMode ? "save-outline" : "create-outline"}
              size={18}
              color="#fff"
            />
            <Text style={styles.btnText}>
              {editMode ? " Save Changes" : " Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable Input Field */
function Field({ label, icon, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={icon} size={18} color="#94a3b8" />
        <TextInput
          style={styles.input}
          placeholderTextColor="#64748b"
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  container: {
    padding: 20,
    paddingBottom: 50,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 8,
  },

  headerSub: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  profilePicContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  editPicButton: {
    position: "absolute",
    bottom: 4,
    right: 120 / 4,
    backgroundColor: "#38bdf8",
    borderRadius: 18,
    padding: 6,
  },

  detailCard: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#e5e7eb",
  },

  editBtn: {
    flexDirection: "row",
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 14,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 14,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

