import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PrimaryButton } from "./components/PrimaryButton";
import { TextField } from "./components/TextField";
import { colors, spacing, typography } from "./constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgetPasswordRoute = "/forget-password" as const;
  const signupRoute = "/signup" as const;
  const homeTabsRoute = "/(tabs)/home" as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>
            Access your documents, photos, and videos securely in the cloud.
          </Text>

          <TextField
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />
          <TextField
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
          />

          <View style={styles.linkRow}>
            <Link href={forgetPasswordRoute as Href} style={styles.linkText}>
              Forgot password?
            </Link>
          </View>
        </View>

        <View>
          <PrimaryButton
            label="Continue"
            onPress={() => router.replace(homeTabsRoute as Href)}
          />
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Need an account?</Text>
            <Link href={signupRoute as Href} style={styles.linkText}>
              Create one
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  linkRow: {
    alignItems: "flex-end",
  },
  linkText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: typography.body,
  },
  footerRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginRight: spacing.xs,
  },
});
