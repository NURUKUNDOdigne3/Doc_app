import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  style?: ViewStyle;
  leadingIcon?: ReactNode;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled,
  style,
  leadingIcon,
}: PrimaryButtonProps) {
  const variantStyle = styles[`${variant}Button` as const];
  const variantLabelStyle = styles[`${variant}Label` as const];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyle,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {leadingIcon}
      <Text
        style={[
          styles.label,
          variantLabelStyle,
          leadingIcon ? styles.labelWithIcon : null,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: typography.subheading,
    fontWeight: "600",
  },
  labelWithIcon: {
    marginLeft: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryLabel: {
    color: "#ffffff",
  },
  secondaryButton: {
    backgroundColor: `${colors.primary}1a`,
  },
  secondaryLabel: {
    color: colors.primary,
  },
  outlineButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  outlineLabel: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
});
