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
};

const trustBlue: ColorScale = {
  50: "#eef5ff",
  100: "#d9e8ff",
  200: "#b8d3ff",
  300: "#8bb6ff",
  400: "#5c94ff",
  500: "#3775f5",
  600: "#285bd3",
  700: "#2247a8",
  800: "#213d85",
  900: "#22386f",
};

const focusTeal: ColorScale = {
  50: "#e9fbfb",
  100: "#cbf3f4",
  200: "#9de7ea",
  300: "#69d5de",
  400: "#3ab7c8",
  500: "#1f93a8",
  600: "#197588",
  700: "#175f6f",
  800: "#174e5b",
  900: "#18434d",
};

const empathyCoral: ColorScale = {
  50: "#fff2f0",
  100: "#ffe1dc",
  200: "#ffc4ba",
  300: "#ff9c8a",
  400: "#f77158",
  500: "#ea4c2f",
  600: "#cd371e",
  700: "#aa2d19",
  800: "#8d2b1d",
  900: "#77291d",
};

const neutralSlate: ColorScale = {
  50: "#f7f9fb",
  100: "#eef2f7",
  200: "#dbe3ee",
  300: "#c1cfdf",
  400: "#9faec1",
  500: "#7f8ca2",
  600: "#647287",
  700: "#4f5b6f",
  800: "#3a4558",
  900: "#253142",
};

export const palette = {
  trustBlue,
  focusTeal,
  empathyCoral,
  neutralSlate,
  white: "#ffffff",
  black: "#0f1720",
  success: "#2fa36b",
  warning: "#d3841f",
  error: "#c83f4a",
} as const;

export const colors = {
  light: {
    background: "#f7f9fb",
    surface: "#ffffff",
    surfaceMuted: "#eef2f7",
    surfaceElevated: "#ffffff",
    textPrimary: "#253142",
    textSecondary: "#4f5b6f",
    textMuted: "#647287",
    textOnBrand: "#ffffff",
    border: "#dbe3ee",
    divider: "#c1cfdf",
    shadow: "rgba(37, 49, 66, 0.14)",
    brandPrimary: "#3775f5",
    brandPrimaryStrong: "#285bd3",
    accent: "#1f93a8",
    accentSoft: "#cbf3f4",
    empathy: "#ea4c2f",
    empathySoft: "#ffe1dc",
    success: "#2fa36b",
    warning: "#d3841f",
    error: "#c83f4a",
    focusRing: "#5c94ff",
    transcriptionWave: "#69d5de",
    recordingLive: "#ea4c2f",
    confidenceHigh: "#2fa36b",
    confidenceMid: "#d3841f",
    confidenceLow: "#c83f4a",
  },
  dark: {
    background: "#101a26",
    surface: "#152233",
    surfaceMuted: "#1b2a3f",
    surfaceElevated: "#1f3047",
    textPrimary: "#f7f9fb",
    textSecondary: "#dbe3ee",
    textMuted: "#c1cfdf",
    textOnBrand: "#ffffff",
    border: "#2d415d",
    divider: "#3a516f",
    shadow: "rgba(7, 10, 15, 0.42)",
    brandPrimary: "#8bb6ff",
    brandPrimaryStrong: "#5c94ff",
    accent: "#69d5de",
    accentSoft: "#174e5b",
    empathy: "#ff9c8a",
    empathySoft: "#8d2b1d",
    success: "#66c68f",
    warning: "#e0a74e",
    error: "#ef6a74",
    focusRing: "#b8d3ff",
    transcriptionWave: "#9de7ea",
    recordingLive: "#ff9c8a",
    confidenceHigh: "#66c68f",
    confidenceMid: "#e0a74e",
    confidenceLow: "#ef6a74",
  },
} as const;

export type ColorToken = keyof typeof colors.light;
export type ThemeColors = (typeof colors)[ThemeMode];

export function getColors(mode: ThemeMode): ThemeColors {
  return colors[mode];
}