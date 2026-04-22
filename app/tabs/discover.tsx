import apiManager from "@/api/apiManager";
import ListItem from "@/components/ListItem";
import { Movie } from "@/Models/APIModels";
import { Link } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../auth/firebaseConfig";





export default function Discover() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);
    const isLandscape = width > height;
    const loadingRef = useRef(false);
    const [userName, setUserName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    

    const filteredMovies = popularMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loadMovies = () => {
        if (loadingRef.current) { return; } // Prevent multiple simultaneous loads
        if (page > totalPages) { return; }
        loadingRef.current = true;
        setIsLoading(true); // Show loading indicator
        apiManager
            .getPopularMovies(page)
            .then(([newMovies, totalPagesResponse]) => {
                setPopularMovies((prevMovies) => {
                    // Use a Set to track existing movie IDs for efficient duplicate checking
                    const existingMovieIds = new Set(prevMovies.map((movie) => movie.id));
                    const newMoviesFiltered = newMovies.filter(
                        (movie) => !existingMovieIds.has(movie.id)
                    );
                    // Return a new array combining existing movies with the new unique movies
                    return [...prevMovies, ...newMoviesFiltered];
                });

                if (totalPagesResponse !== totalPages) {
                    setTotalPages(totalPagesResponse);
                }

                setPage((prevPage) => prevPage + 1);
            })
            .catch((error) => {
                console.error("Failed to fetch popular movies:", error);
            })
            .finally(() => {
                loadingRef.current = false;
                setIsLoading(false);
            });
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.displayName) {
                setUserName(user.displayName);
            } else {
                setUserName("User");
            }
        });

        return unsubscribe;
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Load the first page of movies when the component mounts
    useEffect(() => {
        loadMovies();

    }, []);

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={{ padding: 20 }}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }

    const noResults = filteredMovies.length === 0;

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <FlatList

                ListHeaderComponent={
                    <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 }}>

                        {/* HEADER */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 20,
                            }}
                        >
                            <View>
                                <Text style={{ color: "#94A3B8", fontSize: 14 }}>
                                    {getGreeting()},
                                </Text>

                                <Text style={{ color: "#E2E8F0", fontSize: 26, fontWeight: "700" }}>
                                    {userName || "User"} 👋
                                </Text>
                            </View>

                            <Link href="/tabs/account" asChild>
                                <TouchableOpacity
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 24,
                                        backgroundColor: "#3B82F6",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
                                        {(userName?.charAt(0) || "U").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                        {/* SEARCH BAR */}
                        <View
                            style={{
                                backgroundColor: "#1E293B",
                                borderRadius: 14,
                                paddingHorizontal: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <TextInput
                                placeholder="Search movie title..."
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
                ListEmptyComponent={
                    noResults ? (
                        <Text
                            style={{
                                color: "#94A3B8",
                                textAlign: "center",
                                marginTop: 20,
                                fontSize: 14,
                            }}
                        >
                            No movies found
                        </Text>
                    ) : null
                }

                key={isLandscape ? "cols-4" : "cols-2"}
                data={filteredMovies}
                keyExtractor={(movie) => movie.id.toString()}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/movie_details",
                            params: { movieId: item.id.toString(), title: item.title, posterPath: item.posterPath ?? undefined, overview: item.overview, releaseDate: item.releaseDate, voteAverage: item.voteAverage },
                        }}
                        asChild
                    >
                        <ListItem item={item} />
                    </Link>


                )}
                numColumns={isLandscape ? 4 : 2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingHorizontal: 8 }}
                // Trigger loading more movies when the user scrolls near the end of the list
                onEndReached={loadMovies}
                onEndReachedThreshold={0.1}
                // Add a footer component to show a loading indicator when fetching more movies
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a101d'
    },
});