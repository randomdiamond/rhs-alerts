import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { UserContext } from './userContext';
import { color } from "react-native-reanimated";
export default function Settings() {

    const { userData, setUserData } = useContext(UserContext);
    const router = useRouter()


    const [appIsReady, setAppIsReady] = useState(false);
    function fetchFonts() {
        return Font.loadAsync({
            'Fredoka-SemiBold': require('./assets/fonts/FredokaOne-SemiBold.ttf'),
        });
    };






    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await fetchFonts();

            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, []);

    if (!appIsReady) {
        return null;
    }
    return (
        <>
            <SafeAreaView>
                <View style={styles.navContainer}>

                    <TouchableOpacity
                        onPress={() => router.back()}>
                        <FontAwesome5 name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerLabel} >EINSTELLUNGEN</Text>
                    <View></View>

                </View>
            </SafeAreaView>
            <View style={styles.settingsContainer}>
                <Text>Ausgewählte Daten</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Jahrgang {userData.jahrgang}</Text>
                    <TouchableOpacity style={styles.dataButton} onPress={() => router.push("/jahrgangSelection")}>
                        <Text style={styles.dataButtonText}>ändern</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Klasse {userData.jahrgang + userData.klasse}</Text>
                    <TouchableOpacity style={styles.dataButton} onPress={() => router.push("/klasseSelection")}>
                        <Text style={styles.dataButtonText}>ändern</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 22,
    },
    headerLabel: {
        fontSize: 20
    },
    settingsContainer: {
        backgroundColor: "#D3E8FB",
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 30,
        borderRadius: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // this property is for Android


    },
    dataContainer: {
        paddingVertical: 15,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    dataText: {
        fontSize: 19,
        fontFamily: "Fredoka-SemiBold"
    },
    dataButton: {
        backgroundColor: "#91C4F0",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100,
    },
    dataButtonText: {
        fontSize: 15,
        color: "#0F2A52",
        fontFamily: "Fredoka-SemiBold"

    }

})