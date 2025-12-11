import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { PrimaryButton } from "./components/PrimaryButton";
import { TextField } from "./components/TextField";
import { colors, spacing } from "./constants/theme";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const otpRoute = "/otp" as const;
  const signInRoute = "/login" as const;

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View>
          <View style={styles.heroWrapper}>
            <View style={styles.brandRow}>
              <AntDesign name="cloud" size={28} color={colors.primary} />
              <Text style={styles.brandName}>Bika</Text>
            </View>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Create new account</Text>
            <Text style={styles.subtitle}>
              Please fill registration to create account
            </Text>
          </View>

          <View style={styles.emailContainer}>
            <TextField
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Type your full name"
              autoCapitalize="words"
            />
            <TextField
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="Type your email"
            />
            <TextField
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
            />
            <TextField
              label="Confirm Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Repeat your password"
            />
            <View>
              <PrimaryButton
                label="Sign up"
                onPress={() => router.replace(otpRoute as Href)}
              />
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <Link
                  href={signInRoute as Href}
                  style={{ color: colors.primary, fontWeight: 700 }}
                >
                  Sign in
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingBottom: spacing.lg,
    justifyContent: "space-between",
  },
  heroWrapper: {
    alignItems: "center",
    backgroundColor: "#edeaff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 70,
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  brandMark: {
    width: 35,
    height: 35,
  },
  brandName: {
    fontSize: 38,
    fontWeight: "700",
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  heroImage: {
    width: "100%",
    height: 300,
    // marginBottom: spacing.lg,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  emailContainer: {
    marginTop: 5,
    paddingHorizontal: 17,
    gap: 7,
  },
  emailInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: "#f9f9fa",
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
    width: "75%",
  },
  nextButton: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30a4f4",
  },
  socialContainer: {
    marginTop: 19,
    paddingHorizontal: 17,
    gap: spacing.sm,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: "#000000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 19,
    flexDirection: "row",
    gap: 5,
  },
  footerText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: 500,
  },
});
