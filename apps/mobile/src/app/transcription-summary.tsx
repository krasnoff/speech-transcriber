import { colors, palette } from "@/design-system/colors";
import { commonStyles } from "@/design-system/common-styles";
import { spacing } from "@/design-system/layout";
import { textStyles } from "@/design-system/typography";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const createFallbackSummary = (transcript: string) => {
  const lines = transcript
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return "עדיין לא נוצר סיכום.";
  }

  return lines.slice(0, 3).join("\n");
};

export default function TranscriptionSummaryPage() {
  const params = useLocalSearchParams<{
    summary?: string | string[];
    transcript?: string | string[];
  }>();

  const transcript = Array.isArray(params.transcript)
    ? params.transcript[0] ?? ""
    : params.transcript ?? "";

  const incomingSummary = Array.isArray(params.summary)
    ? params.summary[0] ?? ""
    : params.summary ?? "";

  const summary = incomingSummary.trim() || createFallbackSummary(transcript);
  const summaryItems = summary
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.liveTranscriptionRow}>
        <MaterialIcons
          name={"auto-awesome" as React.ComponentProps<typeof MaterialIcons>["name"]}
          size={20}
          color={palette.primary[700]}
        />
        <Text style={commonStyles.title}>סיכום תמלול</Text>
      </View>

      <ScrollView
        style={styles.summaryScroll}
        contentContainerStyle={styles.summaryListContent}
      >
        {summaryItems.map((item, index) => (
          <View key={`${index}-${item.slice(0, 16)}`} style={styles.summaryRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.summaryText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryListContent: {
    paddingBottom: spacing.xxxl,
  },
  summaryScroll: {
    flex: 1,
    width: "100%",
  },
  summaryRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  bullet: {
    ...textStyles.bodyMd,
    color: palette.primary[700],
    lineHeight: 24,
  },
  summaryText: {
    ...textStyles.bodyMd,
    color: colors.light.textPrimary,
    flex: 1,
    lineHeight: 24,
  },
});
