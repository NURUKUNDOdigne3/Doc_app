import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PrimaryButton } from "./components/PrimaryButton";
import { TextField } from "./components/TextField";
import { colors, spacing, typography } from "./constants/theme";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRoute = "/login" as const;
  const otpRoute = "/otp" as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Store, organize, and share documents securely with 15 GB of free
              storage.
            </Text>
            <TextField
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Jane Doe"
              autoCapitalize="words"
            />
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
              placeholder="Create a password"
            />
          </View>
          <View>
            <PrimaryButton
              label="Sign up"
              onPress={() => router.replace(otpRoute as Href)}
            />
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href={loginRoute as Href} style={styles.linkText}>
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flexGrow: 1,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginRight: spacing.xs,
  },
  linkText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: typography.body,
  },
});
