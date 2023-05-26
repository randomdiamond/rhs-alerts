import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useUserContext } from './userContext';

export default function JahrgangSelection() {

    const { userData, setUserData } = useUserContext()
    const router = useRouter();

    function handleJahrgangSelect(jahrgang) {
        setUserData(prevState => ({
            ...prevState,
            jahrgang,
        }));
        router.push('/klasseSelection')
    };
    function fetchFonts() {
        return Font.loadAsync({
            'Fredoka-SemiBold': require('./assets/fonts/FredokaOne-SemiBold.ttf'),
        });
    };


    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await fetchFonts();

            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                (async () => await SplashScreen.hideAsync())()
            }
        }
        prepare();
    }, []);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', padding: 30, alignItems: 'center' }}>
            <Text style={styles.jahrgangLabel}>Wähle deinen Jahrgang!</Text>

            {Array.from({ length: 9 }, (_, i) => i + 5).map((jahrgang) => (
                <TouchableOpacity
                    style={styles.jahrgangButton}
                    key={jahrgang}
                    onPress={() => handleJahrgangSelect(jahrgang)}
                >
                    <Text style={styles.jahrgangButtonText}>{`Jahrgang ${jahrgang}`}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    jahrgangButton: {
        height: 53,
        backgroundColor: '#acd2ff',
        width: 180,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,

    },
    jahrgangButtonText: {
        color: '#0F2A52',
        fontSize: 20,
        fontFamily: 'Fredoka-SemiBold',

    },
    jahrgangLabel: {
        fontFamily: 'Fredoka-SemiBold',
        fontStyle: 'normal',
        fontSize: 32,
        textAlign: 'center',
        color: '#0F2A52',
        padding: 20,
        paddingTop: 0,
    },
})