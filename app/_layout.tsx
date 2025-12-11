import { Stack } from "expo-router";

import { StatusBar } from "react-native";
import { colors } from "./constants/theme";

export default function RootLayout() {
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
        <Stack.Screen name="favourites" options={{ title: "Favourites" }} />
        <Stack.Screen name="activity" options={{ title: "Activity" }} />
        <Stack.Screen name="security" options={{ title: "Security" }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="password-reset" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="folder/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="forget-password"
          options={{ title: "Reset Password" }}
        />
        <Stack.Screen
          name="plan-details"
          options={{ title: "Plan & Billing" }}
        />
        <Stack.Screen
          name="document-details"
          options={{ title: "Document Details" }}
        />
        <Stack.Screen name="upload" options={{ title: "Upload" }} />
      </Stack>
      <StatusBar barStyle="dark-content" />
    </>
  );
}
