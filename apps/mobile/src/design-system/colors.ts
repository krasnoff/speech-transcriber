export type ThemeMode = "light" | "dark";

type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000?: string;
};

const primary: ColorScale = {
  50: "#FFEDE5",
  100: "#FFDBC9",
  200: "#FFB68C",
  300: "#FF8D41",
  400: "#E86D00",
  500: "#FF7900",
  600: "#C05900",
  700: "#9A4600",
  800: "#753400",
  900: "#522300",
};

const secondary: ColorScale = {
  50: "#F3F0F0",
  100: "#F5F3F3",
  200: "#E4E2E1",
  300: "#ACABAA",
  400: "#929090",
  500: "#787777",
  600: "#5F5E5E",
  700: "#474747",
  800: "#303030",
  900: "#1B1C1C",
  1000: "#F0E6E1"
};

const tertiary: ColorScale = {
  50: "#E7F2FF",
  100: "#CCE5FF",
  200: "#93CCFF",
  300: "#46B3FF",
  400: "#0098E5",
  500: "#00A8FC",
  600: "#007DBD",
  700: "#006398",
  800: "#004B73",
  900: "#003351",
};

const neutral: ColorScale = {
  50: "#F2F0F0",
  100: "#E4E2E2",
  200: "#C8C6C6",
  300: "#ACABAB",
  400: "#919090",
  500: "#777777",
  600: "#5E5E5E",
  700: "#4A4A4A",
  800: "#303030",
  900: "#1B1C1C",
};

export const palette = {
  primary,
  secondary,
  tertiary,
  neutral,
  white: "#FFFFFF",
  black: "#000000",
  success: "#2c9f6a",
  warning: "#c8842c",
  error: "#c74654",
} as const;

export const colors = {
  light: {
    background: neutral[50],
    surface: palette.white,
    surfaceMuted: neutral[100],
    surfaceElevated: palette.white,
    textPrimary: neutral[900],
    textSecondary: neutral[700],
    textMuted: neutral[600],
    textOnBrand: palette.white,
    border: neutral[200],
    divider: neutral[300],
    shadow: "rgba(27, 28, 28, 0.14)",
    brandPrimary: primary[500],
    brandPrimaryStrong: primary[600],
    accent: tertiary[500],
    accentSoft: tertiary[100],
    empathy: primary[300],
    empathySoft: primary[100],
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    focusRing: tertiary[400],
    transcriptionWave: tertiary[300],
    recordingLive: primary[500],
    confidenceHigh: palette.success,
    confidenceMid: palette.warning,
    confidenceLow: palette.error,
  },
  dark: {
    background: "#000000",
    surface: secondary[900],
    surfaceMuted: secondary[800],
    surfaceElevated: secondary[700],
    textPrimary: palette.white,
    textSecondary: neutral[200],
    textMuted: neutral[300],
    textOnBrand: palette.white,
    border: secondary[700],
    divider: secondary[600],
    shadow: "rgba(0, 0, 0, 0.44)",
    brandPrimary: primary[300],
    brandPrimaryStrong: primary[400],
    accent: tertiary[300],
    accentSoft: tertiary[800],
    empathy: primary[200],
    empathySoft: primary[800],
    success: "#62c58f",
    warning: "#dca55a",
    error: "#ec7280",
    focusRing: tertiary[200],
    transcriptionWave: tertiary[200],
    recordingLive: primary[300],
    confidenceHigh: "#62c58f",
    confidenceMid: "#dca55a",
    confidenceLow: "#ec7280",
  },
} as const;

export type ColorToken = keyof typeof colors.light;
export type ThemeColors = (typeof colors)[ThemeMode];

export function getColors(mode: ThemeMode): ThemeColors {
  return colors[mode];
}