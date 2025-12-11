import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, spacing, typography } from "../constants/theme";
import type { FileItemType } from "./FileItem";

export type FilePreviewItem = {
  id: string;
  name: string;
  type: FileItemType;
  detail?: string;
  thumbnail?: ImageSourcePropType;
  sharedBy?: string;
  updatedAt?: string;
};

export type FilePreviewModalProps = {
  visible: boolean;
  item?: FilePreviewItem | null;
  onClose: () => void;
  onOpenFolder?: (item: FilePreviewItem) => void;
};

const FILE_ACTIONS = [
  { id: "comment", icon: "chat-bubble-outline", label: "Comment" },
  { id: "download", icon: "file-download", label: "Download" },
  { id: "delete", icon: "delete-outline", label: "Delete" },
  { id: "link", icon: "link", label: "Get link" },
];

export function FilePreviewModal({
  visible,
  item,
  onClose,
  onOpenFolder,
}: FilePreviewModalProps) {
  if (!item) {
    return null;
  }

  const isFile = item.type === "file";

  const renderVisual = () => {
    if (item.thumbnail) {
      return <Image source={item.thumbnail} style={styles.visualImage} />;
    }

    const iconName = item.type === "folder" ? "folder" : "insert-drive-file";
    const backgroundColor = item.type === "folder" ? "transparent" : "#f5f6fa";

    return (
      <View style={[styles.visualFallback, { backgroundColor }]}>
        <MaterialIcons name={iconName} size={184} color={colors.primary} />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.fullscreen}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.topButton}
            accessibilityRole="button"
            accessibilityLabel="Close preview"
            hitSlop={8}
          >
            <MaterialIcons name="close" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Preview</Text>
          <View style={styles.topButtonPlaceholder} />
        </View>

        <View style={styles.body}>
          <View style={styles.visualContainer}>{renderVisual()}</View>
          <View style={styles.descriptionBlock}>
            <Text style={styles.previewTitle}>{item.name}</Text>
            {item.detail ? (
              <Text style={styles.previewDetail}>{item.detail}</Text>
            ) : null}
            {item.sharedBy || item.updatedAt ? (
              <Text style={styles.previewMeta}>
                {[item.sharedBy, item.updatedAt].filter(Boolean).join(" • ")}
              </Text>
            ) : null}
          </View>
        </View>

        {isFile ? (
          <View style={styles.bottomBar}>
            <View style={styles.quickActions}>
              {FILE_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.quickAction}
                  activeOpacity={0.85}
                >
                  <MaterialIcons
                    name={action.icon as never}
                    size={20}
                    color={colors.text}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.shareButton} activeOpacity={0.9}>
              <MaterialIcons name="share" size={20} color="white" />
              <Text style={styles.shareLabel}>Share</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.openButton}
              activeOpacity={0.85}
              onPress={() => {
                onClose();
                onOpenFolder?.(item);
              }}
            >
              <MaterialIcons
                name="folder-open"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.openLabel}>Open folder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.manageButton} activeOpacity={0.85}>
              <MaterialIcons name="people" size={20} color={colors.text} />
              <Text style={styles.manageLabel}>Manage access</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  topRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topTitle: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fa",
  },
  topButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionBlock: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  previewTitle: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
  },
  previewDetail: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  previewMeta: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
  visualContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  visualImage: {
    width: 260,
    height: 200,
    borderRadius: 20,
    resizeMode: "cover",
  },
  visualFallback: {
    width: 200,
    height: 200,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickAction: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  shareLabel: {
    marginLeft: spacing.xs,
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.surface,
  },
  openButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edeaff",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  openLabel: {
    marginLeft: spacing.xs,
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "600",
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: "#f5f6fa",
  },
  manageLabel: {
    marginLeft: spacing.xs,
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
  },
});
