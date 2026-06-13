import { colors, palette } from "@/design-system/colors";
import { commonStyles } from "@/design-system/common-styles";
import { spacing } from "@/design-system/layout";
import { textStyles } from "@/design-system/typography";
import { PrimaryPressable } from "@/components/PrimaryPressable";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FadeModal from "@/components/fade-modal";
import { useEffect } from "react";
import useGetData from "@/hooks/useGetData";
import { Methods } from "@/enums/methods.enums";

export default function TranscriptionTextPage() {
    const router = useRouter();
    const { data, error, loading, fetchData, cancelRequest, setLoading } = useGetData('transcribe', Methods.POST);

    const params = useLocalSearchParams<{ transcript?: string | string[] }>();
    const transcript = Array.isArray(params.transcript)
        ? params.transcript[0] ?? ""
        : params.transcript ?? "";
    const transcriptArr = transcript
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    
    useEffect(() => {
        if (data && typeof data === 'object' && 'overallSummary' in data && 'mainInsights' in data && 'toDoList' in data) {
            // console.log('API response:', data);
            router.push({
                pathname: "/transcription-summary" as never,
                params: { data: JSON.stringify(data) },
            });
        } else if (error) {
            console.error('API error:', error);
        }

        setLoading(false);
    }, [data, error]);

    const handleSubmit = () => {
        setLoading(true);

        const body = {
            transcript: transcript
        };

        fetchData(body);
    }

    const handleCloseModal = () => {
        // Cancel any ongoing API request
        cancelRequest();
        setLoading(false);
    }

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.liveTranscriptionRow}>
                <MaterialIcons
                    name={"notes" as React.ComponentProps<typeof MaterialIcons>["name"]}
                    size={20}
                    color={palette.primary[700]}
                />
                <Text style={commonStyles.title}>תוכן התמלול</Text>
            </View>

            <ScrollView
                style={styles.transcriptionScroll}
                contentContainerStyle={styles.transcriptionListContent}
            >
                {transcriptArr.map((item, index) => (
                    <Text key={`${index}-${item.slice(0, 16)}`} style={styles.transcriptionText}>
                        {item}
                    </Text>
                ))}
            </ScrollView>

            <View style={styles.bottomActionContainer}>
                <PrimaryPressable
                    onPress={() => {
                        /*router.push({
                            pathname: "/transcription-summary" as never,
                            params: { transcript },
                        });*/handleSubmit();
                    }}
                >
                    <MaterialIcons
                        name={"auto-awesome" as React.ComponentProps<typeof MaterialIcons>["name"]}
                        size={19}
                        color={palette.white}
                    />
                    <Text style={styles.bottomActionText}>סכם באמצעות בינה מלאכותית</Text>
                </PrimaryPressable>
            </View>
            <FadeModal visible={loading} onClose={handleCloseModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    transcriptionListContent: {
        paddingBottom: spacing.xxxl + spacing.xl,
    },
    transcriptionScroll: {
        flex: 1,
        width: "100%",
    },
    transcriptionText: {
        ...textStyles.bodyMd,
        color: colors.light.textPrimary,
        paddingBottom: spacing.sm,
    },
    bottomActionContainer: {
        position: "absolute",
        left: spacing.xl,
        right: spacing.xl,
        bottom: spacing.lg,
        marginBottom: spacing.lg,
    },
    bottomActionText: {
        ...textStyles.bodyMd,
        color: colors.light.textOnBrand,
        fontWeight: "600",
    },
});
