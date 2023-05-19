import { useState, useEffect, useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import LoadingComponent from "./loadingComponent";
import { UserContext } from './userContext';

export default function Home() {

    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
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

        async function fetchData() {
            try {
                const data = await AsyncStorage.getItem('userData');

                if (data !== null) {
                    setUserData(JSON.parse(data));
                    console.log('Retrieved data:', data);
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            } finally {
                setLoading(false);
            }
        }

        if (!appIsReady) {
            prepare();
        } else {
            fetchData();
        }
    }, [appIsReady]);

    if (!appIsReady || loading) {
        return <LoadingComponent />
    }
    if (userData === null) {
        console.log(userData, "userData=null")
        return <Redirect href="jahrgangSelection" />
    }

    return (

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8F8" }}>

            <Stack.Screen
                options={{
                    title: "home",
                }}
            />
            <Text style={{ fontFamily: "Fredoka-SemiBold" }}>Home Screen</Text>
        </View>

    );
}

