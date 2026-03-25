import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <React.Fragment>
            {/* <StatusBar style="auto" /> */}
            <Stack>
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
                <Stack.Screen name="movie_details" options={{ title: "Movie Details", headerShown: false, presentation: "modal" }} />
            </Stack>
        </React.Fragment>
    );
}