import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, spacing, typography } from "../../constants/theme";

type HomeWelcomeCardProps = {
  userName: string;
  lastActivity: string;
  statusLabel?: string;
  statusIcon?: keyof typeof MaterialIcons.glyphMap;
  avatar?: ImageSourcePropType;
  syncDurationMs?: number;
};

export function HomeWelcomeCard({
  userName,
  lastActivity,
  statusLabel = "All files synced",
  statusIcon = "autorenew",
  avatar,
  syncDurationMs = 4000,
}: HomeWelcomeCardProps) {
  const [syncing, setSyncing] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    const timer = setTimeout(() => {
      spinAnimation.stop();
      rotation.stopAnimation(() => rotation.setValue(0));
      setSyncing(false);
    }, syncDurationMs);

    return () => {
      clearTimeout(timer);
      spinAnimation.stop();
      rotation.stopAnimation();
    };
  }, [rotation, syncDurationMs]);

  const rotationStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const statusCopy = syncing ? "Syncing files to the cloud" : statusLabel;

  return (
    <View style={styles.card}>
      <View style={styles.avatarWrapper}>
        {avatar ? (
          <Image source={avatar} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <MaterialIcons name="person" size={30} color={colors.primary} />
          </View>
        )}
      </View>

      <View style={styles.copy}>
        <Text style={styles.greeting}>
          Welcome back, {userName}! <Text style={styles.wave}>👋</Text>
        </Text>
        <Text style={styles.activity}>{lastActivity}</Text>
      </View>

      <View style={styles.statusPill}>
        <Animated.View
          style={[
            styles.statusIconWrapper,
            syncing ? rotationStyle : undefined,
          ]}
        >
          <MaterialIcons name={statusIcon} size={18} color={colors.success} />
        </Animated.View>
        <Text style={styles.statusLabel}>{statusCopy}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    shadowColor: "rgba(15, 22, 36, 0.12)",
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  avatarWrapper: {
    marginBottom: spacing.md,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
  },
  avatarFallback: {
    width: 70,
    height: 70,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(101, 31, 255, 0.08)",
  },
  copy: {
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  wave: {
    fontSize: typography.heading,
  },
  activity: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(25, 172, 101, 0.12)",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  statusIconWrapper: {
    marginRight: spacing.xs,
  },
  statusLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.success,
  },
});
