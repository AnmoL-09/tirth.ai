import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    const [loaded, error] = useFonts({
    'Anton-Regular': require('../assets/fonts/Anton-Regular.ttf'),
    'Cardo-Italic': require('../assets/fonts/Cardo-Italic.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#000' }
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="divinity" />
      </Stack>
    </>
  );
}
