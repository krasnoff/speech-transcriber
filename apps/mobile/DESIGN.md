# AI Voice Summarizer Design System

This design system is built on a Human-Centric Intelligence visual language.
The goal is to make AI features feel trustworthy, clear, and emotionally aware.

## 1. Design Principles

1. Trust First
Use stable blue tones for core actions and confidence-building moments.

2. Clarity Over Decoration
Prioritize readable typography, high contrast, and predictable spacing.

3. Emotional Signals with Restraint
Use coral and warm tones to communicate live recording, uncertainty, or urgency.

4. Accessible by Default
Respect minimum touch targets, readable line heights, and sufficient contrast.

## 2. Color System

Token source: src/design-system/colors.ts

Core families:
- trustBlue: primary actions, key links, focused interactions
- focusTeal: transcription activity, supportive accents, progress states
- empathyCoral: live recording indicator, cautionary highlights, human warmth
- neutralSlate: text hierarchy, surfaces, borders

Semantic roles:
- brandPrimary and brandPrimaryStrong for primary CTA states
- surface, surfaceMuted, and surfaceElevated for depth
- textPrimary, textSecondary, textMuted for information hierarchy
- confidenceHigh, confidenceMid, confidenceLow for summary certainty signaling

Mode support:
- light and dark themes are both fully tokenized
- avoid direct hex in components; consume only semantic tokens

## 3. Layout System

Token source: src/design-system/layout.ts

Spacing scale:
- xxs 2, xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, xxxl 48

Rules:
- minimum tap target is 44
- default horizontal screen padding is 16
- standard vertical rhythm uses 24 between sections
- card containers use 16 internal padding

Radius and depth:
- rounded corners emphasize approachable intelligence (6 to 20 radius)
- use elevation tokens instead of ad hoc shadows

## 4. Typography System

Token source: src/design-system/typography.ts

Type roles:
- display and title styles for headers and summary highlights
- body styles for transcript and notes
- caption for metadata and confidence labels
- timestampMono for transcript timestamps and fixed-width time data

Guidance:
- keep transcript body at bodyMd or bodyLg for legibility
- use titleMd for section headers in summarization cards
- reserve display styles for primary hero or key insights only

## 5. Component Usage Guidelines

1. Buttons
- primary: brandPrimary background with textOnBrand
- secondary: surface with border and textPrimary
- destructive: error background with textOnBrand

2. Transcript Row
- timestamp uses timestampMono
- spoken content uses bodyMd
- active playback row may use accentSoft background

3. Summary Card
- card surface uses surface or surfaceElevated
- confidence badge maps to confidenceHigh, confidenceMid, or confidenceLow

4. Recording State
- live pulse or icon uses recordingLive
- avoid overusing red tones outside recording and error contexts

## 6. Implementation Notes

1. Import tokens instead of hardcoding values.
2. Keep one source of truth per category:
- colors.ts for color semantics
- layout.ts for spacing, radius, size, elevation, z-index
- typography.ts for type scale and text styles
3. Build feature components from semantic roles, not palette indexes.
4. Any new token should include both light and dark coverage when relevant.