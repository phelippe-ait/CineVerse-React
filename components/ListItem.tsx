import { Movie } from '@/Models/APIModels';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

type Props = {
    item: Movie;
    onPress?: () => void;
};

export default function ListItem({ item, onPress }: Props) {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const posterUrl = item.posterPath
        ? `https://image.tmdb.org/t/p/w342${item.posterPath}`
        : null;

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.pressable,
            { width: isLandscape ? '22%' : '45%' }, 
            pressed && styles.pressed // Add visual feedback on press
        ]}>
            <View style={styles.posterContainer}>
                {posterUrl ? (
                    <Image
                        source={{ uri: posterUrl }}
                        style={styles.poster}
                        resizeMode="contain" // Ensure the image fits within the container without distortion
                    />
                ) : (
                    <View style={styles.posterPlaceholder}>
                        <MaterialIcons name="movie" size={48} color="#666" />
                    </View>
                )}
            </View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'
            >{item.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 10
    },
    pressed: {
        opacity: 0.75
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
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
});