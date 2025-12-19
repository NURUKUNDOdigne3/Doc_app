import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { Header } from "../../components/Header";
import { HomeActionList } from "../../components/home/HomeActionList";
import { HomeCollectionList } from "../../components/home/HomeCollectionList";
import { HomeStatusList } from "../../components/home/HomeStatusList";
import { HomeStorageCard } from "../../components/home/HomeStorageCard";
import { HomeWelcomeCard } from "../../components/home/HomeWelcomeCard";
import { colors, spacing } from "../../constants/theme";

export default function HomeScreen() {
  const { t } = useTranslation(["home", "common"]);

  const totalStorageGb = 15;
  const usedStorageGb = 3.2;

  const lastActivity = useMemo(() => {
    const timeAgo = t("home:timeAgoMinutes", { count: 5 });
    return t("home:lastActivity", { count: 2, timeAgo });
  }, [t]);

  const storageBreakdown = useMemo(
    () => [
      { id: "photos", label: t("home:breakdown.photos"), amountGb: 1.5 },
      { id: "documents", label: t("home:breakdown.documents"), amountGb: 0.8 },
      { id: "videos", label: t("home:breakdown.videos"), amountGb: 0.9 },
    ],
    [t]
  );

  const quickActions = useMemo(
    () => [
      {
        id: "upload-files",
        title: t("home:quickActions.uploadFiles.title"),
        description: t("home:quickActions.uploadFiles.description"),
        icon: "file-upload" as const,
      },
      {
        id: "upload-photos",
        title: t("home:quickActions.uploadPhotos.title"),
        description: t("home:quickActions.uploadPhotos.description"),
        icon: "photo-library" as const,
      },
      {
        id: "upload-folder",
        title: t("home:quickActions.uploadFolder.title"),
        description: t("home:quickActions.uploadFolder.description"),
        icon: "create-new-folder" as const,
      },
      {
        id: "cloud-backup",
        title: t("home:quickActions.cloudBackup.title"),
        description: t("home:quickActions.cloudBackup.description"),
        icon: "cloud-done" as const,
      },
    ],
    [t]
  );

  const smartCollections = useMemo(
    () => [
      {
        id: "memories",
        title: t("home:collections.memories.title"),
        description: t("home:collections.memories.description"),
        gradient: ["#FF8A65", "#FF4081"] as [string, string],
        icon: <MaterialIcons name="collections" size={34} color="#fff" />,
      },
      {
        id: "screenshots",
        title: t("home:collections.screenshots.title"),
        description: t("home:collections.screenshots.description"),
        gradient: ["#7E57C2", "#5C6BC0"] as [string, string],
        icon: <MaterialIcons name="screenshot" size={34} color="#fff" />,
      },
      {
        id: "documents",
        title: t("home:collections.documents.title"),
        description: t("home:collections.documents.description"),
        gradient: ["#29B6F6", "#0288D1"] as [string, string],
        icon: <MaterialIcons name="picture-as-pdf" size={34} color="#fff" />,
      },
      {
        id: "large",
        title: t("home:collections.large.title"),
        description: t("home:collections.large.description"),
        gradient: ["#FFB74D", "#FB8C00"] as [string, string],
        icon: <MaterialIcons name="inventory" size={34} color="#fff" />,
      },
    ],
    [t]
  );

  const statusItems = useMemo(
    () => [
      {
        id: "deleted",
        title: t("home:statuses.deleted.title"),
        description: t("home:statuses.deleted.description"),
        icon: "delete-outline" as const,
        accentColor: "#FF5A79",
      },
      {
        id: "recently-added",
        title: t("home:statuses.recent.title"),
        description: t("home:statuses.recent.description"),
        icon: "schedule" as const,
        accentColor: "#2ECC71",
      },
    ],
    [t]
  );

  return (
    <View style={styles.screen}>
      <Header
        title={t("home:title")}
        actions={[
          {
            id: "notifications",
            icon: (
              <MaterialIcons
                name="notifications-none"
                size={30}
                color={colors.text}
              />
            ),
          },
          {
            id: "upload",
            icon: (
              <MaterialIcons name="file-upload" size={30} color={colors.text} />
            ),
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.newDashboard}>
          <HomeWelcomeCard
            userName="Digne"
            lastActivity={lastActivity}
            statusLabel={t("common:synced")}
            statusIcon="autorenew"
          />

          <HomeStorageCard
            totalGb={totalStorageGb}
            usedGb={usedStorageGb}
            breakdown={storageBreakdown}
            title={t("home:storageTitle")}
            usageLabel={t("home:storageUsage", {
              used: usedStorageGb.toFixed(1),
              total: totalStorageGb,
            })}
            upgradeLabel={`↑ ${t("home:upgrade")}`}
          />

          <HomeActionList items={quickActions} />
          <HomeCollectionList items={smartCollections} />
          <HomeStatusList items={statusItems} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  newDashboard: {
    gap: spacing.lg,
  },
  legacyHeader: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  searchBar: {
    marginBottom: spacing.lg,
  },
  placeholder: {
    color: colors.text,
    fontSize: 16,
  },
  sectionCard: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderColor: "#F0F1F5",
    paddingHorizontal: spacing.sm,
  },
});
