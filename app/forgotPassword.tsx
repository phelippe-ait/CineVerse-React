import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../auth/firebaseConfig";
import { Button } from "../components/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent. Check your inbox.", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      let errorMessage = "Failed to send reset email. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Reset your Password</Text>

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
          editable={!isLoading}
        />

        <Button
          text={isLoading ? "Sending..." : "Reset Password"}
          onPress={handleResetPassword}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a101d",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#38384daf",
    borderRadius: 8,
    alignItems: "center",
  },
  forgotText: {
    marginTop: 15,
    color: "#919191",
    alignSelf: "flex-end",
  },
  signupContainer: {
    maxWidth: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  signupText: {
    fontSize: 16,
    color: "#919191",
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    color: "#FFFFFF",
    padding: 12,
    borderWidth: 1,
    borderColor: "#979494",
    borderRadius: 6,
    backgroundColor: "#484444",
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: "#3B82F6",
  },
});