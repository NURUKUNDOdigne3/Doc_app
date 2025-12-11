import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type FileItemType = "file" | "folder";

type FileItemProps = {
  name: string;
  detail: string;
  type?: FileItemType;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
};

export function FileItem({
  name,
  detail,
  type = "file",
  thumbnail,
  onPress,
}: FileItemProps) {
  const renderThumbnail = () => {
    if (type === "file" && thumbnail) {
      return <Image source={thumbnail} style={styles.thumbnailImage} />;
    }

    const iconName = type === "folder" ? "folder" : "insert-drive-file";
    const backgroundColor = type === "folder" ? "transparent" : "#f5f6fa";

    return (
      <View style={[styles.thumbnailFallback, { backgroundColor }]}>
        <MaterialIcons name={iconName} size={52} color={colors.primary} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      {renderThumbnail()}
      <View style={styles.textBlock}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {detail}
        </Text>
      </View>
      <MaterialIcons name="more-vert" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: colors.surface,
    shadowColor: "#000000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginBottom: spacing.sm,
  },
  thumbnailImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  thumbnailFallback: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  textBlock: {
    flex: 1,
  },
  name: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs / 1.5,
  },
  detail: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
