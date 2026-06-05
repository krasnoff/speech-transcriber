import type { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "@/design-system/colors";
import { spacing } from "@/design-system/layout";

type PrimaryPressableProps = {
  children: ReactNode;
};

export function PrimaryPressable({ children }: PrimaryPressableProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      accessibilityRole="button"
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.96,
  },
});