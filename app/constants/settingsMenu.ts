import { MaterialIcons } from "@expo/vector-icons";

import { LANGUAGES, LocaleCode } from "../i18n/languages";

export type CopyToken = {
  key: string;
  values?: Record<string, string | number>;
};

export type CopyText = string | CopyToken;

export type SettingsMenuKey =
  | "settings"
  | "storage"
  | "billing"
  | "notification"
  | "refer"
  | "language"
  | "privacy"
  | "security";

type AccentTone = "primary" | "success" | "warning" | "muted";

export type SectionRow =
  | {
      kind: "detail";
      label: CopyText;
      value: CopyText;
      accent?: AccentTone;
      icon?: keyof typeof MaterialIcons.glyphMap;
    }
  | {
      kind: "toggle";
      id: string;
      label: CopyText;
      description?: CopyText;
      defaultValue: boolean;
    }
  | {
      kind: "progress";
      label: CopyText;
      used: number;
      total: number;
      unit: CopyText;
    }
  | {
      kind: "note";
      label: CopyText;
      description: CopyText;
    }
  | {
      kind: "action";
      label: CopyText;
      icon: keyof typeof MaterialIcons.glyphMap;
      tone?: AccentTone;
    }
  | {
      kind: "language-option";
      code: LocaleCode;
      label: string;
      nativeName: string;
    };

export type Section = {
  id: string;
  title: CopyText;
  description?: CopyText;
  rows: SectionRow[];
  primaryCta?: { label: CopyText };
  secondaryCta?: { label: CopyText };
};

type SettingsMenuConfig = {
  key: SettingsMenuKey;
  title: CopyText;
  subtitle: CopyText;
  icon: keyof typeof MaterialIcons.glyphMap;
  heroAccent?: string;
  sections: Section[];
};

