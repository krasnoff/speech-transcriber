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
    data?: string;
  }>();

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
        {params.data ? (
          <>
            <Text style={styles.summaryText}>{JSON.parse(params.data).overallSummary}</Text>
          </>
        ) : (
          <Text style={styles.summaryText}>
            {createFallbackSummary(params.data as string)}
          </Text>
        )}
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
