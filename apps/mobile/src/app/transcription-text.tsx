import { colors, palette } from "@/design-system/colors";
import { spacing } from "@/design-system/layout";
import { textStyles } from "@/design-system/typography";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TranscriptionTextPage() {
  const params = useLocalSearchParams<{ transcript?: string | string[] }>();
  const transcript = Array.isArray(params.transcript)
    ? params.transcript[0] ?? ""
    : params.transcript ?? "";
    const transcriptArr = transcript
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

  return (
    <View style={styles.container}>
            <View style={styles.liveTranscriptionRow}>
                <MaterialIcons
                    name={"notes" as React.ComponentProps<typeof MaterialIcons>["name"]}
                    size={20}
                    color={palette.primary[700]}
                />
                <Text style={styles.title}>תוכן התמלול</Text>
            </View>

            <ScrollView
                style={styles.transcriptionScroll}
                contentContainerStyle={styles.transcriptionListContent}
            >
                {transcriptArr.map((item, index) => (
                    <Text key={`${index}-${item.slice(0, 16)}`} style={styles.transcriptionText}>
                        {item}
                    </Text>
                ))}
            </ScrollView>

            <View style={styles.bottomActionContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.bottomActionButton,
                        pressed && styles.bottomActionButtonPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="סכם באמצעות בינה מלאכותית"
                >
                    <MaterialIcons
                        name={"auto-awesome" as React.ComponentProps<typeof MaterialIcons>["name"]}
                        size={19}
                        color={palette.white}
                    />
                    <Text style={styles.bottomActionText}>סכם באמצעות בינה מלאכותית</Text>
                </Pressable>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: spacing.xl,
        gap: spacing.sm,
        direction: "rtl",
        paddingTop: spacing.lg,
        paddingBottom: spacing.xl,
    },
    title: {
        ...textStyles.titleMd,
        color: colors.light.textPrimary,
    },
    liveTranscriptionRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: spacing.xs,
    },
    transcriptionListContent: {
        paddingBottom: spacing.xxxl + spacing.xl,
    },
    transcriptionScroll: {
        flex: 1,
        width: "100%",
    },
    transcriptionText: {
        ...textStyles.bodyMd,
        color: colors.light.textPrimary,
        paddingBottom: spacing.sm,
    },
    bottomActionContainer: {
        position: "absolute",
        left: spacing.xl,
        right: spacing.xl,
        bottom: spacing.lg,
        marginBottom: spacing.lg,
    },
    bottomActionButton: {
        minHeight: 50,
        borderRadius: 12,
        backgroundColor: colors.light.brandPrimary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.lg,
        shadowColor: colors.light.shadow,
        shadowOpacity: 0.24,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    bottomActionButtonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.96,
    },
    bottomActionText: {
        ...textStyles.bodyMd,
        color: colors.light.textOnBrand,
        fontWeight: "600",
    },
});
