import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "./components/PlaceholderScreen";
import { PrimaryButton } from "./components/PrimaryButton";
import { colors, spacing, typography } from "./constants/theme";

export default function SecurityScreen() {
  return (
    <PlaceholderScreen
      title="Security overview"
      description="Review device sign-ins, sessions, and harden your account."
      iconName="shield"
      footer={<PrimaryButton label="Go to settings" variant="secondary" />}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusRow}>
          <MaterialIcons name="phishing" size={20} color={colors.success} />
          <Text style={styles.statusText}>No suspicious activity detected</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended actions</Text>
        <View style={styles.taskCard}>
          <MaterialIcons name="lock" size={20} color={colors.primary} />
          <Text style={styles.taskText}>Enable two-factor authentication</Text>
        </View>
        <View style={styles.taskCard}>
          <MaterialIcons name="privacy-tip" size={20} color={colors.primary} />
          <Text style={styles.taskText}>Review third-party integrations</Text>
        </View>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  statusText: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginTop: spacing.sm,
  },
  taskText: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
  },
});
