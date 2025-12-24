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
    // Here you can call API to save updated data
    Alert.alert("Success", "Profile updated successfully");
    setEditMode(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("MemberHome")}
        >
          <Ionicons name="arrow-back" size={26} color="#020617" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSub}>View and update your information</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <Image
            source={require("../../assets/avatar.png")} // replace with member image if available
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.editPicButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Details */}
        <View style={styles.detailCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            editable={editMode}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} editable={false} />

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            editable={editMode}
          />

          <Text style={styles.label}>Role</Text>
          <TextInput style={styles.input} value={role} editable={false} />

          <TouchableOpacity
            style={editMode ? styles.saveBtn : styles.editBtn}
            onPress={editMode ? handleSave : () => setEditMode(true)}
          >
            <Text style={styles.btnText}>
              {editMode ? "Save Changes" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 20, paddingBottom: 50 },

  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },

  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#020617",
  },
  headerSub: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },

  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e5e7eb",
  },
  editPicButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4e9efc",
    borderRadius: 20,
    padding: 6,
  },

  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    fontSize: 16,
    color: "#020617",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 6,
  },

  editBtn: {
    backgroundColor: "#4e9efc",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
