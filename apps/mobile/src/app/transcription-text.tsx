import { colors, palette } from "@/design-system/colors";
import { commonStyles } from "@/design-system/common-styles";
import { spacing } from "@/design-system/layout";
import { textStyles } from "@/design-system/typography";
import { PrimaryPressable } from "@/components/PrimaryPressable";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
    <View style={commonStyles.container}>
            <View style={commonStyles.liveTranscriptionRow}>
                <MaterialIcons
                    name={"notes" as React.ComponentProps<typeof MaterialIcons>["name"]}
                    size={20}
                    color={palette.primary[700]}
                />
                <Text style={commonStyles.title}>תוכן התמלול</Text>
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
                <PrimaryPressable>
                    <MaterialIcons
                        name={"auto-awesome" as React.ComponentProps<typeof MaterialIcons>["name"]}
                        size={19}
                        color={palette.white}
                    />
                    <Text style={styles.bottomActionText}>סכם באמצעות בינה מלאכותית</Text>
                </PrimaryPressable>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    bottomActionText: {
        ...textStyles.bodyMd,
        color: colors.light.textOnBrand,
        fontWeight: "600",
    },
});
