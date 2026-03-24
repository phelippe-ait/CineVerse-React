import { Link, useRouter } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, Text, useWindowDimensions } from "react-native";
import { colours } from "../styles/colours";
import apiManager from "@/api/apiManager";
import { Movie } from "@/Models/APIModels";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "@/components/ListItem";

export default function PopularMovies() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const { width, height } = useWindowDimensions();

    const isLandscape = width > height;

    useEffect(() => {
        apiManager.getPopularMovies().then((movies) => {
            setPopularMovies(movies);
        }).catch((error) => {
            console.error("Failed to fetch popular movies:", error);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                key={isLandscape ? `cols-4` : `cols-2`} // important: force grid relayout when columns change
                data={popularMovies}
                keyExtractor={(movie) => movie.id.toString()}
                renderItem={({ item }) => <ListItem item={item} />}
                numColumns={isLandscape ? 4 : 2}
                columnWrapperStyle={{justifyContent: "space-between"}} // add spacing between items in the same row
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
                ListHeaderComponent={() => (
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 10, textAlign: "center" }}>
                        Popular Movies
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});