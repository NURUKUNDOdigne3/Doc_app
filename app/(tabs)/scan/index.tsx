import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { colors, spacing, typography } from "../../constants/theme";

export default function ScanScreen() {
  const { t } = useTranslation("scan");
  const navigation = useNavigation();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashMode, setFlashMode] = useState<string>("off");
  const flashModes: string[] = ["off", "on", "auto"];
  const flashModeIndex = flashModes.indexOf(flashMode);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: capturedImage ? "flex" : "none" },
    });
  }, [capturedImage, navigation]);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      // @ts-ignore
      setCapturedImage(photo.uri);
    } catch (error) {
      Alert.alert(t("alerts.errorTitle"), t("alerts.captureFailure"));
      console.error(error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleConfirm = () => {
    // Process the captured image
    setCapturedImage(null);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // @ts-ignore
        mediaTypes: ImagePicker.MediaTypeOptions.images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(t("alerts.errorTitle"), t("alerts.galleryFailure"));
      console.error(error);
    }
  };

  const handleFlashToggle = () => {
    const nextIndex = (flashModeIndex + 1) % flashModes.length;
    setFlashMode(flashModes[nextIndex]);
  };

  const getFlashLabel = () => {
    if (flashMode === "off") return t("flash.off");
    if (flashMode === "on") return t("flash.on");
    return t("flash.auto");
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>{t("permission.message")}</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>
              {t("permission.button")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Preview mode - show captured image
  if (capturedImage) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={styles.capturedImage}
            resizeMode="contain"
          />
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.previewButton, styles.retakeButton]}
              onPress={handleRetake}
            >
              <Text style={[styles.previewButtonText, styles.retakeButtonText]}>
                {t("preview.retake")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.previewButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text
                style={[styles.previewButtonText, styles.confirmButtonText]}
              >
                {t("preview.confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Camera mode - fullscreen camera
  return (
    <View style={styles.cameraContainer}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        autofocus="on"
        flash={flashMode as any}
      >
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <MaterialIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Corner guides */}
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />

        {/* Grid overlay */}
        <View style={styles.gridOverlay}>
          <View style={styles.gridRow}>
            <View style={styles.gridCell} />
            <View style={styles.gridCell} />
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCell} />
            <View style={styles.gridCell} />
          </View>
        </View>

        {/* Controls overlay */}
        <View style={styles.controlsOverlay}>
          <View style={styles.controlsCard}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleCopy}>
                <Text style={styles.toggleLabel}>
                  {t("controls.edgeDetection.label")}
                </Text>
                <Text style={styles.toggleHint}>
                  {t("controls.edgeDetection.description")}
                </Text>
              </View>
              <Switch
                value={autoDetect}
                onValueChange={setAutoDetect}
                trackColor={{ false: "#d7dae3", true: colors.primary }}
                thumbColor={colors.surface}
              />
            </View>
            <View style={styles.toggleRow}>
              <View style={styles.toggleCopy}>
                <Text style={styles.toggleLabel}>
                  {t("controls.autoEnhance.label")}
                </Text>
                <Text style={styles.toggleHint}>
                  {t("controls.autoEnhance.description")}
                </Text>
              </View>
              <Switch
                value={autoEnhance}
                onValueChange={setAutoEnhance}
                trackColor={{ false: "#d7dae3", true: colors.primary }}
                thumbColor={colors.surface}
              />
            </View>
          </View>

          {/* Action bar */}
          <View style={styles.actionsBar}>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.85}
              onPress={handleGallery}
            >
              <Text style={styles.actionLabel}>{t("actions.gallery")}</Text>
            </TouchableOpacity>
            <View style={styles.captureWrapper}>
              <TouchableOpacity
                style={styles.captureButton}
                activeOpacity={0.9}
                onPress={handleCapture}
                disabled={isCapturing}
              >
                <View style={styles.captureInner} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.85}
              onPress={handleFlashToggle}
            >
              <Text style={styles.actionLabel}>{getFlashLabel()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  permissionText: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  permissionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  permissionButtonText: {
    fontSize: typography.body,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    left: spacing.xl,
    width: 38,
    height: 38,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  capturedImage: {
    flex: 1,
    borderRadius: 16,
  },
  previewActions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  previewButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButton: {
    backgroundColor: "#f0f1f7",
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  previewButtonText: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  retakeButtonText: {
    color: colors.text,
  },
  confirmButtonText: {
    color: "#fff",
  },
  controlsOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  gridOverlay: {
    position: "absolute",
    top: "54%",
    left: "50%",
    width: "80%",
    aspectRatio: 3 / 4,
    marginLeft: "-40%",
    marginTop: "-40%",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
  },
  gridCell: {
    flex: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cornerTopLeft: {
    position: "absolute",
    top: 38,
    left: 18,
    width: 36,
    height: 36,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: colors.primary,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    position: "absolute",
    top: 38,
    right: 18,
    width: 36,
    height: 36,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: colors.primary,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 18,
    left: 18,
    width: 36,
    height: 36,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.primary,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 18,
    right: 18,
    width: 36,
    height: 36,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.primary,
    borderBottomRightRadius: 12,
  },
  controlsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  toggleCopy: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  toggleHint: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  actionsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: "#f0f1f7",
  },
  actionLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  captureWrapper: {
    padding: 4,
    borderRadius: 999,
    backgroundColor: "rgba(101, 31, 255, 0.15)",
  },
  captureButton: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
  },
});
