import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { colours, Colours } from "../styles/colours";
import { signUp } from "../auth/AuthManager";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
   
  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please fill in name, email and password.");
      return;
    }

    try {
      setLoading(true);

      await signUp(email, password, name);

      Alert.alert("Success", "Account created successfully.");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Sign up failed", error.message || "Something went wrong.");
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create an Account</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          text={loading ? "Signing Up..." : "Sign Up"}
          onPress={handleSignUp}
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <Link style={styles.signupButton} href="/" asChild>
          <Text>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#0a101d",
  },
  signupContainer: {
    maxWidth: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    alignItems: "center",
    width: "100%",
  },
  signupText: {
    fontSize: 16,
    color: "#919191",
  },
  input: {
    width: "90%",
    color: "#ffffffc1",
    padding: 12,
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#484444",
  },
  loginContainer: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colours.secondary,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headingContainer: {
    alignSelf: "flex-start",
  },
  heading: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    color: "rgb(255, 255, 255)",
  },
  signupButton: {
    color: colours.accent,
    fontWeight: "700",
  },
});
