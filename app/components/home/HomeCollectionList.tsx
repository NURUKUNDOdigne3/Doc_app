import type { ReactNode } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { spacing, typography } from "../../constants/theme";

type CollectionItem = {
  id: string;
  title: string;
  description: string;
  gradient: [string, string];
  icon?: ReactNode;
};

type HomeCollectionListProps = {
  items: CollectionItem[];
};

export function HomeCollectionList({ items }: HomeCollectionListProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <LinearGradient
          key={item.id}
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconSlot}>{item.icon}</View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.description}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    borderRadius: 24,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    shadowColor: "rgba(15, 22, 36, 0.15)",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
  iconSlot: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  meta: {
    fontSize: typography.body,
    color: "rgba(255,255,255,0.85)",
  },
});
