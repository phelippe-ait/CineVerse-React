import { Link } from "expo-router";
import apiManager from "@/api/apiManager";
import ListItem from "@/components/ListItem";
import { Movie } from "@/Models/APIModels";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Discover() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    useEffect(() => {
        apiManager
            .getPopularMovies()
            .then((movies) => setPopularMovies(movies))
            .catch((error) => {
                console.error("Failed to fetch popular movies:", error);
            });
    }, []);

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
                            params: { movieId: item.id.toString(), title: item.title , posterPath: item.posterPath ?? undefined , overview: item.overview, releaseDate: item.releaseDate },
                        }}
                        asChild
                    >
                        <ListItem item={item} />
                    </Link>
                )}
                numColumns={isLandscape ? 4 : 2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingHorizontal: 8 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});