import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import { Slot, Link, usePathname, useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { UserContext } from './userContext';




export default function CustomLayout() {
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
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
  if (pathname === "/settings") {
    return (<UserContext.Provider value={{ userData, setUserData }}><Slot /></UserContext.Provider>)
  }



  return (
    <UserContext.Provider value={{ userData, setUserData }}>
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
            <Link href="/"><FontAwesome5 name="user-circle" size={32} color="#0F2A52" solid /></Link>
            <Link href="/planPage"><FontAwesome name="table" size={32} color="#0F2A52" solid /></Link>
          </View>)}

      </View>
    </UserContext.Provider>
  );

  ;
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#DEF4F2',
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
});



