import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	addToWatchLater,
	isMovieInWatchLater,
	removeFromWatchLater
} from "../auth/WatchLaterManager";


export default function MovieDetails() {
	const params = useLocalSearchParams<
		"/movie_details",
		{ movieId?: string; title?: string; posterPath?: string; overview?: string; releaseDate?: string }
	>();

	const posterUrl = params.posterPath
		? `https://image.tmdb.org/t/p/w342${params.posterPath}`
		: null;

	const [saved, setSaved] = useState(false);

	const handleWatchLater = async () => {
		if (!params.movieId) return;

		const movieId = Number(params.movieId);

		try {
			if (saved) {
				setSaved(false);
				await removeFromWatchLater(movieId);
			} else {
				setSaved(true);
				await addToWatchLater({
					movieId,
					title: params.title ? String(params.title) : "",
					posterPath: params.posterPath ? String(params.posterPath) : "",
					overview: params.overview ? String(params.overview) : "",
					releaseDate: params.releaseDate ? String(params.releaseDate) : "",
				});
			}
		} catch (error) {
			console.error("Watch Later error:", error);

    
			setSaved((prev) => !prev);
		}
	};

	useEffect(() => {
		const checkIfSaved = async () => {
			try {
				if (!params.movieId) return;

				const exists = await isMovieInWatchLater(Number(params.movieId));
				setSaved(exists);
			} catch (error) {
				console.error("Check watch later error:", error);
			}
		};

		checkIfSaved();
	}, [params.movieId]);



	return (
		<SafeAreaView style={styles.safeAreaContainer}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.heading}>{params.title}</Text>
				{posterUrl ? (
					<View style={{ position: "relative" }}>
						<Image
							source={{ uri: posterUrl }}
							style={styles.poster}
							resizeMode="contain"
						/>

						{/* watch later button */}
						<TouchableOpacity
							onPress={handleWatchLater}
							activeOpacity={0.7}
							style={{
								position: "absolute",
								top: 12,
								right: 12,
								backgroundColor: "rgb(15,23,42,0.8)",
								padding: 8,
								borderRadius: 20,
							}}
						>
							<Feather
								name="bookmark"
								size={20}
								color={saved ? "#3B82F6" : "#94A3B8"}
							/>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.posterPlaceholder}>
						<MaterialIcons name="movie" size={48} color="#1E293B" />
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
		backgroundColor: "#1E293B",
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
