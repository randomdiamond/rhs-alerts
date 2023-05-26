import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from './userContext';

export default function KlasseSelection() {
    const router = useRouter();
    console.log(router)
    const { userData, setUserData } = useUserContext()
    console.log(userData)

    async function handleKlasseSelect(klasse) {
        try {
            const newUserData = {
                ...userData,
                klasse,
            };
            setUserData(newUserData);

            await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
        } catch (error) {
            console.error('Error saving data:', error);
        }
        router.push("/")
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
        <View style={{ flex: 1, gap: 30, padding: 30, alignItems: 'center' }}>
            <Text style={styles.klasseLabel}>Wähle deine Klasse</Text>

            {['A', 'B', 'C', 'D'].map((klasse) => (
                <TouchableOpacity
                    style={styles.klasseButton}
                    key={klasse}
                    onPress={() => handleKlasseSelect(klasse)}
                >
                    <Text style={styles.klasseButtonText}>{`Klasse ${userData.jahrgang + klasse}`}</Text>
                </TouchableOpacity>
            ))}
        </View>

    );
}
const styles = StyleSheet.create({
    klasseButton: {
        height: 60,
        backgroundColor: '#acd2ff',
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,

    },
    klasseButtonText: {
        color: '#0F2A52',
        fontSize: 20,
        fontFamily: 'Fredoka-SemiBold',

    },
    klasseLabel: {
        fontFamily: 'Fredoka-SemiBold',
        fontStyle: 'normal',
        fontSize: 32,
        textAlign: 'center',
        color: '#0F2A52',
        padding: 20,
        paddingTop: 0,
    },
})