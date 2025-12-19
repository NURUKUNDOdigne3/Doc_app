import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "./components/PlaceholderScreen";
import { PrimaryButton } from "./components/PrimaryButton";
import { colors, spacing, typography } from "./constants/theme";

export default function SecurityScreen() {
  const { t } = useTranslation("security");

  return (
    <PlaceholderScreen
      title={t("screen.title")}
      description={t("screen.description")}
      iconName="shield"
      footer={<PrimaryButton label={t("screen.cta")} variant="secondary" />}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("sections.status.title")}</Text>
        <View style={styles.statusRow}>
          <MaterialIcons name="phishing" size={20} color={colors.success} />
          <Text style={styles.statusText}>{t("sections.status.ok")}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("sections.recommended.title")}
        </Text>
        <View style={styles.taskCard}>
          <MaterialIcons name="lock" size={20} color={colors.primary} />
          <Text style={styles.taskText}>
            {t("sections.recommended.items.twoFactor")}
          </Text>
        </View>
        <View style={styles.taskCard}>
          <MaterialIcons name="privacy-tip" size={20} color={colors.primary} />
          <Text style={styles.taskText}>
            {t("sections.recommended.items.thirdParty")}
          </Text>
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
