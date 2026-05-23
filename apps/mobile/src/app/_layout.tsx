import {
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_600SemiBold,
  Heebo_700Bold,
  useFonts,
} from "@expo-google-fonts/heebo";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore the race where the splash screen is already controlled.
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_600SemiBold,
    Heebo_700Bold,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore the race where splash is already hidden.
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
