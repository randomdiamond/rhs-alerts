import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";



export default function planPage() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Stack.Screen
                options={{
                    title: "planPage",
                }}
            />

            <Text>Home Screen</Text>

            <Link href={{ pathname: "details", params: { name: "Bacon" } }}>
                Go to Details
            </Link>
        </View>
    );
}