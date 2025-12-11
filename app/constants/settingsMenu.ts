import { MaterialIcons } from "@expo/vector-icons";

export type SettingsMenuKey =
  | "settings"
  | "storage"
  | "billing"
  | "notification"
  | "refer"
  | "application"
  | "privacy"
  | "security";

type AccentTone = "primary" | "success" | "warning" | "muted";

type SectionRow =
  | {
      kind: "detail";
      label: string;
      value: string;
      accent?: AccentTone;
      icon?: keyof typeof MaterialIcons.glyphMap;
    }
  | {
      kind: "toggle";
      id: string;
      label: string;
      description?: string;
      defaultValue: boolean;
    }
  | {
      kind: "progress";
      label: string;
      used: number;
      total: number;
      unit: string;
    }
  | {
      kind: "note";
      label: string;
      description: string;
    }
  | {
      kind: "action";
      label: string;
      icon: keyof typeof MaterialIcons.glyphMap;
      tone?: AccentTone;
    };

type Section = {
  id: string;
  title: string;
  description?: string;
  rows: SectionRow[];
  primaryCta?: { label: string };
  secondaryCta?: { label: string };
};

type SettingsMenuConfig = {
  key: SettingsMenuKey;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  heroAccent?: string;
  sections: Section[];
};

export const SETTINGS_MENU_CONFIG: Record<SettingsMenuKey, SettingsMenuConfig> =
  {
    settings: {
      key: "settings",
      title: "General settings",
      subtitle: "Personalize how your workspace behaves and looks.",
      icon: "tune",
      heroAccent: "#edeaff",
      sections: [
        {
          id: "profile",
          title: "Profile",
          description: "Update your personal details and workspace identity.",
          rows: [
            { kind: "detail", label: "Display name", value: "Digne Mellow" },
            { kind: "detail", label: "Email", value: "cnrukundo@gmail.com" },
            {
              kind: "toggle",
              id: "dark-mode",
              label: "Dark appearance",
              description: "Match the system theme across the app.",
              defaultValue: false,
            },
            {
              kind: "toggle",
              id: "compact-mode",
              label: "Compact layout",
              description: "Reduce spacing for dense information views.",
              defaultValue: false,
            },
          ],
        },
        {
          id: "shortcuts",
          title: "Shortcuts",
          description: "Quickly access your most-used tools.",
          rows: [
            {
              kind: "action",
              label: "Customize home cards",
              icon: "view-quilt",
              tone: "primary",
            },
            {
              kind: "action",
              label: "Keyboard shortcuts",
              icon: "keyboard-alt",
            },
            {
              kind: "action",
              label: "Notification preferences",
              icon: "notifications",
            },
          ],
        },
      ],
    },
    storage: {
      key: "storage",
      title: "Storage",
      subtitle: "Monitor usage and keep your workspace tidy.",
      icon: "inventory",
      heroAccent: "#eaf3ff",
      sections: [
        {
          id: "usage",
          title: "Usage overview",
          rows: [
            {
              kind: "progress",
              label: "Storage",
              used: 4.5,
              total: 15,
              unit: "GB",
            },
            {
              kind: "detail",
              label: "Current plan",
              value: "Free • 15 GB",
              accent: "primary",
            },
            {
              kind: "detail",
              label: "Pinned folders",
              value: "6 folders",
            },
          ],
          primaryCta: { label: "Upgrade plan" },
        },
        {
          id: "cleanup",
          title: "Smart cleanup",
          description: "Identify large and unused files to reclaim space.",
          rows: [
            { kind: "action", label: "Review large files", icon: "folder" },
            { kind: "action", label: "Empty recycle bin", icon: "delete" },
          ],
        },
      ],
    },
    billing: {
      key: "billing",
      title: "Billing",
      subtitle: "Review plan details and payment history.",
      icon: "receipt-long",
      heroAccent: "#fff3e8",
      sections: [
        {
          id: "plan",
          title: "Plan",
          rows: [
            {
              kind: "detail",
              label: "Current plan",
              value: "Standard • paid 28 Nov",
              accent: "primary",
            },
            {
              kind: "detail",
              label: "Billing cycle",
              value: "Monthly",
            },
          ],
          primaryCta: { label: "Change plan" },
        },
        {
          id: "payment",
          title: "Payment methods",
          description: "Manage how you pay for your subscription.",
          rows: [
            {
              kind: "detail",
              label: "Primary card",
              value: "Mastercard •••• 9284",
              icon: "credit-card",
            },
            { kind: "action", label: "Add backup method", icon: "add-card" },
          ],
        },
        {
          id: "invoices",
          title: "Invoices",
          rows: [
            {
              kind: "detail",
              label: "Last invoice",
              value: "Nov 2025 • Paid",
              accent: "success",
              icon: "picture-as-pdf",
            },
            { kind: "action", label: "View all invoices", icon: "description" },
          ],
        },
      ],
    },
    notification: {
      key: "notification",
      title: "Notifications",
      subtitle: "Stay in the loop without the noise.",
      icon: "notifications-none",
      heroAccent: "#f9f6ff",
      sections: [
        {
          id: "channels",
          title: "Channels",
          description:
            "Choose how we reach out when something important happens.",
          rows: [
            {
              kind: "toggle",
              id: "email-updates",
              label: "Email summaries",
              description: "Weekly overview of shared items and storage.",
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "push-updates",
              label: "Push notifications",
              description:
                "Instant updates for mentions, shares and approvals.",
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "sms-updates",
              label: "SMS alerts",
              description: "Security notifications like new logins.",
              defaultValue: false,
            },
          ],
        },
        {
          id: "focus",
          title: "Focus",
          description: "Customize quiet hours when notifications are paused.",
          rows: [
            {
              kind: "detail",
              label: "Quiet hours",
              value: "Daily • 10pm – 7am",
            },
            { kind: "action", label: "Edit schedule", icon: "schedule" },
          ],
        },
      ],
    },
    refer: {
      key: "refer",
      title: "Refer a friend",
      subtitle: "Share the workspace love and earn bonus storage.",
      icon: "share",
      heroAccent: "#e7f7ff",
      sections: [
        {
          id: "referral-code",
          title: "Your invite link",
          rows: [
            {
              kind: "detail",
              label: "Referral code",
              value: "DIGNEX25",
              accent: "primary",
            },
            {
              kind: "note",
              label: "Reward",
              description:
                "Earn 2GB bonus storage for every friend who upgrades within 30 days.",
            },
          ],
          primaryCta: { label: "Copy link" },
          secondaryCta: { label: "Share via email" },
        },
        {
          id: "status",
          title: "Progress",
          rows: [
            { kind: "detail", label: "Invites sent", value: "12" },
            {
              kind: "detail",
              label: "Rewards earned",
              value: "6 GB",
              accent: "success",
            },
          ],
        },
      ],
    },
    application: {
      key: "application",
      title: "Application",
      subtitle: "Control how the Doc app behaves on this device.",
      icon: "apps",
      heroAccent: "#f1f5ff",
      sections: [
        {
          id: "version",
          title: "Version & updates",
          rows: [
            { kind: "detail", label: "Current version", value: "3.7.2" },
            { kind: "detail", label: "Last updated", value: "Nov 29, 2025" },
            {
              kind: "action",
              label: "Check for updates",
              icon: "system-update-alt",
            },
          ],
        },
        {
          id: "defaults",
          title: "Defaults",
          description: "Choose how files open and download standards.",
          rows: [
            { kind: "detail", label: "Open files in", value: "Native viewer" },
            {
              kind: "toggle",
              id: "smart-sync",
              label: "Smart sync",
              description: "Only download files when opened on this device.",
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "auto-update",
              label: "Auto update app",
              description: "Install updates when connected to Wi-Fi.",
              defaultValue: true,
            },
          ],
        },
      ],
    },
    privacy: {
      key: "privacy",
      title: "Privacy",
      subtitle: "Control data sharing and backup preferences.",
      icon: "privacy-tip",
      heroAccent: "#eaf7f2",
      sections: [
        {
          id: "data",
          title: "Data visibility",
          rows: [
            {
              kind: "toggle",
              id: "activity-insights",
              label: "Activity insights",
              description: "Allow teammates to see when you view shared files.",
              defaultValue: false,
            },
            {
              kind: "toggle",
              id: "usage-metrics",
              label: "Product analytics",
              description:
                "Share anonymous usage data to improve the experience.",
              defaultValue: true,
            },
          ],
        },
        {
          id: "backups",
          title: "Backups",
          description: "Secure copies of your data for recovery.",
          rows: [
            {
              kind: "detail",
              label: "Automatic cloud backup",
              value: "Weekly",
              accent: "success",
            },
            {
              kind: "action",
              label: "Manage backup schedule",
              icon: "cloud-upload",
            },
          ],
        },
      ],
    },
    security: {
      key: "security",
      title: "Security",
      subtitle: "Keep your account locked down.",
      icon: "security",
      heroAccent: "#fdf2ff",
      sections: [
        {
          id: "auth",
          title: "Authentication",
          rows: [
            {
              kind: "toggle",
              id: "two-factor",
              label: "Two-factor authentication",
              description: "Require a 6-digit code on sign in.",
              defaultValue: true,
            },
            {
              kind: "toggle",
              id: "biometric",
              label: "Biometric unlock",
              description: "Use Face ID or Touch ID on this device.",
              defaultValue: true,
            },
          ],
        },
        {
          id: "sessions",
          title: "Sessions",
          rows: [
            { kind: "detail", label: "Active devices", value: "3" },
            {
              kind: "action",
              label: "Review sign-in activity",
              icon: "visibility",
            },
            { kind: "action", label: "Sign out other devices", icon: "logout" },
          ],
        },
      ],
    },
  };

export const SETTINGS_MENU_TITLES: Record<SettingsMenuKey, string> =
  Object.keys(SETTINGS_MENU_CONFIG).reduce((acc, key) => {
    const typedKey = key as SettingsMenuKey;
    acc[typedKey] = SETTINGS_MENU_CONFIG[typedKey].title;
    return acc;
  }, {} as Record<SettingsMenuKey, string>);

export type { Section, SectionRow, SettingsMenuConfig };
