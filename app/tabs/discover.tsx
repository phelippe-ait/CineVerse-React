import apiManager from "@/api/apiManager";
import ListItem from "@/components/ListItem";
import { Movie } from "@/Models/APIModels";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Discover() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);
    const isLandscape = width > height;
    const loadingRef = useRef(false);


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

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <FlatList
                key={isLandscape ? "cols-4" : "cols-2"}
                data={popularMovies}
                keyExtractor={(movie) => movie.id.toString()}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/movie_details",
                            params: { movieId: item.id.toString(), title: item.title, posterPath: item.posterPath ?? undefined, overview: item.overview, releaseDate: item.releaseDate },
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