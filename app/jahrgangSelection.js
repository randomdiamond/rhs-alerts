import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUserContext } from './userContext';

export default function JahrgangSelection() {

    const { userData, setUserData } = useUserContext()
    const router = useRouter();

    function handleJahrgangSelect(jahrgang) {
        setUserData(prevState => ({
            ...prevState,
            jahrgang,
        }));
        if (jahrgang > 11) {
            router.push('/kursSelection')
        }
        else {
            router.push('/klasseSelection')
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'space-around', padding: 30, alignItems: 'center' }}>
            <Text style={styles.jahrgangLabel}>Wähle deinen Jahrgang!</Text>

            {Array.from({ length: 7 }, (_, i) => i + 5).map((jahrgang) => (
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
        height: 60,
        width: 250,
        backgroundColor: '#91C4F0',
        borderRadius: 29,
        borderBottomWidth: 5,
        borderRightWidth: 3,
        borderColor: "#1B1B1B",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    jahrgangButtonText: {
        color: '#1B1B1B',
        fontSize: 22,
        fontFamily: 'Fredoka-SemiBold',

    },
    jahrgangLabel: {
        fontFamily: 'Poppins-Bold',

        fontSize: 32,
        textAlign: 'center',
        color: '#1B1B1B',
        padding: 20,
        paddingTop: 0,
    },
})