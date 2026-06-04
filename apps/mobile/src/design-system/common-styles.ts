import { StyleSheet } from "react-native";
import { spacing } from "./layout";
import { colors } from "./colors";
import { textStyles } from "./typography";

export const commonStyles = StyleSheet.create({
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
    }
});