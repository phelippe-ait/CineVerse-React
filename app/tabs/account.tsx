import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { auth } from "../../auth/firebaseConfig";
import { logOut } from "../../auth/AuthManager";
import { Button } from "../../components/Button";
import { colours } from "../../styles/colours";

export default function Account() {
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser?.displayName) {
      setUserName(currentUser.displayName);
    }

    if (currentUser?.email) {
      setUserEmail(currentUser.email);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Profile</Text>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(userName?.charAt(0) || "U").toUpperCase()}
          </Text>
        </View>

        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Account</Text>

        <View style={styles.infoRow}>
          <Feather name="mail" size={18} color="#3B82F6" />
          <Text style={styles.infoText}>{userEmail || "No email available"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="bookmark" size={18} color="#3B82F6" />
          <Text style={styles.infoText}>Watch Later enabled</Text>
        </View>
      </View>

      <Button
        text="Log out"
        style={styles.logoutButton}
        onPress={() => logOut().then(() => router.replace("/"))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    paddingTop: 30,
    marginBottom: 24,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  userEmail: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 6,
  },

  infoCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  infoText: {
    color: "#E2E8F0",
    marginLeft: 12,
    fontSize: 15,
  },

  logoutButton: {
    backgroundColor: "#1E293B",
    alignItems: "center"
  },
});