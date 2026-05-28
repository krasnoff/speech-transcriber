import type { ReactNode } from "react";
import type { ColorValue } from "react-native";
import { StyleSheet, View } from "react-native";
import { colors } from "@/design-system/colors";
import { elevation, radius, spacing } from "@/design-system/layout";

type SystemWrapperProps = {
  children?: ReactNode;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
};

export function SystemWrapper({
  children,
  backgroundColor,
  borderColor,
}: SystemWrapperProps) {
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: backgroundColor ?? colors.light.surface,
          borderColor: borderColor ?? colors.light.border,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    ...elevation.sm,
  },
});
