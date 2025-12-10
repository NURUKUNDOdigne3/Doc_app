import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../components/PlaceholderScreen";
import { colors, spacing, typography } from "../../constants/theme";

export default function SettingsScreen() {
  return (
    <PlaceholderScreen
      title="Settings"
      description="Manage preferences, storage plans, notifications, and integrations."
      iconName="settings"
    >
      <View style={styles.optionRow}>
        <MaterialIcons name="verified-user" size={24} color={colors.primary} />
        <View style={styles.optionTextWrapper}>
          <Text style={styles.optionTitle}>Account & Security</Text>
          <Text style={styles.optionHint}>
            Passwords, multi-factor auth, and recovery
          </Text>
        </View>
      </View>
      <View style={styles.optionRow}>
        <MaterialIcons name="cloud" size={24} color={colors.primary} />
        <View style={styles.optionTextWrapper}>
          <Text style={styles.optionTitle}>Storage Plan</Text>
          <Text style={styles.optionHint}>
            View quota, usage, and upgrade options
          </Text>
        </View>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  optionTextWrapper: {
    marginLeft: spacing.md,
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
  },
  optionHint: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
