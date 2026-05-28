import { useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, palette } from "@/design-system/colors";
import { textStyles, typeScale } from "@/design-system/typography";
import { spacing } from "@/design-system/layout";
import { SystemWrapper } from "@/components/SystemWrapper";
import { PushButton } from "@/components/PushButton";

export default function Index() {
  const [isMicPushed, setIsMicPushed] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  return (
    <View style={styles.container}>
      {isMicPushed ? <Text style={styles.title}>מקליט</Text> : <Text style={styles.title}>בהמתנה</Text>}
      
      <View style={styles.RecordingWaveWrapperContainer}>
        <SystemWrapper>
          <View style={styles.clockRow}>
            <Text style={styles.clockText}>00:37:11</Text>
          </View>

          <View style={styles.waveContainer}>
            {isMicPushed ? 
              <Image
                source={require("../../assets/app-icon/wave.gif")}
                style={styles.wave}
                resizeMode="contain"
              /> : 
              <Image
                source={require("../../assets/app-icon/wave_frame_1.gif")}
                style={styles.wave}
                resizeMode="contain"
              /> }
          </View>
        </SystemWrapper>
      </View>
      <View style={styles.RecordingWaveWrapperContainer}>
        <SystemWrapper backgroundColor={palette.secondary[100]} borderColor={palette.secondary[1000]}>
          <View style={styles.liveTranscriptionRow}>
            <MaterialIcons
              name="graphic-eq"
              size={20}
              color={palette.primary[700]}
            />
            <Text style={styles.title2}>תמלול חי</Text>
          </View>
          <ScrollView style={styles.liveTranscriptionText}>
            <Text style={textStyles.bodyLg}>
              זהו טקסט לדוגמה שמדגים את התמלול החי של ההקלטה. הטקסט הזה יכול להיות ארוך יותר ולהמשיך להתעדכן בזמן אמת ככל שההקלטה מתקדמת.
              \n\nהמערכת מזהה את הדיבור ומציגה אותו על המסך, כך שהמשתמש יכול לראות את התמלול מתרחש בזמן אמת. זה יכול להיות שימושי במיוחד עבור אנשים עם לקויות שמיעה או במצבים שבהם חשוב לעקוב אחרי התוכן המדובר.
              \n\n
              הטקסט הזה הוא רק דוגמה, ובמציאות הוא יהיה דינמי ויתעדכן כל הזמן עם ההתקדמות של ההקלטה והתמלול החי.
            </Text>
          </ScrollView>
        </SystemWrapper>
        <View style={styles.micButtonContainer}>
          <PushButton
            icon="mic"
            pressed={isMicPushed}
            onpress={() => setIsMicPushed((prev) => !prev)}
          />
        </View>
        <View style={styles.micButtonRow}>
          <View style={styles.micButtonItem}>
            <PushButton icon="save" pressed={false} onpress={() => {}} radius={spacing.xxxl} />
            <Text style={styles.micButtonLabel}>שמירה</Text>
          </View>
          <View style={styles.micButtonItem}>
            <PushButton icon="pause" pressed={false} onpress={() => {}} radius={spacing.xxxl} />
            <Text style={styles.micButtonLabel}>השהייה</Text>
          </View>
          <View style={styles.micButtonItem}>
            <PushButton icon="close" pressed={false} onpress={() => {}} radius={spacing.xxxl} />
            <Text style={styles.micButtonLabel}>ביטול</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    direction: "rtl",
    paddingTop: spacing.lg,
  },
  title: {
    ...textStyles.titleMd,
    color: colors.light.textPrimary,
  },
  title2: {
    ...textStyles.titleMd,
    color: colors.light.textPrimary,
    fontSize: typeScale.titleSm,
  },
  liveTranscriptionRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.xs,
  },
  liveTranscriptionText: {
    maxHeight: 150,
    width: "100%",
  },
  micButtonContainer: {
    marginTop: spacing.xl,
    alignSelf: "center",
  },
  micButtonRow: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xxl,
  },
  micButtonItem: {
    flex: 1,
    alignItems: "center",
  },
  micButtonLabel: {
    marginTop: spacing.xs,
    ...textStyles.bodySm,
    color: colors.light.textPrimary,
  },
  RecordingWaveWrapperContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.sm,
  },
  clockRow: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  clockIcon: {
    ...textStyles.bodySm,
    color: colors.light.textSecondary
  },
  clockText: {
    ...textStyles.timestampMono,
    color: colors.light.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.6,
  },
  waveContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 88,
  },
  wave: {
    width: "100%",
    maxWidth: 380,
    height: 110,
  },
});
