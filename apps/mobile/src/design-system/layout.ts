export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const borderWidth = {
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

export const size = {
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  controlHeightSm: 36,
  controlHeightMd: 44,
  controlHeightLg: 52,
  touchTargetMin: 44,
  maxContentWidth: 760,
} as const;

export const elevation = {
  none: {
    shadowColor: "#000000",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  sm: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  md: {
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lg: {
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;

export const layout = {
  screenPaddingHorizontal: spacing.lg,
  screenPaddingVertical: spacing.xl,
  sectionGap: spacing.xl,
  cardPadding: spacing.lg,
  listItemPadding: spacing.md,
  composerPadding: spacing.md,
  transcriptRowGap: spacing.sm,
} as const;

export const zIndex = {
  base: 0,
  sticky: 10,
  overlay: 20,
  modal: 30,
  toast: 40,
} as const;