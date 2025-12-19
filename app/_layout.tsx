import { Stack } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, StatusBar } from "react-native";
import { colors } from "./constants/theme";

import "./i18n";

export default function RootLayout() {
  const { t } = useTranslation("stack");

  return (
    <>
      <Stack
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: "600" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="favourites"
          options={{ title: t("titles.favourites") }}
        />
        <Stack.Screen
          name="activity"
          options={{ title: t("titles.activity") }}
        />
        <Stack.Screen
          name="security"
          options={{ title: t("titles.security") }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="password-reset" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="folder/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="forget-password"
          options={{ title: t("titles.forgetPassword") }}
        />
        <Stack.Screen
          name="plan-details"
          options={({ navigation }) => ({
            title: t("titles.planDetails"),
            headerTitleStyle: {
              color: colors.text,
              fontWeight: "700",
              fontSize: 20,
            },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            headerTitleAlign: "left",
            headerBackVisible: false,
            headerLeft: ({ tintColor }) => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  opacity: pressed ? 0.5 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                })}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={22}
                  color={tintColor ?? colors.text}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="settings/[menu]"
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTintColor: colors.text,
            headerTitleAlign: "left",

            headerLeft: ({ tintColor }) => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  opacity: pressed ? 0.5 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                })}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={22}
                  color={tintColor ?? colors.text}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="(tabs)/scan" options={{ headerShown: false }} />
        <Stack.Screen
          name="document-details"
          options={{ title: t("titles.documentDetails") }}
        />
        <Stack.Screen name="upload" options={{ title: t("titles.upload") }} />
      </Stack>
      <StatusBar barStyle="dark-content" />
    </>
  );
}
