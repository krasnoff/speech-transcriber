import { Pressable, StyleSheet, type GestureResponderEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { palette } from "@/design-system/colors";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

type PushButtonProps = {
  icon: string;
  pressed: boolean;
  onpress: (event: GestureResponderEvent) => void;
  radius?: number;
};

export function PushButton({ icon, pressed, onpress, radius = 80 }: PushButtonProps) {
  return (
    <Pressable
      onPress={onpress}
      style={({ pressed: isPressing }) => [
        styles.button,
        {
          width: radius,
          height: radius,
          borderRadius: radius / 2,
        },
        pressed ? styles.buttonActive : styles.buttonIdle,
        isPressing && styles.buttonPressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: pressed }}
      accessibilityLabel="כפתור מיקרופון"
    >
      <MaterialIcons
        name={icon as MaterialIconName}
        size={Math.max(24, radius * 0.56)}
        color={pressed ? palette.white : palette.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonIdle: {
    backgroundColor: palette.white,
    borderColor: palette.primary[300],
  },
  buttonActive: {
    backgroundColor: palette.primary[500],
    borderColor: palette.primary[500],
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
  },
});
