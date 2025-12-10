import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors } from "../constants/theme";

const tabScreens = {
  home: { title: "Home", icon: "home" },
  "my-files": { title: "Browse", icon: "apps" },
  folders: { title: "Folders", icon: "folder-open" },
  shared: { title: "Shared", icon: "group" },
  settings: { title: "Settings", icon: "settings" },
} as const;

type TabName = keyof typeof tabScreens;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const routeNames = route.name.split("/")[0];
        const config = tabScreens[routeNames as TabName];
        // console.log(route);
        return {
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name={
                (config?.icon ??
                  "help-outline") as keyof typeof MaterialIcons.glyphMap
              }
              color={color}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarLabel: config?.title ?? route.name,
        };
      }}
    >
      {(
        Object.entries(tabScreens) as [TabName, (typeof tabScreens)[TabName]][]
      ).map(([name, config]) => (
        <Tabs.Screen key={name} name={name} options={{ title: config.title }} />
      ))}
    </Tabs>
  );
}
