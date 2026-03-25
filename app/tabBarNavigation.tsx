import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// Screens
import Discover from "@/app/tabs/discover";
import Home from "@/app/tabs/home";

const Tabs = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Discover" component={Discover} />
    </Tabs.Navigator>
  );
}

export default function TabBarNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}