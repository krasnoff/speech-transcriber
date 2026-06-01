import { useEffect, useRef, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { colors, palette } from "@/design-system/colors";
import { textStyles, typeScale } from "@/design-system/typography";
import { spacing } from "@/design-system/layout";
import { SystemWrapper } from "@/components/SystemWrapper";
import { PushButton } from "@/components/PushButton";
import { requestRequiredPermissions } from "@/lib/permissions";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export default function Index() {
  const transcriptScrollRef = useRef<ScrollView>(null);
  const [isMicPushed, setIsMicPushed] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const [recognizing, setRecognizing] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  const initialText = "זהו טקסט לדוגמה שמדגים את התמלול החי של ההקלטה. הטקסט הזה יכול להיות ארוך יותר ולהמשיך להתעדכן בזמן אמת ככל שההקלטה מתקדמת.\n\nהמערכת מזהה את הדיבור ומציגה אותו על המסך, כך שהמשתמש יכול לראות את התמלול מתרחש בזמן אמת. זה יכול להיות שימושי במיוחד עבור אנשים עם לקויות שמיעה או במצבים שבהם חשוב לעקוב אחרי התוכן המדובר.\n\nהטקסט הזה הוא רק דוגמה, ובמציאות הוא יהיה דינמי ויתעדכן כל הזמן עם ההתקדמות של ההקלטה והתמלול החי.";
  const [transcript, setTranscript] = useState(initialText);

  // For testing purposes, we can simulate recording time increase every second when the mic is pushed.
  const increaseRecordingTime = () => {
    setRecordingTime((prev) => prev + 1);
  };

  const [isPaused, setIsPaused] = useState(false);

  // Format recording time as HH:MM:SS
  const formatRecordingTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  // Scroll transcript to bottom when new text is added
  const scrollTranscriptToBottom = () => {
    transcriptScrollRef.current?.scrollToEnd({ animated: true });
  };

  // Scroll transcript to bottom when new text is added
  useEffect(() => {
    scrollTranscriptToBottom();
  }, [transcript, interimTranscript]);

  // Keep the screen awake while the recorder is active.
  useEffect(() => {
    if (!isMicPushed) {
      deactivateKeepAwake().catch(() => {});
      return;
    }

    activateKeepAwakeAsync().catch(() => {});

    return () => {
      deactivateKeepAwake().catch(() => {});
    };
  }, [isMicPushed]);

  // Start/stop recording session when mic button is toggled
  useEffect(() => {
    if (!isMicPushed) {
      return;
    }

    setTranscript("");

    const startRecordingSession = async () => {
      const hasPermissions = await requestRequiredPermissions();

      if (!hasPermissions) {
        setIsMicPushed(false);
        Alert.alert(
          "Missing permissions",
          "Please enable microphone and storage permissions to start recording."
        );
        return;
      }

      setTranscript("");
      setInterimTranscript("");

      startListening();
    };

    startRecordingSession();

    return () => {
      stopListening();
      setIsPaused(false);
    };
  }, [isMicPushed]);

  // Increase recording time every second when recording
  useEffect(() => {
    if (!isMicPushed || isPaused) {
      return;
    }

    const intervalId = setInterval(increaseRecordingTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMicPushed, isPaused]);

  // Handle speech recognition events
  useSpeechRecognitionEvent("start", () => {
    setRecognizing(true);
  });

  // When recognition ends, we want to reset recognizing state and clear interim transcript
  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
    setInterimTranscript("");

    reStartListening();
  });

  // As results come in, we want to update the interim transcript and append to the final transcript when results are finalized
  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results
      .map((result) => result.transcript)
      .join("");

    if (event.isFinal) {
      // console.log("Final transcript:", text);
      setTranscript((prev) => prev + "\n" + text);
      setInterimTranscript("");
    } else {
      //console.log("Interim transcript:", text);
      setInterimTranscript(text);
    }
  });

  // Handle errors by showing an alert and resetting recognizing state
  useSpeechRecognitionEvent("error", (event) => {
    // console.log("Speech recognition error:", event);
    setRecognizing(false);
    Alert.alert("Speech recognition error", event.message);

    reStartListening();
  });

  const reStartListening = () => {
    if (isMicPushed && !isPaused) {
      setTimeout(() => {
        startListening();
      }, 300);
    }
  }

  // Start listening with specified options
  const startListening = async () => {
    ExpoSpeechRecognitionModule.start({
      lang: "he-IL", // Hebrew
      interimResults: true,
      continuous: true,
      maxAlternatives: 1,
    });
  };

  // Stop listening
  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  // Clear transcript and reset state
  const clearText = () => {
    setTranscript(initialText);
    setInterimTranscript("");
    setRecordingTime(0);
    setIsMicPushed(false);
  };

  // Handle saving and sharing the transcript
  const handleSaveShare = async () => {
    if (isMicPushed) {
      Alert.alert("Cannot save while recording", "Stop recording before sharing the transcript.");
      return;
    }

    try {
      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        Alert.alert("Sharing unavailable", "Sharing is not available on this device.");
        return;
      }

      const fileUri = `${FileSystem.cacheDirectory}transcript-${Date.now()}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, transcript, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: "Share transcript",
        UTI: "public.plain-text",
      });

      clearText();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown sharing error";
      Alert.alert("Share failed", message);
    }
  };

  // Toggle pause/resume recording
  const togglePause = () => {
    if (isPaused) {
      startListening();
    } else {
      stopListening();
    }
    setIsPaused((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      {isMicPushed ? <Text style={styles.title}>מקליט</Text> : <Text style={styles.title}>בהמתנה</Text>}
      
      <View style={styles.RecordingWaveWrapperContainer}>
        <SystemWrapper>
          <View style={styles.clockRow}>
            <Text style={styles.clockText}>{formatRecordingTime(recordingTime)}</Text>
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
          <ScrollView
            ref={transcriptScrollRef}
            style={styles.liveTranscriptionText}
            onContentSizeChange={scrollTranscriptToBottom}
          >
            <Text style={textStyles.bodyLg}>
              {transcript}
            </Text>
            
            {interimTranscript ? 
            <Text style={[textStyles.bodyLg, {fontStyle: "italic", color: palette.primary[500]}]}>
              {interimTranscript}
            </Text>
            :
            null}
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
            <PushButton icon="save" pressed={false} onpress={handleSaveShare} radius={spacing.xxxl} />
            <Text style={styles.micButtonLabel}>שמירה</Text>
          </View>
          <View style={styles.micButtonItem}>
            <PushButton icon="pause" pressed={isPaused} onpress={togglePause} radius={spacing.xxxl} />
            <Text style={styles.micButtonLabel}>השהייה</Text>
          </View>
          <View style={styles.micButtonItem}>
            <PushButton icon="close" pressed={false} onpress={() => clearText()} radius={spacing.xxxl} />
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
