import { Link } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "@/components/ListItem";
import { getWatchLaterMovies } from "../../auth/WatchLaterManager";
import Feather from "@expo/vector-icons/Feather";

export default function WatchLater() {
    const [movies, setMovies] = useState<any[]>([]);

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
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 16,
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
                        No saved movies yet
                    </Text>
                }
            />
        </SafeAreaView>
    );
}