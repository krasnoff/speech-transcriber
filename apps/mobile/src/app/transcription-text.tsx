import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function TranscriptionTextPage() {
  const params = useLocalSearchParams<{ transcript?: string | string[] }>();
  const transcript = Array.isArray(params.transcript)
    ? params.transcript[0] ?? ""
    : params.transcript ?? "";

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text>{transcript}</Text>
      </ScrollView>
    </View>
  );
}
