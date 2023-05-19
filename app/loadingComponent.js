import { StyleSheet, View, Text } from "react-native";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';


export default function LoadingComponent() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><View style={styles.logoContainer}>

            <FontAwesome5 name="bell" size={28} color="#0F2A52" solid />
        </View>
        </View>)
}
const styles = StyleSheet.create({

    logoContainer: {

        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    headerText: {
        color: '#0F2A52',
        fontSize: 29,
        fontFamily: 'Fredoka-SemiBold',

    },
});