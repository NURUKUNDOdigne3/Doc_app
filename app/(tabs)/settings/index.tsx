import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Header } from "@/app/components/Header";
import { AvatarStack } from "../../components/AvatarStack";
import {
  SETTINGS_MENU_CONFIG,
  SettingsMenuKey,
} from "../../constants/settingsMenu";
import { colors, spacing, typography } from "../../constants/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const usedGb = 4.5;
  const totalGb = 15;
  const usageRatio = usedGb / totalGb;

  const teamMembers = [
    require("../../../assets/images/pictures/pic1.jpg"),
    require("../../../assets/images/pictures/pic2.jpg"),
    require("../../../assets/images/pictures/pic3.jpg"),
  ];

  const devices = ["smartphone", "laptop", "tablet"];

  const menuOrder: SettingsMenuKey[] = [
    "settings",
    "storage",
    "billing",
    "notification",
    "refer",
    "language",
    "privacy",
    "security",
  ];

  const menuItems = menuOrder.map((key) => ({
    id: key,
    label: SETTINGS_MENU_CONFIG[key].title,
    icon: SETTINGS_MENU_CONFIG[key].icon,
  }));

  return (
    <View style={styles.screen}>
      <Header
        title="Account"
        actions={[
          {
            id: "settings",
            icon: (
              <MaterialIcons name="settings" size={30} color={colors.text} />
            ),
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.accountCard}>
          <View style={styles.accountRow}>
            <View style={styles.profileRow}>
              <Image
                source={require("../../../assets/images/pictures/pic1.jpg")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.accountName}>Digne Mellow</Text>
                <Text style={styles.accountEmail}>cnrukundo@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.75}>
              <MaterialIcons name="edit" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.planRow}>
            <Text style={styles.planLabel}>Free</Text>
            <Text style={styles.planUsage}>
              {usedGb} GB of {totalGb} GB
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${usageRatio * 100}%` }]}
            />
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            activeOpacity={0.9}
            onPress={() => router.push("/plan-details")}
          >
            <Text style={styles.upgradeLabel}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickGrid}>
          <View style={[styles.quickCard, styles.quickCardInvite]}>
            <AvatarStack images={teamMembers} size={36} overlap={14} />
            <Text style={styles.quickTitle}>Team members</Text>
            <Text style={styles.quickMeta}>3/10</Text>
            <TouchableOpacity
              style={styles.quickPrimaryCta}
              activeOpacity={0.85}
            >
              <Text style={styles.quickPrimaryCtaLabel}>Invite</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickCard}>
            <View style={styles.deviceIconsRow}>
              {devices.map((icon, index) => (
                <View key={`${icon}-${index}`} style={styles.deviceIconBox}>
                  <MaterialIcons
                    name={icon as never}
                    size={20}
                    color={colors.textMuted}
                  />
                </View>
              ))}
            </View>
            <Text style={styles.quickTitle}>Devices</Text>
            <Text style={styles.quickMeta}>3/3</Text>
            <TouchableOpacity
              style={styles.quickSecondaryCta}
              activeOpacity={0.85}
            >
              <Text style={styles.quickSecondaryCtaLabel}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuTile}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: "/settings/[menu]",
                    params: { menu: item.id },
                  })
                }
              >
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons
                    name={item.icon as never}
                    size={30}
                    color={colors.textMuted}
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Link href="/login" style={styles.logoutLabel}>
            Logout
          </Link>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  accountCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    // padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quickGrid: {
    flexDirection: "row",
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: "#f9f9fa",
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  quickCardInvite: {
    backgroundColor: "#e2eeffff",
  },
  quickTitle: {
    marginTop: spacing.md,
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  quickMeta: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  quickPrimaryCta: {
    marginTop: spacing.md,
    borderRadius: 12,
    backgroundColor: "#c2d9faff",
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  quickPrimaryCtaLabel: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.primary,
  },
  quickSecondaryCta: {
    marginTop: spacing.md,
    borderRadius: 12,
    backgroundColor: "#e5e7ec",
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  quickSecondaryCtaLabel: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.textMuted,
  },
  deviceIconsRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  deviceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
    justifyContent: "center",
  },
  menuSection: {
    marginTop: spacing.xl,
  },
  menuTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
  },
  menuTile: {
    width: "48%",
    backgroundColor: "#f5f6fa",
    borderRadius: 18,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: spacing.sm,
  },
  menuIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    // backgroundColor: "#eef0f5",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  logoutButton: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  logoutLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: "#e53935",
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 50,
    marginRight: spacing.md,
  },
  accountName: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  accountEmail: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#f9f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  planLabel: {
    fontSize: typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  planUsage: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#e0e2eb",
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  upgradeLabel: {
    fontSize: typography.subheading,
    color: colors.surface,
    fontWeight: "700",
  },
});
