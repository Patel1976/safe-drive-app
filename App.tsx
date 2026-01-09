/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from "@react-native-community/geolocation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./pages/context/AuthContext";
import RootNavigator from "./pages/navigation/RootNavigator";
import SplashScreen from "./pages/components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [location, setLocation] = useState<any>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    const requestLocation = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message: "This app requires location access to report incidents.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert("Permission Denied", "Location permission is required.");
            return;
          }
        }
        setPermissionGranted(true);
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
          },
          (error) => {
            console.error(error);
            Alert.alert("Error", "Unable to fetch location.");
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        console.error(err);
      }
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <AuthProvider>
          <NavigationContainer>
            {showSplash ? (
              <SplashScreen onFinish={handleSplashFinish} />
            ) : (
              permissionGranted && <RootNavigator />
            )}
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
