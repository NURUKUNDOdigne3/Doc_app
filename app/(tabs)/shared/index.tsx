import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AvatarStack } from "../../components/AvatarStack";
import { CardHeader } from "../../components/CardHeader";
import { FileGridItem } from "../../components/FileGridItem";
import { FileItem } from "../../components/FileItem";
import type { FilePreviewItem } from "../../components/FilePreviewModal";
import { FilePreviewModal } from "../../components/FilePreviewModal";
import { Header } from "../../components/Header";
import { RecentItemsStrip } from "../../components/RecentItemsStrip";
import { SearchBar } from "../../components/SearchBar";
import { colors, spacing, typography } from "../../constants/theme";

type TimeKey =
  | "twoHours"
  | "yesterday"
  | "twoDays"
  | "threeDays"
  | "lastWeek"
  | "fiveDays"
  | "today";

type RecentItemDescriptor = {
  id: string;
  translationId: string;
  name: string;
  type: FilePreviewItem["type"];
  thumbnail: NonNullable<FilePreviewItem["thumbnail"]>;
  sharedBy: string;
  timeKey: TimeKey;
};

type SharedFolderDescriptor = {
  id: string;
  translationId: string;
  name: string;
  type: FilePreviewItem["type"];
  sharedBy: string;
  timeKey: TimeKey;
};

type PendingApprovalDescriptor = {
  id: string;
  translationId: string;
  name: string;
  type: FilePreviewItem["type"];
  thumbnail?: FilePreviewItem["thumbnail"];
  sharedBy: string;
  statusKey: "awaitingReview" | "requestEdit";
  metaKey: "awaitingReview" | "requestedToday";
};

const RECENT_SHARED_SOURCE: RecentItemDescriptor[] = [
  {
    id: "recent-1",
    translationId: "marketingRoadmap",
    name: "Marketing Roadmap.pdf",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
    sharedBy: "Alex",
    timeKey: "twoHours",
  },
  {
    id: "recent-2",
    translationId: "designUpdate",
    name: "Design Update.sketch",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic2.jpg"),
    sharedBy: "Lora",
    timeKey: "yesterday",
  },
  {
    id: "recent-3",
    translationId: "quarterReview",
    name: "Quarter Review.pptx",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic3.jpg"),
    sharedBy: "Team Ops",
    timeKey: "twoDays",
  },
];

const SHARED_FOLDERS_SOURCE: SharedFolderDescriptor[] = [
  {
    id: "folder-1",
    translationId: "campaignAssets",
    name: "Campaign Assets",
    type: "folder",
    sharedBy: "Marketing",
    timeKey: "threeDays",
  },
  {
    id: "folder-2",
    translationId: "brandGuidelines",
    name: "Brand Guidelines",
    type: "folder",
    sharedBy: "Design",
    timeKey: "lastWeek",
  },
  {
    id: "folder-3",
    translationId: "productSpecs",
    name: "Product Specs",
    type: "folder",
    sharedBy: "PMO",
    timeKey: "yesterday",
  },
  {
    id: "folder-4",
    translationId: "leadership",
    name: "Leadership",
    type: "folder",
    sharedBy: "Exec Team",
    timeKey: "fiveDays",
  },
];

const PENDING_APPROVALS_SOURCE: PendingApprovalDescriptor[] = [
  {
    id: "pending-1",
    translationId: "legalAgreement",
    name: "Legal agreement.pdf",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
    sharedBy: "Maya",
    statusKey: "awaitingReview",
    metaKey: "awaitingReview",
  },
  {
    id: "pending-2",
    translationId: "designSprint",
    name: "Design sprint notes",
    type: "folder",
    sharedBy: "Darius",
    statusKey: "requestEdit",
    metaKey: "requestedToday",
  },
];

const COLLAB_AVATARS = [
  require("../../../assets/images/pictures/pic1.jpg"),
  require("../../../assets/images/pictures/pic2.jpg"),
  require("../../../assets/images/pictures/pic3.jpg"),
];

