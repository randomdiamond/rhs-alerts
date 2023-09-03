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


    return (
        <View style={{ flex: 1, gap: 20, padding: 30, alignItems: 'center' }}>
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

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 250,
        backgroundColor: '#91C4F0',
        borderRadius: 29,
        borderBottomWidth: 5,
        borderRightWidth: 3,
        borderColor: "#1B1B1B",

    },
    klasseButtonText: {
        color: '#1B1B1B',
        fontSize: 22,
        fontFamily: 'Fredoka-SemiBold',

    },
    klasseLabel: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        textAlign: 'center',
        color: '#1B1B1B',
        padding: 20,
        paddingTop: 0,
    },
})