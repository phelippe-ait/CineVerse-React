import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signIn } from "../auth/AuthManager";
import { Button } from "../components/Button";
import { colours } from "../styles/colours";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please fill in email and password.");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/tabs/discover");
    } catch (error: any) {
      Alert.alert("Sign in failed", error.message || "Something went wrong.");
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/images/cinelogo.png")}
          style={styles.logo}
          resizeMode="contain"
          fadeDuration={0}
        />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Welcome back</Text>

        <TextInput
          style={[
            styles.input,
            focusedField === "email" && styles.inputFocused,
          ]}
          placeholder="you@example.com"
          placeholderTextColor="#AAAAAA"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />

        <View
          style={[
            styles.passwordWrapper,
            focusedField === "password" && styles.passwordWrapperFocused,
          ]}
        >
          <TextInput
            style={styles.passwordInput}
            placeholder="password"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#919191"
            />
          </Pressable>
        </View>

        <Button
          text={loading ? "Signing In..." : "Sign In"}
          onPress={handleSignIn}
          disabled={loading}
        />

        <Link style={styles.forgotText} href="/forgotPassword">
          Forgot password?
        </Link>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{"Don't have an account?"}</Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0a101d",
  },

  logoWrapper: {
    width: 500,
    height: 500,
    alignSelf: "center",
    marginBottom: -100,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 500,
    height: 500,
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    color: "#FFFFFF",
    letterSpacing: 0.5,
    alignSelf: "flex-start",
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    marginBottom: 15,
    color: "#FFFFFF",
    backgroundColor: colours.inputBackground,
  },
  inputFocused: {
    borderColor: "#3B82F6",
  },
  passwordWrapper: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: colours.inputBackground,
  },
  passwordWrapperFocused: {
    borderColor: "#3B82F6",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: "#FFFFFF",
  },
  eyeIcon: {
    paddingRight: 12,
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