export default function SharedScreen() {
  const { t } = useTranslation("shared");
  const [previewItem, setPreviewItem] = useState<FilePreviewItem | null>(null);

  const recentItems = useMemo(() => {
    return RECENT_SHARED_SOURCE.map((item) => {
      const timeLabel = t(`time.${item.timeKey}`);
      const detail = t(`sections.recent.items.${item.translationId}.detail`, {
        name: item.sharedBy,
        time: timeLabel,
      });

      const preview: FilePreviewItem = {
        id: item.id,
        name: item.name,
        type: item.type,
        detail,
        thumbnail: item.thumbnail,
        sharedBy: t("meta.sharedBy", { name: item.sharedBy }),
        updatedAt: timeLabel,
      };

      return {
        ...item,
        detail,
        preview,
      };
    });
  }, [t]);

  const sharedFolders = useMemo(() => {
    return SHARED_FOLDERS_SOURCE.map((item) => {
      const timeLabel = t(`time.${item.timeKey}`);
      const detail = t(
        `sections.sharedFolders.items.${item.translationId}.detail`,
        {
          team: item.sharedBy,
          time: timeLabel,
        }
      );

      const preview: FilePreviewItem = {
        id: item.id,
        name: item.name,
        type: item.type,
        detail,
        sharedBy: t("meta.sharedBy", { name: item.sharedBy }),
        updatedAt: timeLabel,
      };

      return {
        ...item,
        detail,
        preview,
      };
    });
  }, [t]);

  const pendingApprovals = useMemo(() => {
    return PENDING_APPROVALS_SOURCE.map((item) => {
      const statusDetail = t(`status.detail.${item.statusKey}`);
      const metaStatus = t(`status.meta.${item.metaKey}`);
      const detail = t(`sections.pending.items.${item.translationId}.detail`, {
        status: statusDetail,
        name: item.sharedBy,
      });

      const preview: FilePreviewItem = {
        id: item.id,
        name: item.name,
        type: item.type,
        detail,
        thumbnail: item.thumbnail,
        sharedBy: t("meta.sharedBy", { name: item.sharedBy }),
        updatedAt: metaStatus,
      };

      return {
        ...item,
        detail,
        preview,
      };
    });
  }, [t]);

  const closePreview = () => setPreviewItem(null);

  return (
    <View style={styles.screen}>
      <Header
        title={t("header.title")}
        actions={[
          {
            id: "filters",
            icon: <MaterialIcons name="tune" size={28} color={colors.text} />,
          },
          {
            id: "add",
            icon: (
              <MaterialIcons name="person-add" size={28} color={colors.text} />
            ),
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <SearchBar
          placeholder={t("search.placeholder")}
          containerStyle={styles.searchBar}
        />

        <View style={styles.collabCard}>
          <View style={styles.collabTextBlock}>
            <Text style={styles.collabTitle}>{t("collab.title")}</Text>
            <Text style={styles.collabSubtitle}>{t("collab.subtitle")}</Text>
            <TouchableOpacity
              style={styles.manageAccessButton}
              activeOpacity={0.85}
            >
              <Text style={styles.manageAccessLabel}>{t("collab.cta")}</Text>
            </TouchableOpacity>
          </View>
          <AvatarStack images={COLLAB_AVATARS} size={40} overlap={14} />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons name="history" size={24} color={colors.text} />
            }
            title={t("sections.recent.title")}
            linkHref="/activity"
            linkLabel={t("actions.viewAll")}
          />
          <RecentItemsStrip
            data={recentItems.map((item) => ({
              id: item.id,
              title: item.name,
              subtitle: item.detail,
              thumbnail: item.thumbnail,
              onPress: () => setPreviewItem(item.preview),
            }))}
          />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons
                name="folder-shared"
                size={24}
                color={colors.text}
              />
            }
            title={t("sections.sharedFolders.title")}
            linkHref="/folders"
            linkLabel={t("actions.viewAll")}
          />
          <FlatList
            data={sharedFolders}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridList}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <FileGridItem
                name={item.name}
                type={item.type}
                thumbnail={item.preview.thumbnail}
                onPress={() => setPreviewItem(item.preview)}
              />
            )}
          />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons
                name="assignment-turned-in"
                size={24}
                color={colors.text}
              />
            }
            title={t("sections.pending.title")}
            linkHref="/activity"
            linkLabel={t("actions.viewAll")}
          />
          {pendingApprovals.map((item) => (
            <FileItem
              key={item.id}
              name={item.name}
              detail={item.detail}
              type={item.type}
              thumbnail={item.preview.thumbnail}
              onPress={() => setPreviewItem(item.preview)}
            />
          ))}
        </View>
      </ScrollView>
      <FilePreviewModal
        visible={!!previewItem}
        item={previewItem}
        onClose={closePreview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.md,
  },
  searchBar: {
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  collabCard: {
    marginHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 20,
    backgroundColor: "#e2eeffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  collabTextBlock: {
    flex: 1,
    marginRight: spacing.md,
  },
  collabTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  collabSubtitle: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  manageAccessButton: {
    marginTop: spacing.md,
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  manageAccessLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.primary,
  },
  sectionCard: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 2,
    borderColor: "#f3f4f7",
    paddingHorizontal: spacing.sm,
  },
  gridList: {
    paddingHorizontal: spacing.xs,
  },
  gridRow: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
});