export const SETTINGS_MENU_CONFIG: Record<SettingsMenuKey, SettingsMenuConfig> =
  {
    settings: {
      key: "settings",
      title: { key: "settingsMenu.settings.title" },
      subtitle: { key: "settingsMenu.settings.subtitle" },
      icon: "tune",
      heroAccent: "#edeaff",
      sections: [
        {
          id: "profile",
          title: { key: "settingsMenu.settings.sections.profile.title" },
          description: {
            key: "settingsMenu.settings.sections.profile.description",
          },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.settings.sections.profile.rows.displayName.label",
              },
              value: "Digne Mellow",
            },
            {
              kind: "detail",
              label: {
                key: "settingsMenu.settings.sections.profile.rows.email.label",
              },
              value: "cnrukundo@gmail.com",
            },
            {
              kind: "toggle",
              id: "dark-mode",
              label: {
                key: "settingsMenu.settings.sections.profile.rows.darkMode.label",
              },
              description: {
                key: "settingsMenu.settings.sections.profile.rows.darkMode.description",
              },
              defaultValue: false,
            },
            {
              kind: "toggle",
              id: "compact-mode",
              label: {
                key: "settingsMenu.settings.sections.profile.rows.compactMode.label",
              },
              description: {
                key: "settingsMenu.settings.sections.profile.rows.compactMode.description",
              },
              defaultValue: false,
            },
          ],
        },
        {
          id: "shortcuts",
          title: { key: "settingsMenu.settings.sections.shortcuts.title" },
          description: {
            key: "settingsMenu.settings.sections.shortcuts.description",
          },
          rows: [
            {
              kind: "action",
              label: {
                key: "settingsMenu.settings.sections.shortcuts.rows.customizeCards.label",
              },
              icon: "view-quilt",
              tone: "primary",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.settings.sections.shortcuts.rows.keyboardShortcuts.label",
              },
              icon: "keyboard-alt",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.settings.sections.shortcuts.rows.notificationPreferences.label",
              },
              icon: "notifications",
            },
          ],
        },
      ],
    },
    language: {
      key: "language",
      title: { key: "settingsMenu.language.title" },
      subtitle: { key: "settingsMenu.language.subtitle" },
      icon: "language",
      heroAccent: "#f1f5ff",
      sections: [
        {
          id: "language-list",
          title: { key: "settingsMenu.language.sections.list.title" },
          description: {
            key: "settingsMenu.language.sections.list.description",
          },
          rows: LANGUAGES.map((language) => ({
            kind: "language-option",
            code: language.code,
            label: language.label,
            nativeName: language.nativeName,
          })),
          primaryCta: {
            label: { key: "settingsMenu.language.sections.list.primaryCta" },
          },
        },
      ],
    },
    storage: {
      key: "storage",
      title: { key: "settingsMenu.storage.title" },
      subtitle: { key: "settingsMenu.storage.subtitle" },
      icon: "inventory",
      heroAccent: "#eaf3ff",
      sections: [
        {
          id: "usage",
          title: { key: "settingsMenu.storage.sections.usage.title" },
          rows: [
            {
              kind: "progress",
              label: {
                key: "settingsMenu.storage.sections.usage.rows.storage.label",
              },
              used: 4.5,
              total: 15,
              unit: {
                key: "settingsMenu.storage.sections.usage.rows.storage.unit",
              },
            },
            {
              kind: "detail",
              label: {
                key: "settingsMenu.storage.sections.usage.rows.plan.label",
              },
              value: {
                key: "settingsMenu.storage.sections.usage.rows.plan.value",
              },
              accent: "primary",
            },
            {
              kind: "detail",
              label: {
                key: "settingsMenu.storage.sections.usage.rows.pinnedFolders.label",
              },
              value: {
                key: "settingsMenu.storage.sections.usage.rows.pinnedFolders.value",
              },
            },
          ],
          primaryCta: {
            label: { key: "settingsMenu.storage.sections.usage.primaryCta" },
          },
        },
        {
          id: "cleanup",
          title: { key: "settingsMenu.storage.sections.cleanup.title" },
          description: {
            key: "settingsMenu.storage.sections.cleanup.description",
          },
          rows: [
            {
              kind: "action",
              label: {
                key: "settingsMenu.storage.sections.cleanup.rows.reviewLargeFiles.label",
              },
              icon: "folder",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.storage.sections.cleanup.rows.emptyRecycleBin.label",
              },
              icon: "delete",
            },
          ],
        },
      ],
    },
    billing: {
      key: "billing",
      title: { key: "settingsMenu.billing.title" },
      subtitle: { key: "settingsMenu.billing.subtitle" },
      icon: "receipt-long",
      heroAccent: "#fff3e8",
      sections: [
        {
          id: "plan",
          title: { key: "settingsMenu.billing.sections.plan.title" },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.billing.sections.plan.rows.currentPlan.label",
              },
              value: {
                key: "settingsMenu.billing.sections.plan.rows.currentPlan.value",
              },
              accent: "primary",
            },
            {
              kind: "detail",
              label: {
                key: "settingsMenu.billing.sections.plan.rows.billingCycle.label",
              },
              value: {
                key: "settingsMenu.billing.sections.plan.rows.billingCycle.value",
              },
            },
          ],
          primaryCta: {
            label: { key: "settingsMenu.billing.sections.plan.primaryCta" },
          },
        },
        {
          id: "payment",
          title: { key: "settingsMenu.billing.sections.payment.title" },
          description: {
            key: "settingsMenu.billing.sections.payment.description",
          },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.billing.sections.payment.rows.primaryCard.label",
              },
              value: {
                key: "settingsMenu.billing.sections.payment.rows.primaryCard.value",
              },
              icon: "credit-card",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.billing.sections.payment.rows.addMethod.label",
              },
              icon: "add-card",
            },
          ],
        },
        {
          id: "invoices",
          title: { key: "settingsMenu.billing.sections.invoices.title" },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.billing.sections.invoices.rows.lastInvoice.label",
              },
              value: {
                key: "settingsMenu.billing.sections.invoices.rows.lastInvoice.value",
              },
              accent: "success",
              icon: "picture-as-pdf",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.billing.sections.invoices.rows.viewAll.label",
              },
              icon: "description",
            },
          ],
        },
      ],
    },
    notification: {
      key: "notification",
      title: { key: "settingsMenu.notification.title" },
      subtitle: { key: "settingsMenu.notification.subtitle" },
      icon: "notifications-none",
      heroAccent: "#f9f6ff",
      sections: [
        {
          id: "channels",
          title: { key: "settingsMenu.notification.sections.channels.title" },
          description: {
            key: "settingsMenu.notification.sections.channels.description",
          },
          rows: [
            {
              kind: "toggle",
              id: "email-updates",
              label: {
                key: "settingsMenu.notification.sections.channels.rows.emailSummaries.label",
              },
              description: {
                key: "settingsMenu.notification.sections.channels.rows.emailSummaries.description",
              },
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "push-updates",
              label: {
                key: "settingsMenu.notification.sections.channels.rows.pushNotifications.label",
              },
              description: {
                key: "settingsMenu.notification.sections.channels.rows.pushNotifications.description",
              },
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "sms-updates",
              label: {
                key: "settingsMenu.notification.sections.channels.rows.smsAlerts.label",
              },
              description: {
                key: "settingsMenu.notification.sections.channels.rows.smsAlerts.description",
              },
              defaultValue: false,
            },
          ],
        },
        {
          id: "focus",
          title: { key: "settingsMenu.notification.sections.focus.title" },
          description: {
            key: "settingsMenu.notification.sections.focus.description",
          },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.notification.sections.focus.rows.quietHours.label",
              },
              value: {
                key: "settingsMenu.notification.sections.focus.rows.quietHours.value",
              },
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.notification.sections.focus.rows.editSchedule.label",
              },
              icon: "schedule",
            },
          ],
        },
      ],
    },
    refer: {
      key: "refer",
      title: { key: "settingsMenu.refer.title" },
      subtitle: { key: "settingsMenu.refer.subtitle" },
      icon: "share",
      heroAccent: "#e7f7ff",
      sections: [
        {
          id: "referral-code",
          title: { key: "settingsMenu.refer.sections.referralCode.title" },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.refer.sections.referralCode.rows.code.label",
              },
              value: "DIGNEX25",
              accent: "primary",
            },
            {
              kind: "note",
              label: {
                key: "settingsMenu.refer.sections.referralCode.rows.reward.label",
              },
              description: {
                key: "settingsMenu.refer.sections.referralCode.rows.reward.description",
              },
            },
          ],
          primaryCta: {
            label: {
              key: "settingsMenu.refer.sections.referralCode.primaryCta",
            },
          },
          secondaryCta: {
            label: {
              key: "settingsMenu.refer.sections.referralCode.secondaryCta",
            },
          },
        },
        {
          id: "status",
          title: { key: "settingsMenu.refer.sections.status.title" },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.refer.sections.status.rows.invitesSent.label",
              },
              value: "12",
            },
            {
              kind: "detail",
              label: {
                key: "settingsMenu.refer.sections.status.rows.rewardsEarned.label",
              },
              value: "6 GB",
              accent: "success",
            },
          ],
        },
      ],
    },

    privacy: {
      key: "privacy",
      title: { key: "settingsMenu.privacy.title" },
      subtitle: { key: "settingsMenu.privacy.subtitle" },
      icon: "privacy-tip",
      heroAccent: "#eaf7f2",
      sections: [
        {
          id: "data",
          title: { key: "settingsMenu.privacy.sections.data.title" },
          rows: [
            {
              kind: "toggle",
              id: "activity-insights",
              label: {
                key: "settingsMenu.privacy.sections.data.rows.activityInsights.label",
              },
              description: {
                key: "settingsMenu.privacy.sections.data.rows.activityInsights.description",
              },
              defaultValue: false,
            },
            {
              kind: "toggle",
              id: "usage-metrics",
              label: {
                key: "settingsMenu.privacy.sections.data.rows.productAnalytics.label",
              },
              description: {
                key: "settingsMenu.privacy.sections.data.rows.productAnalytics.description",
              },
              defaultValue: true,
            },
          ],
        },
        {
          id: "backups",
          title: { key: "settingsMenu.privacy.sections.backups.title" },
          description: {
            key: "settingsMenu.privacy.sections.backups.description",
          },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.privacy.sections.backups.rows.autoBackup.label",
              },
              value: {
                key: "settingsMenu.privacy.sections.backups.rows.autoBackup.value",
              },
              accent: "success",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.privacy.sections.backups.rows.manageSchedule.label",
              },
              icon: "cloud-upload",
            },
          ],
        },
      ],
    },
    security: {
      key: "security",
      title: { key: "settingsMenu.security.title" },
      subtitle: { key: "settingsMenu.security.subtitle" },
      icon: "security",
      heroAccent: "#fdf2ff",
      sections: [
        {
          id: "auth",
          title: { key: "settingsMenu.security.sections.auth.title" },
          rows: [
            {
              kind: "toggle",
              id: "two-factor",
              label: {
                key: "settingsMenu.security.sections.auth.rows.twoFactor.label",
              },
              description: {
                key: "settingsMenu.security.sections.auth.rows.twoFactor.description",
              },
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "biometric",
              label: {
                key: "settingsMenu.security.sections.auth.rows.biometric.label",
              },
              description: {
                key: "settingsMenu.security.sections.auth.rows.biometric.description",
              },
              defaultValue: true,
            },
          ],
        },
        {
          id: "sessions",
          title: { key: "settingsMenu.security.sections.sessions.title" },
          rows: [
            {
              kind: "detail",
              label: {
                key: "settingsMenu.security.sections.sessions.rows.activeDevices.label",
              },
              value: "3",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.security.sections.sessions.rows.reviewActivity.label",
              },
              icon: "visibility",
            },
            {
              kind: "action",
              label: {
                key: "settingsMenu.security.sections.sessions.rows.signOutOthers.label",
              },
              icon: "logout",
            },
          ],
        },
      ],
    },
  };
