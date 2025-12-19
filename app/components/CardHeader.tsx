import { Link } from "expo-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type CardHeaderProps = {
  icon: ReactNode;
  title: string;
  linkHref: string;
  linkLabel?: string;
  containerStyle?: ViewStyle;
};

export function CardHeader({
  icon,
  title,
  linkHref,
  linkLabel,
  containerStyle,
}: CardHeaderProps) {
  const { t } = useTranslation("common");
  const resolvedLinkLabel = linkLabel ?? t("actions.seeAll");

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleRow}>
        <View style={styles.iconSlot}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Link href={linkHref as never} style={styles.link}>
        {resolvedLinkLabel}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSlot: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  link: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.primary,
  },
});
