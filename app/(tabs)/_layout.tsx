import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { colors } from "../constants/theme";

export default function AppLayout() {
  const router = useRouter();
  const { t } = useTranslation("navigation");

  const tabTitles = {
    home: t("tabs.home"),
    shared: t("tabs.shared"),
    scan: t("tabs.scan"),
    files: t("tabs.files"),
    account: t("tabs.account"),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: tabTitles.home,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />

      <Tabs.Screen
        name="shared/index"
        options={{
          title: tabTitles.shared,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/shared");
          },
        }}
      />

      <Tabs.Screen
        name="scan/index"
        options={{
          title: tabTitles.scan,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.centralButton,
                !focused && styles.centralButtonInactive,
              ]}
            >
              <MaterialIcons
                name="document-scanner"
                size={28}
                color={focused ? "#ffffff" : "#ffffff"}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            router.push("/scan");
          },
        }}
      />

      <Tabs.Screen
        name="folders/index"
        options={{
          title: tabTitles.files,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="folder-open" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/folders");
          },
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: tabTitles.account,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-box" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    height: 82,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: "absolute",
  },
  tabBarBackground: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  centralButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centralButtonInactive: {
    backgroundColor: colors.primary,
    opacity: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
  },
});
