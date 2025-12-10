import { Ionicons } from "@expo/vector-icons";
import { forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { colors, spacing } from "../constants/theme";

type SearchBarProps = TextInputProps & {
  containerStyle?: ViewStyle;
};

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ containerStyle, style, placeholder = "Search", ...rest }, ref) => {
    return (
      <View style={[styles.wrapper, containerStyle]}>
        <Ionicons name="search-outline" size={20} color={colors.textMuted} />
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          {...rest}
        />
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6fb",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
});
