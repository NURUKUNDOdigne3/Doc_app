import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { spacing } from "../constants/theme";

type StorageUsageCardProps = {
  totalGb: number;
  usedGb: number;
  filesCount?: number;
  statusLabel?: string;
  userName?: string;
  currentTime?: Date;
  footerIcon?: ReactNode;
};

const getGreeting = (date: Date) => {
  const hour = date.getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export function StorageUsageCard({
  totalGb,
  usedGb,
  filesCount,
  statusLabel = "Sync active",
  userName,
  currentTime,
  footerIcon,
}: StorageUsageCardProps) {
  const usageRatio = totalGb > 0 ? Math.min(usedGb / totalGb, 1) : 0;
  const usedText = `${usedGb} GB of ${totalGb} GB used`;
  const greeting = getGreeting(currentTime ?? new Date());
  const displayName = userName ? `, ${userName}` : "";

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.greeting}>
          {greeting}
          {displayName}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {filesCount !== undefined ? (
          <Text style={styles.subtitle}>
            {filesCount.toLocaleString()} files
          </Text>
        ) : null}

        <View style={styles.statusRow}>
          {footerIcon ?? (
            <MaterialIcons name="sync" size={18} color="#ffffff" />
          )}
          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      </View>

      <Text style={styles.usageLabel}>{usedText}</Text>

      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${usageRatio * 100}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: "#5f46ff",
    shadowColor: "#4529a4",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  headerBlock: {
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  tagline: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: spacing.sm,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: 14,
    color: "#ffffff",
    marginLeft: spacing.xs,
  },
  usageLabel: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: spacing.md,
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#f9a8ff",
    height: "100%",
  },
});
