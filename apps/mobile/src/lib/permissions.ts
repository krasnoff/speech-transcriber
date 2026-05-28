import { PermissionsAndroid, Platform } from "react-native";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";

const READ_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
const WRITE_PERMISSION = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

const isLegacyStoragePermissionRequired =
  Platform.OS === "android" && Number(Platform.Version) <= 32;

export async function hasRequiredPermissions(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return true;
  }

  const microphonePermission =
    await ExpoSpeechRecognitionModule.getPermissionsAsync();

  if (!isLegacyStoragePermissionRequired) {
    return microphonePermission.granted;
  }

  const [hasReadPermission, hasWritePermission] = await Promise.all([
    PermissionsAndroid.check(READ_PERMISSION),
    PermissionsAndroid.check(WRITE_PERMISSION),
  ]);

  return (
    microphonePermission.granted && hasReadPermission && hasWritePermission
  );
}

export async function requestRequiredPermissions(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return true;
  }

  const microphonePermission =
    await ExpoSpeechRecognitionModule.requestPermissionsAsync();

  if (!isLegacyStoragePermissionRequired) {
    return microphonePermission.granted;
  }

  const [readResult, writeResult] = await Promise.all([
    PermissionsAndroid.request(READ_PERMISSION),
    PermissionsAndroid.request(WRITE_PERMISSION),
  ]);

  const readGranted = readResult === PermissionsAndroid.RESULTS.GRANTED;
  const writeGranted = writeResult === PermissionsAndroid.RESULTS.GRANTED;

  return microphonePermission.granted && readGranted && writeGranted;
}
