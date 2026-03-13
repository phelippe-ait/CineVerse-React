import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          value={username}
          onChangeText={setUsername}
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
          text="Sign Up"
          onPress={() => console.log("sign up", { name, username, password })}
        />
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
  input: {
    width: "80%",
    color: "#00000082",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
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
  headingContainer: {
    alignSelf: "flex-start",
  },
  heading: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    color: "rgb(255, 255, 255)",
  },
});
