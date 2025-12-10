import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "./components/PlaceholderScreen";
import { colors, spacing, typography } from "./constants/theme";

export default function ActivityScreen() {
  return (
    <PlaceholderScreen
      title="Recent activity"
      description="Track file updates, shares, and security alerts across your workspace."
      iconName="timeline"
    >
      <View style={styles.timelineItem}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="upload" size={18} color={colors.primary} />
        </View>
        <View style={styles.timelineContent}>
          <Text style={styles.timelineTitle}>You uploaded “Q3 Report.pdf”</Text>
          <Text style={styles.timelineMeta}>2 hours ago · 4.2 MB</Text>
        </View>
      </View>
      <View style={styles.timelineItem}>
        <View style={styles.iconWrapperAlert}>
          <MaterialIcons name="warning" size={18} color="#fff" />
        </View>
        <View style={styles.timelineContent}>
          <Text style={styles.timelineTitle}>Unusual sign-in detected</Text>
          <Text style={styles.timelineMeta}>
            Verify the activity in Security settings.
          </Text>
        </View>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}1a`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  iconWrapperAlert: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff9f1c",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  timelineMeta: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
  },
});
