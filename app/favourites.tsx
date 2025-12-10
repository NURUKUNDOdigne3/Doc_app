import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "./components/PlaceholderScreen";
import { colors, spacing, typography } from "./constants/theme";

export default function FavouritesScreen() {
  return (
    <PlaceholderScreen
      title="Favourites"
      description="Quickly access your pinned documents and folders."
      iconName="star"
    >
      <View style={styles.listRow}>
        <MaterialIcons name="push-pin" size={20} color={colors.primary} />
        <Text style={styles.listText}>
          Pin important files to keep them handy.
        </Text>
      </View>
    </PlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  listRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listText: {
    marginLeft: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
  },
});
