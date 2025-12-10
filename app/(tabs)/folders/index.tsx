import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../components/PlaceholderScreen";
import { colors, spacing, typography } from "../../constants/theme";

export default function FoldersScreen() {
  return (
    <PlaceholderScreen
      title="Folders"
      description="Create shared spaces to collaborate on documents with your team."
      iconName="folder-open"
    >
      <View style={styles.folderCard}>
        <MaterialIcons
          name="create-new-folder"
          size={40}
          color={colors.primary}
        />
        <Text style={styles.folderTitle}>Create your first folder</Text>
        <Text style={styles.folderHint}>
          Organize files by project, team, or client and control access levels
          down to each folder.
        </Text>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  folderCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  folderTitle: {
    marginTop: spacing.md,
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
  },
  folderHint: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
});
