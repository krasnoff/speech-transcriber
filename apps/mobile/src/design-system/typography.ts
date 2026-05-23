import { Platform, TextStyle } from "react-native";

const families = Platform.select({
  ios: {
    sansRegular: "Heebo_400Regular",
    sansMedium: "Heebo_500Medium",
    sansSemibold: "Heebo_600SemiBold",
    sansBold: "Heebo_700Bold",
    mono: "Menlo",
  },
  android: {
    sansRegular: "Heebo_400Regular",
    sansMedium: "Heebo_500Medium",
    sansSemibold: "Heebo_600SemiBold",
    sansBold: "Heebo_700Bold",
    mono: "monospace",
  },
  default: {
    sansRegular: "Heebo_400Regular",
    sansMedium: "Heebo_500Medium",
    sansSemibold: "Heebo_600SemiBold",
    sansBold: "Heebo_700Bold",
    mono: "monospace",
  },
});

export const fontFamily = {
  sansRegular: families?.sansRegular ?? "Heebo_400Regular",
  sansMedium: families?.sansMedium ?? "Heebo_500Medium",
  sansSemibold: families?.sansSemibold ?? "Heebo_600SemiBold",
  sansBold: families?.sansBold ?? "Heebo_700Bold",
  mono: families?.mono ?? "monospace",
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const typeScale = {
  displayLg: 34,
  displayMd: 28,
  titleLg: 24,
  titleMd: 20,
  titleSm: 18,
  bodyLg: 17,
  bodyMd: 15,
  bodySm: 13,
  caption: 12,
} as const;

export const lineHeight = {
  displayLg: 42,
  displayMd: 36,
  titleLg: 32,
  titleMd: 28,
  titleSm: 24,
  bodyLg: 25,
  bodyMd: 22,
  bodySm: 18,
  caption: 16,
} as const;

export const letterSpacing = {
  tighter: -0.35,
  tight: -0.2,
  normal: 0,
  wide: 0.2,
} as const;

export const textStyles: Record<string, TextStyle> = {
  displayLg: {
    fontFamily: fontFamily.sansBold,
    fontSize: typeScale.displayLg,
    lineHeight: lineHeight.displayLg,
    letterSpacing: letterSpacing.tighter,
  },
  displayMd: {
    fontFamily: fontFamily.sansBold,
    fontSize: typeScale.displayMd,
    lineHeight: lineHeight.displayMd,
    letterSpacing: letterSpacing.tight,
  },
  titleLg: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: typeScale.titleLg,
    lineHeight: lineHeight.titleLg,
    letterSpacing: letterSpacing.tight,
  },
  titleMd: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: typeScale.titleMd,
    lineHeight: lineHeight.titleMd,
    letterSpacing: letterSpacing.normal,
  },
  titleSm: {
    fontFamily: fontFamily.sansMedium,
    fontSize: typeScale.titleSm,
    lineHeight: lineHeight.titleSm,
    letterSpacing: letterSpacing.normal,
  },
  bodyLg: {
    fontFamily: fontFamily.sansRegular,
    fontSize: typeScale.bodyLg,
    lineHeight: lineHeight.bodyLg,
    letterSpacing: letterSpacing.normal,
  },
  bodyMd: {
    fontFamily: fontFamily.sansRegular,
    fontSize: typeScale.bodyMd,
    lineHeight: lineHeight.bodyMd,
    letterSpacing: letterSpacing.normal,
  },
  bodySm: {
    fontFamily: fontFamily.sansRegular,
    fontSize: typeScale.bodySm,
    lineHeight: lineHeight.bodySm,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontFamily: fontFamily.sansMedium,
    fontSize: typeScale.caption,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.wide,
  },
  timestampMono: {
    fontFamily: fontFamily.mono,
    fontSize: typeScale.caption,
    lineHeight: lineHeight.caption,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
};

export type TextStyleToken = keyof typeof textStyles;