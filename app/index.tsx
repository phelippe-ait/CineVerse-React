import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { signIn } from "../auth/AuthManager";
import { Button } from "../components/Button";
import { colours } from "../styles/colours";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // get the router object for navigation
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please fill in email and password.");
      return;
    }

    try {
      // TODO: Implement actual sign-in logic
      setLoading(true);
      await signIn(email, password);
      // router.replace("/home");
      router.replace("/tabs/discover");
    } catch (error: any) {
      Alert.alert("Sign in failed", error.message || "Something went wrong.");
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
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
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          text={loading ? "Signing In..." : "Sign In"}
          onPress={handleSignIn}
        />

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
    backgroundColor: "#0a101d",
  },
  loginContainer: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#38384daf",
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
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    marginBottom: 15,
    color: colours.textPrimary,
    backgroundColor: colours.inputBackground,
  },
  forgotText: {
    color: colours.textSecondary,
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
    color: colours.textSecondary,
  },
  signupButton: {
    color: colours.accent,
    fontWeight: "700",
  },
});
