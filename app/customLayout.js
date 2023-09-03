import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Slot, Link, usePathname, useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { UserContext } from './userContext';
import { VertretungsplanContext } from './vertretungsplanContext';




export default function CustomLayout() {
  const [userData, setUserData] = useState(null);
  const [vertretungsplanData, setVertretungsplanData] = useState(null);
  const pathname = usePathname();
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
  if (pathname === "/settings") {
    return (<UserContext.Provider value={{ userData, setUserData }}>
      <VertretungsplanContext.Provider value={{ vertretungsplanData, setVertretungsplanData }}>
        <Slot />
      </VertretungsplanContext.Provider>
    </UserContext.Provider>)
  }



  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <VertretungsplanContext.Provider value={{ vertretungsplanData, setVertretungsplanData }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ width: 30 }}></View>
            <View style={styles.logoContainer}>
              <Text style={styles.headerText}>rhs</Text>
              <FontAwesome5 name="bell" size={28} color="#0F2A52" solid />
            </View>
            <Link href="/settings">
              <FontAwesome name="gear" size={30} color="#0F2A52" solid />
            </Link>
          </View>
          <View style={styles.content}>
            <Slot />
          </View>

          {console.log(pathname)}

          {(pathname === "/" || pathname === "/planPage") && (
            <View style={styles.footer}>

              <TouchableHighlight style={styles.navigationButtons} underlayColor={"#F5F8FD"} onPress={() => router.push("/")}>
                <FontAwesome5 name="user-circle" size={32} color={pathname === "/" ? "#FFAD33" : "#1B1B1B"} solid />
              </TouchableHighlight>
              <TouchableHighlight style={styles.navigationButtons} underlayColor={"#F5F8FD"} onPress={() => router.push("/planPage")}>
                <FontAwesome name="table" size={32} color={pathname === "/planPage" ? "#FFAD33" : "#1B1B1B"} solid />
              </TouchableHighlight>

            </View>)}

        </View>
      </VertretungsplanContext.Provider>
    </UserContext.Provider >
  );

  ;
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#F5F8FD'

  },
  header: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#91C4F0',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 22,
  },
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
  content: {
    flex: 1,
  },
  footer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 56,
    marginBottom: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
  navigationButtons: {
    borderRadius: 100, padding: 9
  }
});



