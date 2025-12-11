import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, spacing, typography } from "../constants/theme";

type OfflinePromoCardProps = {
  description: string;
  illustration: ImageSourcePropType;
};

export function OfflinePromoCard({
  description,
  illustration,
}: OfflinePromoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.bodyRow}>
        <Text style={styles.description}>{description}</Text>
        <Image
          source={illustration}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: colors.surface,
    // borderRadius: 24,
    // padding: spacing.lg,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  link: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: "600",
  },
  bodyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  description: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: 500,
    color: colors.text,
  },
  illustration: {
    height: 120,
    width: 140,
    objectFit: "contain",
  },
});
