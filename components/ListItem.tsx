import { Movie } from '@/Models/APIModels';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';


export default function ListItem({ item }: { item: Movie }) {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const posterUrl = item.posterPath
        ? `https://image.tmdb.org/t/p/w342${item.posterPath}`
        : null;

    return (
        <View style={[styles.container, { width: isLandscape ? '22%' : '45%' } ]}>
            <View style={styles.posterContainer}>
                {posterUrl ? (
                    <Image
                        source={{ uri: posterUrl }}
                        style={styles.poster}
                        resizeMode="contain" // Ensure the image fits within the container without distortion
                    />
                ) : (
                    <View style={styles.posterPlaceholder} />
                )}
            </View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'
            >{item.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
    posterContainer: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 8,
        overflow: "hidden", // Ensure the poster image is contained within the rounded corners
        backgroundColor: "#eee",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    posterPlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ddd",
        // backgroundImage: "url(https://via.placeholder.com/120x180?text=No+Image)", // Placeholder image for missing posters
        // backgroundSize: "cover",
        // backgroundPosition: "center",
    },
    title: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
});