import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing, typography } from "./constants/theme";

type BillingCycle = "monthly" | "annually";

type Plan = {
  id: string;
  titleKey: string;
  storage: string;
  monthlyPrice: number;
  annualPrice: number;
  isRecommended?: boolean;
};

export default function PlanDetailsScreen() {
  const { t } = useTranslation("planDetails");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = useMemo<Plan[]>(
    () => [
      {
        id: "basic",
        titleKey: "plans.basic.title",
        storage: "50GB",
        monthlyPrice: 15000,
        annualPrice: 50000,
      },
      {
        id: "standard",
        titleKey: "plans.standard.title",
        storage: "100GB",
        monthlyPrice: 20000,
        annualPrice: 100000,
        isRecommended: true,
      },
      {
        id: "pro",
        titleKey: "plans.pro.title",
        storage: "1TB",
        monthlyPrice: 300000,
        annualPrice: 700000,
      },
    ],
    []
  );

  const billingMeta =
    billingCycle === "monthly"
      ? t("billing.meta.monthly")
      : t("billing.meta.annually");

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t("screen.title")}</Text>

        <View style={styles.billingToggleWrapper}>
          <View style={styles.billingToggleBackground}>
            <ToggleButton
              label={t("billing.cycles.monthly")}
              active={billingCycle === "monthly"}
              onPress={() => setBillingCycle("monthly")}
            />
            <ToggleButton
              label={t("billing.cycles.annually")}
              active={billingCycle === "annually"}
              onPress={() => setBillingCycle("annually")}
            />
          </View>
        </View>

        <View style={styles.planList}>
          {plans.map((plan, index) => {
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            const periodLabel =
              billingCycle === "monthly"
                ? t("billing.period.month")
                : t("billing.period.year");
            const isActive = plan.isRecommended;
            const isLast = index === plans.length - 1;

            return (
              <View
                key={plan.id}
                style={[
                  styles.planCard,
                  isActive && styles.planCardActive,
                  !isLast && styles.planCardSpacing,
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{t(plan.titleKey)}</Text>
                  <View
                    style={[
                      styles.planStorageBadge,
                      isActive && styles.planStorageBadgeActive,
                    ]}
                  >
                    <Text style={styles.planStorageLabel}>{plan.storage}</Text>
                  </View>
                </View>

                <Text style={styles.planPrice}>
                  {price.toLocaleString()} RWF
                  <Text style={styles.planPricePeriod}> / {periodLabel}</Text>
                </Text>
                <Text style={styles.planBillingMeta}>{billingMeta}</Text>

                <TouchableOpacity
                  style={[styles.planCta, isActive && styles.planCtaActive]}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.planCtaLabel,
                      isActive && styles.planCtaLabelActive,
                    ]}
                  >
                    {t("actions.upgrade")}
                  </Text>
                </TouchableOpacity>

                <View style={styles.planFooterIcon}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={isActive ? colors.primary : colors.textMuted}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type ToggleButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function ToggleButton({ label, active, onPress }: ToggleButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.billingToggleOption,
        active && styles.billingToggleOptionActive,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text
        style={[
          styles.billingToggleLabel,
          active && styles.billingToggleLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 3,
    borderColor: "#f9f9fa",
  },
  title: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  billingToggleWrapper: {
    marginBottom: spacing.xl,
  },
  billingToggleBackground: {
    flexDirection: "row",
    backgroundColor: "#ececff",
    borderRadius: 40,
    padding: 4,
  },
  billingToggleOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: 36,
  },
  billingToggleOptionActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  billingToggleLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textMuted,
  },
  billingToggleLabelActive: {
    color: colors.surface,
  },
  planList: {
    paddingBottom: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: "#f0f0f5",
    shadowColor: "#0f0d2c",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  planCardActive: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
  planCardSpacing: {
    marginBottom: spacing.md,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  planName: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  planStorageBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#f6f0ff",
  },
  planStorageBadgeActive: {
    backgroundColor: "#e7dbff",
  },
  planStorageLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  planPrice: {
    marginTop: spacing.sm,
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  planPricePeriod: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textMuted,
  },
  planBillingMeta: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  planCta: {
    marginTop: spacing.lg,
    borderRadius: 16,
    backgroundColor: "#e9eaf7",
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  planCtaActive: {
    backgroundColor: colors.primary,
  },
  planCtaLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textMuted,
  },
  planCtaLabelActive: {
    color: colors.surface,
  },
  planFooterIcon: {
    marginTop: spacing.md,
    alignItems: "center",
  },
});
