import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { logOut } from "../../auth/AuthManager";
import { Button } from "../../components/Button";
import { colours } from "../../styles/colours";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

  // get the router object for navigation
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>CineVerse</Text>
          {/* <Text style={styles.navBarText}>Exit</Text> */}
          <Button
            text="Exit"
            onPress={() => logOut().then(() => router.replace("/"))}
          />   
      </View>

      <Text style={styles.heading}>Home Screen</Text>

      <Button
        text="Movie details"
        onPress={() => router.push("/movie_details")}
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
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#383434",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navBarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 20,
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
    color: colours.accent,
    fontWeight: "700",
  },
});
