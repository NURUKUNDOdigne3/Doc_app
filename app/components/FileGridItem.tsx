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
import { FileItemType } from "./FileItem";

type FileGridItemProps = {
  name: string;
  type?: FileItemType;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
};

export function FileGridItem({
  name,
  type = "folder",
  thumbnail,
  onPress,
}: FileGridItemProps) {
  const renderVisual = () => {
    if (type === "file" && thumbnail) {
      return <Image source={thumbnail} style={styles.thumbnailImage} />;
    }

    const iconName = type === "folder" ? "folder" : "insert-drive-file";
    const backgroundColor = type === "folder" ? "transparent" : "#f5f6fa";

    return (
      <View style={[styles.thumbnailFallback, { backgroundColor }]}>
        <MaterialIcons name={iconName} size={68} color={colors.primary} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{ margin: spacing.sm / 2, flex: 1 }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.container}>{renderVisual()}</View>
      <View style={styles.footerRow}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <MaterialIcons name="more-vert" size={18} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9fa",
    alignItems: "center",
    borderRadius: 18,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  thumbnailImage: {
    width: 68,
    height: 68,
    marginBottom: spacing.lg,
  },
  thumbnailFallback: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edeaff",
    marginBottom: spacing.lg,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  name: {
    fontSize: typography.subheading,
    fontWeight: "600",
    color: colors.text,
    marginRight: spacing.xs,
  },
});
