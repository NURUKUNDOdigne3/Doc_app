import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type RecentItemCardProps = {
  thumbnail: ImageSourcePropType;
  title: string;
  subtitle: string;
  actionIcon?: ReactNode;
  onPress?: () => void;
};

export function RecentItemCard({
  thumbnail,
  title,
  subtitle,
  actionIcon,
  onPress,
}: RecentItemCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image source={thumbnail} style={styles.thumbnail} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.trailing}>
        {actionIcon ?? (
          <MaterialIcons name="more-vert" size={20} color={colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginRight: spacing.md,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  trailing: {
    marginLeft: spacing.sm,
  },
});
