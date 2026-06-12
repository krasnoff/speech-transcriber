import { SystemWrapper } from "@/components/SystemWrapper";
import { colors, palette } from "@/design-system/colors";
import { commonStyles } from "@/design-system/common-styles";
import { radius, size, spacing } from "@/design-system/layout";
import { textStyles } from "@/design-system/typography";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type ToDoItem = {
  teamMemberName?: string;
  todo?: {
    item?: string;
  }[];
};

type SummaryPayload = {
  overallSummary?: string;
  mainInsights?: string;
  toDoList?: ToDoItem[];
};

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
    data?: string | string[];
  }>();

  const rawData = Array.isArray(params.data) ? params.data[0] : params.data;

  const parseInsightProperty = (propertyKey: "overallSummary" | "mainInsights"): string => {
    if (!rawData) {
      return createFallbackSummary("");
    }

    try {
      const decodedData = decodeURIComponent(rawData);
      const parsed = JSON.parse(decodedData) as SummaryPayload;
      return parsed[propertyKey]?.trim() || createFallbackSummary("");
    } catch {
      return createFallbackSummary(rawData);
    }
  };

  const parseToDoList = (propertyKey: "toDoList"): ToDoItem[] => {
    if (!rawData) {
      return [];
    }

    try {
      const decodedData = decodeURIComponent(rawData);
      const parsed = JSON.parse(decodedData) as SummaryPayload;
      return parsed[propertyKey] || [];
    } catch {
      return [];
    }
  };

  const summaryText = parseInsightProperty("overallSummary");
  const mainInsightsText = parseInsightProperty("mainInsights");
  const toDoItems = parseToDoList("toDoList");

  const today = new Date();
  const formattedDate = today.toLocaleString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <View style={commonStyles.liveTranscriptionRow}>
        <Text style={commonStyles.title}>סיכום ישיבה</Text>
      </View>

      <View style={[commonStyles.liveTranscriptionRow, {marginBottom: spacing.lg}]}>
        <Text>{formattedDate}</Text>
      </View>

      <View style={[commonStyles.liveTranscriptionRow, {marginBottom: spacing.lg}]}>
        <Pressable accessibilityRole="button" style={styles.shareButton}>
          <View style={styles.shareButtonContent}>
            <MaterialIcons
              name={"share" as React.ComponentProps<typeof MaterialIcons>["name"]}
              size={16}
              color={palette.white}
            />
            <Text style={styles.shareButtonText}>שתף</Text>
          </View>
        </Pressable>
      </View>

      <View style={{marginBottom: spacing.lg}}>
        <SystemWrapper>
          <View style={commonStyles.liveTranscriptionRow}>
            <MaterialIcons
              name={"auto-awesome" as React.ComponentProps<typeof MaterialIcons>["name"]}
              size={20}
              color={palette.primary[700]}
            />
            <Text style={[commonStyles.title, {color: palette.primary[700]}]}>תקציר</Text>
          </View>

          <View style={styles.summaryScroll}>
            <Text style={styles.summaryText}>{summaryText}</Text>
          </View>
        </SystemWrapper>
      </View>

      <View style={{marginBottom: spacing.lg}}>
        <SystemWrapper backgroundColor={palette.tertiary[400]} borderColor={palette.tertiary[400]}>
          <View style={commonStyles.liveTranscriptionRow}>
            <MaterialIcons
              name={"lightbulb" as React.ComponentProps<typeof MaterialIcons>["name"]}
              size={20}
              color={palette.neutral[900]}
            />
            <Text style={commonStyles.title}>תובנות מרכזיות</Text>
          </View>

          <View style={styles.summaryScroll}>
            <Text style={styles.summaryText}>{mainInsightsText}</Text>
          </View>
        </SystemWrapper>
      </View>

      <SystemWrapper>
        <View style={commonStyles.liveTranscriptionRow}>
          <MaterialIcons
            name={"checklist" as React.ComponentProps<typeof MaterialIcons>["name"]}
            size={20}
            color={palette.primary[700]}
          />
          <Text style={[commonStyles.title, {color: palette.primary[700]}]}>משימות לביצוע</Text>
        </View>

        <View style={styles.summaryScroll}>
          {toDoItems.map((item, index) => (
            <View key={index} style={styles.summaryRow}>
              <Text style={[commonStyles.title, styles.teamMemberNameText]}>{item.teamMemberName}</Text>
              {item.todo?.map((todoItem, todoIndex) => (
                <View key={todoIndex} style={styles.todo}>
                  <Text style={styles.summaryText}>{todoItem.item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </SystemWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    direction: "rtl",
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  summaryListContent: {
    paddingBottom: spacing.xxxl,
  },
  summaryScroll: {
    width: "100%",
    direction: "rtl",
    justifyContent: "flex-end",
  },
  summaryRow: {
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
    lineHeight: 24,
  },
  teamMemberNameText: {
    fontSize: size.iconSm,
    color: palette.primary[700],
    lineHeight: 24
  },
  shareButton: {
    backgroundColor: palette.primary[700],
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  shareButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  shareButtonText: {
    ...textStyles.bodyMd,
    color: palette.white,
    lineHeight: 20,
  },
  todo: {
    backgroundColor: palette.neutral[100],
    minHeight: 45,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: "center",
    borderLeftWidth: 4,
    borderColor: palette.primary[700],
  }
});
