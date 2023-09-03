import { useState, useEffect, useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import LoadingComponent from "./loadingComponent";
import { UserContext } from './userContext';
import { VertretungsplanContext } from "./vertretungsplanContext";
import axios from 'axios';
import base64 from 'react-native-base64';
import VertretungsplanComponent from "./VertretungsplanComponent";

export default function Home() {

    const { userData, setUserData } = useContext(UserContext);
    const { vertretungsplanData, setVertretungsplanData } = useContext(VertretungsplanContext);
    const [loading, setLoading] = useState(true);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (vertretungsplanData === null) {
                    //  Fetch vertretungsplan data from the API
                    const username = 'vertretungsplan';
                    const password = '18071864';
                    const response = await axios.get('http://rhs-alerts.dsh.gg:8000', {
                        headers: {
                            'Authorization': 'Basic ' + base64.encode(username + ":" + password)
                        }
                    });
                    console.log(response.data);
                    setVertretungsplanData(response.data);
                }

                // Fetch userdata from AsyncStorage
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    setUserData(JSON.parse(data));
                    console.log('Retrieved data:', data);
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            } finally {
                setAppIsReady(true);
            }
        }


        fetchData();

    }, []);

    if (!appIsReady) {
        return <LoadingComponent />
    }

    if (userData === null) {
        console.log(userData, "userData=null");
        return <Redirect href="jahrgangSelection" />;
    }

    return (
        <VertretungsplanComponent vertretungsplanData={vertretungsplanData} containNews={true} dataFilter={`${userData.jahrgang}${userData.klasse}`} />
    );
}

