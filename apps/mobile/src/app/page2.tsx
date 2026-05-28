import { Text, View, StyleSheet, Pressable, Alert, Linking } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/design-system/colors";
import { requestRequiredPermissions } from "@/lib/permissions";
import { textStyles } from "@/design-system/typography";

export default function Page2() {
  const router = useRouter();

  const setupPermissions = async () => {
    const granted = await requestRequiredPermissions();

    if (granted) {
      router.replace("/");
      return;
    }

    Alert.alert(
      "Missing permissions",
      "Please enable microphone and storage permissions in app settings.",
      [
        {
          text: "Open settings",
          onPress: () => {
            Linking.openSettings();
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשאות</Text>
      <Text style={styles.subtitle}>
        נדרשות הרשאות מיקרופון וגישה לקבצים כדי להתחיל בהקלטה ותמלול חי.
      </Text>
      <Pressable
        onPress={setupPermissions}
        style={styles.actionButton}
        accessibilityRole="button"
      >
        <Text style={styles.actionButtonText}>הגדרת הרשאות</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    ...textStyles.titleLg,
  },
  subtitle: {
    ...textStyles.bodyMd,
    textAlign: "center",
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: colors.dark.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  actionButtonText: {
    ...textStyles.bodyMd,
    color: colors.light.surface,
  },
});
