import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing, typography } from "../constants/theme";

type HeaderAction = {
  id: string;
  icon: ReactNode;
  onPress?: () => void;
};

type HeaderProps = {
  title: string;
  subtitle?: string;
  actions?: HeaderAction[];
  containerStyle?: ViewStyle;
};

export function Header({
  title,
  subtitle,
  actions,
  containerStyle,
}: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={[styles.container, containerStyle]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.actionsRow}>
          {actions?.map((action) => (
            <Pressable
              key={action.id}
              hitSlop={8}
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.iconButtonPressed,
              ]}
            >
              {action.icon}
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.lg,
    borderBottomWidth: 1,
    borderColor: "#F9F9FA",
  },
  title: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.sm,
  },
  iconButtonPressed: {
    opacity: 0.6,
  },
});
