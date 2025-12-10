import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../components/PlaceholderScreen";
import { colors, spacing, typography } from "../../constants/theme";

export default function HomeScreen() {
  return (
    <PlaceholderScreen
      title="Welcome back"
      description="Monitor your storage usage, recent activity, and quick actions from here."
      iconName="dashboard"
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Storage usage</Text>
        <Text style={styles.storageHighlight}>2.5 GB of 15 GB used</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.cardHint}>
          Upgrade for more storage and advanced security controls.
        </Text>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  storageHighlight: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: `${colors.primary}22`,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "18%",
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  cardHint: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
