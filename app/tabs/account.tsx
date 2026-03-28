import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { logOut } from "../../auth/AuthManager";
import { Button } from "../../components/Button";
import { colours } from "../../styles/colours";

export default function Account() {

  // get the router object for navigation
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account Screen</Text>
      <Button
        text="Log out"
        style={{backgroundColor: "red"}}
        onPress={() => logOut().then(() => router.replace("/"))}
      />
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
    backgroundColor: colours.primary,
  },
  heading: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    color: "rgb(255, 255, 255)",
  }
});
