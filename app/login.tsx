import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function LoginScreen() {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");

  const signupRoute = "/signup" as const;
  const passwordRoute = "/password" as const;

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
              <Text style={styles.brandName}>{t("brand")}</Text>
            </View>
            <Image
              source={require("../assets/images/illustrations/lgoin.png")}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.loginText}>
            <Text style={styles.title}>{t("login.title")}</Text>
            <Text style={styles.subtitle}>{t("login.subtitle")}</Text>
          </View>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder={t("login.emailPlaceholder")}
              placeholderTextColor="#5c5f6e"
              textContentType="emailAddress"
              onChangeText={setEmail}
              value={email}
              style={styles.emailInput}
            />
            <TouchableOpacity
              onPress={() => router.replace(passwordRoute as Href)}
              activeOpacity={0.7}
              style={styles.nextButton}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                {t("login.next")} <FontAwesome6 name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <FontAwesome6 name="google" size={20} color="#000" />
              <Text style={styles.socialLabel}>{t("login.socialGoogle")}</Text>
              <View />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <FontAwesome6 name="apple" size={22} color="#000" />
              <Text style={styles.socialLabel}>{t("login.socialApple")}</Text>
              <View />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t("login.noAccount")}{" "}
              <Link
                style={{ color: colors.primary, fontWeight: 700 }}
                href={signupRoute}
              >
                {t("login.register")}
              </Link>
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
    backgroundColor: colors.background,
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
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  emailContainer: {
    paddingHorizontal: 17,
    flexDirection: "row",
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
  },
  footerText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: 500,
  },
});
