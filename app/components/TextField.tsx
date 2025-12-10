import { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type TextFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, helperText, style, ...rest }, ref) => {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          {...rest}
        />
        {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
      </View>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    color: colors.text,
  },
  helper: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
});
