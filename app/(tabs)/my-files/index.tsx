import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../components/PlaceholderScreen";
import { colors, spacing, typography } from "../../constants/theme";

export default function MyFilesScreen() {
  return (
    <PlaceholderScreen
      title="My Files"
      description="Browse and manage your personal documents, photos, and videos."
      iconName="folder"
      footer={
        <View style={styles.footerRow}>
          <MaterialIcons name="cloud-upload" size={18} color={colors.primary} />
          <Text style={styles.footerText}>
            Upload files to keep everything in one place.
          </Text>
        </View>
      }
    >
      <View style={styles.emptyState}>
        <MaterialIcons
          name="insert-drive-file"
          size={48}
          color={colors.primary}
        />
        <Text style={styles.emptyStateLabel}>No files yet</Text>
        <Text style={styles.emptyStateHint}>
          Start uploading files to populate this view.
        </Text>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  emptyStateLabel: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.sm,
  },
  emptyStateHint: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
  },
});
