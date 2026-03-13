import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // get the router object for navigation
  const router = useRouter();

  const handleSignIn = () => {
    // TODO: wire up authentication
    console.log("sign in", { username, password });
  };

  const handleSignUp = () => {
    // navigate to sign-up screen
    router.push("/signup");
  };

  const handleForgotPassword = () => {
    // navigate to reset flow
    console.log("forgot password");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome back</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button text="Sign In" onPress={handleSignIn} />

        <Link style={styles.forgotText} href="/forgotPassword">
          Forgot password?
        </Link>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Link href="/signup" style={styles.signupButton} asChild>
          <Text>Sign up</Text>
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
    backgroundColor: "#2D2929",
  },
  loginContainer: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#383434",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    color: "rgb(255, 255, 255)",
  },
  headingContainer: {
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
    color: "#ffffffc1",
    backgroundColor: "#484444",
  },
  forgotText: {
    color: "#919191",
    marginTop: 8,
  },
  signupContainer: {
    maxWidth: 230,
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
  signupButton: {
    color: "#CF3535",
    fontWeight: "700",
  },
});
