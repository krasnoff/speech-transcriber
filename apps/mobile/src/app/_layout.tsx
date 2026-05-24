import {
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_600SemiBold,
  Heebo_700Bold,
  useFonts,
} from "@expo-google-fonts/heebo";
import { colors } from "@/design-system/colors";
import { fontFamily } from "@/design-system/typography";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { Text, TextInput } from "react-native";
import { useEffect } from "react";

const TextComponent = Text as typeof Text & {
  defaultProps?: { style?: unknown };
};
const TextInputComponent = TextInput as typeof TextInput & {
  defaultProps?: { style?: unknown };
};

TextComponent.defaultProps = TextComponent.defaultProps ?? {};
TextComponent.defaultProps.style = [
  { fontFamily: fontFamily.sansRegular },
  TextComponent.defaultProps.style,
];

TextInputComponent.defaultProps = TextInputComponent.defaultProps ?? {};
TextInputComponent.defaultProps.style = [
  { fontFamily: fontFamily.sansRegular },
  TextInputComponent.defaultProps.style,
];

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

  return (
    <Drawer
      screenOptions={{
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: colors.dark.empathySoft,
          fontFamily: fontFamily.sansBold,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "מתמלל ישיבות",
        }}
      />
      <Drawer.Screen
        name="page2"
        options={{
          title: "מתמלל ישיבות",
        }}
      />
    </Drawer>
  );
}
