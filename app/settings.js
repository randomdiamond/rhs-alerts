import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useUserContext } from './userContext';

export default function Settings() {

    const { userData, setUserData } = useUserContext()
    const router = useRouter()


    const [appIsReady, setAppIsReady] = useState(false);
    function fetchFonts() {
        return Font.loadAsync({
            'Fredoka-SemiBold': require('./assets/fonts/FredokaOne-SemiBold.ttf'),
            'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
            'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
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
                    <Text style={styles.headerLabel} >Einstellungen</Text>
                    <View></View>

                </View>
            </SafeAreaView>
            <View style={styles.settingsContainer}>
                <Text style={styles.minorHeader}>Schuldaten</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Jahrgang {userData.jahrgang}</Text>
                    <TouchableOpacity style={styles.dataButton} onPress={() => router.push("/jahrgangSelection")}>
                        <FontAwesome5 name="pen" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>{userData.jahrgang === 12 ? "Kurse" : ("Klasse " + userData.jahrgang + userData.klasse)}</Text>
                    <TouchableOpacity style={styles.dataButton} onPress={() => userData.jahrgang === 12 ? router.push("/kursSelection") : router.push("/klasseSelection")}>
                        <FontAwesome5 name="pen" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView style={styles.logoContainer}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: 'center', }}>
                    <Text style={styles.headerText}>rhs</Text>
                    <FontAwesome5 name="bell" size={28} color="#051F45" solid />
                </View>
            </SafeAreaView>
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
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "#051F45"
    },
    settingsContainer: {
        backgroundColor: "#91C4F0",
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 30,
        borderRadius: 13,
        borderBottomWidth: 8,
        borderRightWidth: 5,
        borderColor: "#1B1B1B",
        borderRadius: 16,
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
        fontFamily: "Fredoka-SemiBold",
        color: "#1B1B1B",
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

    },
    minorHeader: {
        fontSize: 20,
        fontFamily: "Poppins-SemiBold",
        color: "#1B1B1B",
        textAlign: "center",
        marginBottom: 10,
    },
    logoContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
        alignItems: "center"
    },
    headerText: {
        color: '#051F45',
        fontSize: 29,
        fontFamily: 'Fredoka-SemiBold',

    },

})