import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../constants/theme";

type StorageBreakdown = {
  id: string;
  label: string;
  amountGb: number;
};

type HomeStorageCardProps = {
  totalGb: number;
  usedGb: number;
  breakdown: StorageBreakdown[];
  title?: string;
  usageLabel?: string;
  upgradeLabel?: string;
  onUpgradePress?: () => void;
};

export function HomeStorageCard({
  totalGb,
  usedGb,
  breakdown,
  title = "Storage",
  usageLabel,
  upgradeLabel = "↑ Upgrade Storage",
  onUpgradePress,
}: HomeStorageCardProps) {
  const usageRatio = usedGb / totalGb;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardMetric}>
          {usageLabel ?? `${usedGb.toFixed(1)} GB of ${totalGb} GB`}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(usageRatio, 1) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.breakdownList}>
        {breakdown.map((item) => (
          <View key={item.id} style={styles.breakdownCard}>
            <Text style={styles.breakdownLabel}>{item.label}</Text>
            <Text style={styles.breakdownValue}>
              {item.amountGb.toFixed(1)} GB
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.upgradeButton} onPress={onUpgradePress}>
        {upgradeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.lg,
    shadowColor: "rgba(15, 22, 36, 0.12)",
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  cardMetric: {
    fontSize: typography.body,
    color: colors.textMuted,
    fontWeight: "600",
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E6EBF4",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  breakdownList: {
    gap: spacing.sm,
  },
  breakdownCard: {
    backgroundColor: "#F6F8FB",
    borderRadius: 20,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  breakdownLabel: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  upgradeButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    color: "#fff",
    textAlign: "center",
    paddingVertical: spacing.md,
    borderRadius: 18,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
