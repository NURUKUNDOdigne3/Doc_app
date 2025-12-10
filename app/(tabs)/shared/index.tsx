import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../components/PlaceholderScreen";
import { colors, spacing, typography } from "../../constants/theme";

export default function SharedScreen() {
  return (
    <PlaceholderScreen
      title="Shared with me"
      description="Access the files and folders colleagues have shared with you."
      iconName="people"
    >
      <View style={styles.noticeCard}>
        <MaterialIcons name="notifications" size={24} color={colors.primary} />
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>Stay up to date</Text>
          <Text style={styles.noticeDescription}>
            Invites and permissions changes will appear here. Enable push
            notifications in Settings to never miss an update.
          </Text>
        </View>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  noticeCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  noticeContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  noticeTitle: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
  },
  noticeDescription: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
});
