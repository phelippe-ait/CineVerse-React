import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function MovieDetails() {
	const params = useLocalSearchParams<
		"/movie_details",
		{ movieId?: string; title?: string; posterPath?: string; overview?: string; releaseDate?: string }
	>();

	const posterUrl = params.posterPath
		? `https://image.tmdb.org/t/p/w342${params.posterPath}`
		: null;

	return (
		<SafeAreaView style={styles.safeAreaContainer}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.heading}>{params.title}</Text>

				{posterUrl ? (
					<Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="contain" />
				) : (
					<View style={styles.posterPlaceholder}>
						<MaterialIcons name="movie" size={48} color="#666" />
					</View>
				)}
				<Text style={styles.meta}>Release: {params.releaseDate}</Text>
				<Text style={styles.overview}>{params.overview}</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
		backgroundColor: "#2D2929",
	},
	container: {
		padding: 20,
	},
	heading: {
		fontSize: 28,
		fontWeight: "600",
		color: "#fff",
		marginBottom: 16,
	},
	poster: {
		width: "100%",
		aspectRatio: 2 / 3,
		borderRadius: 12,
		marginBottom: 16,
	},
	posterPlaceholder: {
		width: "100%",
		height: "100%",
		backgroundColor: "#ddd",
		justifyContent: "center",
		alignItems: "center",
	},
	meta: {
		color: "#ddd",
		marginBottom: 6,
	},
	overview: {
		color: "#fff",
		marginTop: 12,
		lineHeight: 22,
	},
});
