import ListItem from "@/components/ListItem";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWatchLaterMovies } from "../../auth/WatchLaterManager";

export default function WatchLater() {
    const [movies, setMovies] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMovies = movies.filter((movie) =>
        String(movie.title || "")
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
    );

    const loadWatchLater = async () => {
        try {
            const data = await getWatchLaterMovies();
            setMovies(data);
        } catch (error) {
            console.error("Error loading watch later:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadWatchLater();
        }, [])
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#0A101D" }}
            edges={["top", "left", "right"]}
        >
            <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View
                        style={{ marginBottom: 16 }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 14,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "rgba(59,130,246,0.2)",
                                    padding: 6,
                                    borderRadius: 8,
                                }}
                            >
                                <Feather name="bookmark" size={38} color="#3B82F6" />
                            </View>

                            <Text
                                style={{
                                    color: "#E2E8F0",
                                    fontSize: 32,
                                    fontWeight: "700",
                                    marginLeft: 10,
                                }}
                            >
                                Watch Later
                            </Text>
                        </View>

                        <View
                            style={{
                                backgroundColor: "#1E293B",
                                borderRadius: 14,
                                paddingHorizontal: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <TextInput
                                placeholder="Search saved movies..."
                                placeholderTextColor="#94A3B8"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={{
                                    color: "#E2E8F0",
                                    fontSize: 14,
                                    paddingVertical: 10,
                                }}
                            />
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/movie_details",
                            params: {
                                movieId: String(item.movieId),
                                title: item.title,
                                posterPath: item.posterPath || undefined,
                                overview: item.overview || "",
                                releaseDate: item.releaseDate || "",
                                voteAverage: item.voteAverage || "0.0",
                            },
                        }}
                        asChild
                    >
                        <ListItem item={item} />
                    </Link>
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
                ListEmptyComponent={
                    <Text
                        style={{
                            color: "#94A3B8",
                            textAlign: "center",
                            marginTop: 40,
                            fontSize: 14,
                        }}
                    >
                        {searchQuery.trim() ? "No matching movies found" : "No saved movies yet"}
                    </Text>
                }
            />
        </SafeAreaView>
    );
}