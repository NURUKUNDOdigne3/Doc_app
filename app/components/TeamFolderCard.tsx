import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type TeamFolderCardProps = {
  name: string;
  onPress?: () => void;
};

export function TeamFolderCard({ name, onPress }: TeamFolderCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.menuRow}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="folder" size={86} color={colors.primary} />
          </View>
          <MaterialIcons
            name="more-vert"
            size={18}
            color={colors.textMuted}
            style={styles.menuIcon}
          />
        </View>
      </View>
      <Text style={[styles.label, { fontWeight: 700 }]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 120,
    // height: 130,
    borderRadius: 10,
    backgroundColor: "#f6f6fb",
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: "flex-start",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  menuRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconWrapper: {
    // backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    position: "absolute",
    right: -14,
    top: -3,
  },
  label: {
    fontSize: typography.body,
    fontWeight: "600",
    color: "#5C5F6E",
    marginTop: 5,
  },
});
