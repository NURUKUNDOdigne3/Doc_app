import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CopyText,
  Section,
  SectionRow,
  SETTINGS_MENU_CONFIG,
  SettingsMenuKey,
} from "../constants/settingsMenu";
import { colors, spacing, typography } from "../constants/theme";
import { changeLanguage, LocaleCode } from "../i18n";
import { LANGUAGES } from "../i18n/languages";

function isSettingsKey(
  value: string | string[] | undefined
): value is SettingsMenuKey {
  return typeof value === "string" && value in SETTINGS_MENU_CONFIG;
}

type ToggleState = Record<string, boolean>;

type ToggleUpdater = (id: string, value: boolean) => void;

type LanguageRowContext = {
  selectedLanguage: LocaleCode;
  onSelectLanguage: (code: LocaleCode) => void;
};

function accumulateToggleDefaults(state: ToggleState, section: Section) {
  section.rows.forEach((row) => {
    if (row.kind === "toggle") {
      state[row.id] = row.defaultValue;
    }
  });
  return state;
}

export default function SettingsMenuDetailScreen() {
  const params = useLocalSearchParams<{ menu?: string }>();
  const navigation = useNavigation();
  const { i18n, t } = useTranslation("settingsMenu");
  const menuKey = params.menu;

  if (!isSettingsKey(menuKey)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <MaterialIcons
            name="error-outline"
            size={36}
            color={colors.primary}
          />
          <Text style={styles.emptyStateTitle}>{t("error.title")}</Text>
          <Text style={styles.emptyStateDescription}>
            {t("error.description")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const config = SETTINGS_MENU_CONFIG[menuKey];
  const isLanguageMenu = config.key === "language";

  const normalizeSettingsMenuKey = useCallback((key: string) => {
    return key.startsWith("settingsMenu.")
      ? key.slice("settingsMenu.".length)
      : key;
  }, []);

  const resolveCopy = useCallback(
    (copy: CopyText | undefined) => {
      if (!copy) return "";
      if (typeof copy === "string") {
        return copy;
      }
      return t(normalizeSettingsMenuKey(copy.key), copy.values);
    },
    [normalizeSettingsMenuKey, t]
  );

  const normalizeLanguage = (code: string): LocaleCode => {
    const base = code.split("-")[0].toLowerCase();
    const match = LANGUAGES.find((lang) => lang.code === base);
    return (match?.code ?? LANGUAGES[0].code) as LocaleCode;
  };

  const currentLanguage = normalizeLanguage(i18n.language ?? "en");
  const [pendingLanguage, setPendingLanguage] =
    useState<LocaleCode>(currentLanguage);

  useEffect(() => {
    setPendingLanguage(normalizeLanguage(i18n.language ?? "en"));
  }, [i18n.language]);

  useEffect(() => {
    navigation.setOptions({
      title: resolveCopy(config.title),
      headerTitleStyle: {
        color: colors.text,
        fontWeight: "700",
        fontSize: 20,
      },
      headerTintColor: colors.text,
      headerShadowVisible: false,
      headerTitleAlign: "left",
    });
  }, [config, navigation, resolveCopy]);

  const initialToggleState = useMemo(() => {
    return config.sections.reduce(accumulateToggleDefaults, {} as ToggleState);
  }, [config.sections]);

  const [toggles, setToggles] = useState<ToggleState>(initialToggleState);

  const handleSelectLanguage = async (code: LocaleCode) => {
    setPendingLanguage(code);
    if (!isLanguageMenu) return;
    if (code === currentLanguage) return;
    try {
      await changeLanguage(code);
    } catch (error) {
      console.warn("settings: failed to change language", error);
    }
  };

  const handleApplyLanguage = async () => {
    if (!isLanguageMenu) return;
    if (pendingLanguage === currentLanguage) return;
    await changeLanguage(pendingLanguage);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* <View
          style={[
            styles.heroCard,
            config.heroAccent && { backgroundColor: config.heroAccent },
          ]}
        >
          <View style={styles.heroIconWrapper}>
            <MaterialIcons
              name={config.icon}
              size={32}
              color={colors.primary}
            />
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>{config.title}</Text>
            <Text style={styles.heroSubtitle}>{config.subtitle}</Text>
          </View>
        </View> */}

        {config.sections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {resolveCopy(section.title)}
              </Text>
              {section.description ? (
                <Text style={styles.sectionDescription}>
                  {resolveCopy(section.description)}
                </Text>
              ) : null}
            </View>

            <View style={styles.sectionBody}>
              {section.rows.map((row, index) => (
                <View
                  key={`${section.id}-${row.kind}-${index}`}
                  style={[
                    styles.row,
                    index !== section.rows.length - 1 && styles.rowDivider,
                  ]}
                >
                  {renderRow(
                    row,
                    toggles,
                    (id, value) =>
                      setToggles((prev) => ({ ...prev, [id]: value })),
                    resolveCopy,
                    isLanguageMenu
                      ? {
                          selectedLanguage: pendingLanguage,
                          onSelectLanguage: handleSelectLanguage,
                        }
                      : undefined
                  )}
                </View>
              ))}
            </View>

            {(section.primaryCta || section.secondaryCta) && (
              <View style={styles.sectionFooter}>
                {section.primaryCta ? (
                  <TouchableOpacity
                    style={[
                      styles.ctaButton,
                      styles.ctaPrimary,
                      isLanguageMenu && pendingLanguage === currentLanguage
                        ? styles.ctaPrimaryDisabled
                        : null,
                    ]}
                    activeOpacity={0.85}
                    disabled={
                      isLanguageMenu && pendingLanguage === currentLanguage
                    }
                    onPress={() => {
                      if (isLanguageMenu) {
                        handleApplyLanguage();
                      }
                    }}
                  >
                    <Text style={[styles.ctaLabel, styles.ctaLabelPrimary]}>
                      {resolveCopy(section.primaryCta.label)}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {section.secondaryCta ? (
                  <TouchableOpacity
                    style={[styles.ctaButton, styles.ctaSecondary]}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.ctaLabel, styles.ctaLabelSecondary]}>
                      {resolveCopy(section.secondaryCta.label)}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function renderRow(
  row: SectionRow,
  toggles: ToggleState,
  onToggleChange: ToggleUpdater,
  resolveCopy: (copy: CopyText | undefined) => string,
  languageContext?: LanguageRowContext
) {
  switch (row.kind) {
    case "detail":
      return (
        <View style={styles.detailRow}>
          <View>
            <Text style={styles.detailLabel}>{resolveCopy(row.label)}</Text>
            <Text
              style={[
                styles.detailValue,
                row.accent === "primary" && styles.detailValuePrimary,
                row.accent === "success" && styles.detailValueSuccess,
              ]}
            >
              {resolveCopy(row.value)}
            </Text>
          </View>
          {row.icon ? (
            <View style={styles.detailIconBadge}>
              <MaterialIcons name={row.icon} size={18} color={colors.primary} />
            </View>
          ) : null}
        </View>
      );
    case "toggle":
      return (
        <View style={styles.toggleRow}>
          <View style={styles.toggleCopy}>
            <Text style={styles.detailLabel}>{resolveCopy(row.label)}</Text>
            {row.description ? (
              <Text style={styles.toggleDescription}>
                {resolveCopy(row.description)}
              </Text>
            ) : null}
          </View>
          <Switch
            value={toggles[row.id] ?? row.defaultValue}
            onValueChange={(value) => onToggleChange(row.id, value)}
            thumbColor={colors.surface}
            trackColor={{ false: "#d4d6db", true: colors.primary }}
          />
        </View>
      );
    case "progress": {
      const ratio = Math.min(1, row.total === 0 ? 0 : row.used / row.total);
      return (
        <View style={styles.progressRow}>
          <View style={styles.progressHeader}>
            <Text style={styles.detailLabel}>{resolveCopy(row.label)}</Text>
            <Text style={styles.progressValue}>
              {row.used} / {row.total} {resolveCopy(row.unit)}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${ratio * 100}%` }]} />
          </View>
        </View>
      );
    }
    case "note":
      return (
        <View style={styles.noteRow}>
          <Text style={styles.detailLabel}>{resolveCopy(row.label)}</Text>
          <Text style={styles.noteBody}>{resolveCopy(row.description)}</Text>
        </View>
      );
    case "action":
      return (
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.85}>
          <View style={styles.actionLeft}>
            <View style={styles.actionIconCircle}>
              <MaterialIcons name={row.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.detailLabel}>{resolveCopy(row.label)}</Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      );
    case "language-option": {
      if (!languageContext) {
        return null;
      }

      const isSelected = languageContext.selectedLanguage === row.code;

      return (
        <TouchableOpacity
          style={[styles.languageRow, isSelected && styles.languageRowSelected]}
          activeOpacity={0.85}
          onPress={() => languageContext.onSelectLanguage(row.code)}
        >
          <View style={styles.languageCopy}>
            <Text style={styles.languageLabel}>{resolveCopy(row.label)}</Text>
            <Text style={styles.languageNative}>
              {resolveCopy(row.nativeName)}
            </Text>
          </View>
          <View
            style={[
              styles.languageRadioOuter,
              isSelected && styles.languageRadioOuterActive,
            ]}
          >
            {isSelected ? <View style={styles.languageRadioInner} /> : null}
          </View>
        </TouchableOpacity>
      );
    }
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    gap: spacing.md,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  sectionDescription: {
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  sectionBody: {
    borderRadius: 20,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  row: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e5ec",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  detailLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  detailValue: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  detailValuePrimary: {
    color: colors.primary,
  },
  detailValueSuccess: {
    color: colors.success,
  },
  detailIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#edeaff",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  toggleCopy: {
    flex: 1,
  },
  toggleDescription: {
    marginTop: 4,
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  progressRow: {
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressValue: {
    fontSize: typography.body,
    color: colors.textMuted,
    fontWeight: "600",
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#e4e6ee",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  noteRow: {
    gap: 6,
  },
  noteBody: {
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  actionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#eef0f5",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionFooter: {
    flexDirection: "row",
    gap: spacing.md,
  },
  ctaButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: spacing.sm,
  },
  ctaPrimary: {
    backgroundColor: colors.primary,
  },
  ctaPrimaryDisabled: {
    opacity: 0.5,
  },
  ctaSecondary: {
    borderWidth: 1,
    borderColor: "#d6d8e1",
  },
  ctaLabel: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  ctaLabelPrimary: {
    color: colors.surface,
  },
  ctaLabelSecondary: {
    color: colors.text,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  languageRowSelected: {
    backgroundColor: "rgba(101, 31, 255, 0.08)",
    borderRadius: 16,
    paddingHorizontal: spacing.md,
  },
  languageCopy: {
    flex: 1,
    gap: 4,
  },
  languageLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  languageNative: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  languageRadioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  languageRadioOuterActive: {
    borderColor: colors.primary,
  },
  languageRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyStateTitle: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
  },
  emptyStateDescription: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
