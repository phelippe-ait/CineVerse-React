import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { colours, Colours } from "../styles/colours";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Reset your password</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Button style={styles.signupButton} text="Reset Password" onPress={() => console.log("reset password", { email })} />
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
  },
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffc1",
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
  signupButton: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#CF3535",
    borderRadius: 6,
  },
  input: {
    width: "100%",
    color: "#ffffffc1",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#484444",
  },
});