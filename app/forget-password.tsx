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

export default function ForgetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const loginRoute = "/login" as const;
  const otpRoute = "/otp" as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Enter the email associated with your account and we’ll send an OTP
            to reset your password.
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
        </View>
        <View>
          <PrimaryButton
            label="Send OTP"
            onPress={() => router.push(otpRoute as Href)}
          />
          <View style={styles.footerRow}>
            <Link href={loginRoute as Href} style={styles.linkText}>
              Back to sign in
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
  footerRow: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  linkText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: typography.body,
  },
});
