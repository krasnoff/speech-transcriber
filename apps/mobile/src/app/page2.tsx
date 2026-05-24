import { Text, View, StyleSheet } from "react-native";
import { textStyles } from "@/design-system/typography";

export default function Page2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page 2</Text>
      <Text style={styles.subtitle}>This is the second drawer page.</Text>
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
