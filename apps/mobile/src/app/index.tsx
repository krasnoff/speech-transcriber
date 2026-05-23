import { Text, View, StyleSheet } from "react-native";
import { textStyles } from "@/design-system/typography";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Voice Summarizer</Text>
      <Text style={styles.subtitle}>
        Edit src/app/index.tsx to start building your app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    ...textStyles.titleLg,
  },
  subtitle: {
    ...textStyles.bodyMd,
    textAlign: "center",
  },
});
