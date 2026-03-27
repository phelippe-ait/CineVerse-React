import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabsLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#fff", headerShown: false, tabBarStyle: { backgroundColor: "#383434" }, tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" } }}>
			<Tabs.Screen name="discover" options={{ title: "Discover", tabBarIcon: ({ color }) => <MaterialIcons name="movie" size={24} color={color} /> }} />
			<Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} /> }} />
		</Tabs>
	)
}
