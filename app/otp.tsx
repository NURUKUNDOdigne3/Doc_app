import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { colors, spacing } from "./constants/theme";

export default function OtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const homeRoute = "/(tabs)/home" as const;

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
            <Image
              source={require("../assets/images/illustrations/lgoin.png")}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.loginText}>
            <Text style={styles.title}>Welcome Digne!</Text>
            <Text style={styles.subtitle}>
              Enter a 6-digit access code sent to your email
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <TextInput
              placeholder="000000"
              placeholderTextColor="#5c5f6e"
              onChangeText={setOtp}
              keyboardType="number-pad"
              secureTextEntry={true}
              value={otp}
              style={styles.otpInput}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace(homeRoute as Href)}
              style={styles.nextButton}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                Verify <FontAwesome6 name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Didn't get your OTP code?
              <TouchableOpacity activeOpacity={0.6}>
                <Text
                  style={{
                    fontSize: 16,
                    top: 4,
                    color: colors.primary,
                    fontWeight: 700,
                  }}
                >
                  {"  "}Send again
                </Text>
              </TouchableOpacity>
            </Text>
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
  loginText: {
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
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  otpContainer: {
    paddingHorizontal: 17,
    flexDirection: "row",
    gap: 7,
  },
  otpInput: {
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
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#651fff",
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
    marginTop: 29,
  },
  footerText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: 500,
  },
});
