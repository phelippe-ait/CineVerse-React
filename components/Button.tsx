import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

interface ButtonProps {
    text: string;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export function Button({ text, style, onPress }: ButtonProps) {
    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#CF3535",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#2c465dff",
        borderRadius: 5,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});