import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../constants/theme";

type StatusItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  accentColor: string;
};

type HomeStatusListProps = {
  items: StatusItem[];
};

export function HomeStatusList({ items }: HomeStatusListProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: `${item.accentColor}1A` },
            ]}
          >
            <MaterialIcons
              name={item.icon}
              size={26}
              color={item.accentColor}
            />
          </View>
          <View style={styles.copy}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 24,
    shadowColor: "rgba(15, 22, 36, 0.08)",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
