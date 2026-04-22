import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signUp } from "../auth/AuthManager";
import { Button } from "../components/Button";
import { colours } from "../styles/colours";



export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        <Text style={styles.heading}>Create Account</Text>

        <TextInput
          style={[
            styles.input,
            focusedField === "name" && styles.inputFocused,
          ]}
          placeholder="Name"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          autoCapitalize="words"
          editable={!loading}
        />

        <TextInput
          style={[
            styles.input,
            focusedField === "email" && styles.inputFocused,
          ]}
          placeholder="Email"
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
            placeholder="Password"
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
          text={loading ? "Signing Up..." : "Sign Up"}
          onPress={handleSignUp}
          disabled={loading}
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
    color: "#FFFFFF",
    padding: 12,
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#484444",
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
    backgroundColor: "#484444",
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
  signupButton: {
    color: colours.accent,
    fontWeight: "700",
  },
});
