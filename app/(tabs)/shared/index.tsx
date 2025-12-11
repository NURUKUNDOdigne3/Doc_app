import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
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

const RECENT_SHARED_SOURCE: FilePreviewItem[] = [
  {
    id: "recent-1",
    name: "Marketing Roadmap.pdf",
    type: "file",
    detail: "Shared by Alex · 2h ago",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
    sharedBy: "Alex",
    updatedAt: "2h ago",
  },
  {
    id: "recent-2",
    name: "Design Update.sketch",
    type: "file",
    detail: "Shared by Lora · Yesterday",
    thumbnail: require("../../../assets/images/pictures/pic2.jpg"),
    sharedBy: "Lora",
    updatedAt: "Yesterday",
  },
  {
    id: "recent-3",
    name: "Quarter Review.pptx",
    type: "file",
    detail: "Shared by Team Ops · 2 days ago",
    thumbnail: require("../../../assets/images/pictures/pic3.jpg"),
    sharedBy: "Team Ops",
    updatedAt: "2 days ago",
  },
];

const SHARED_FOLDERS_SOURCE: FilePreviewItem[] = [
  {
    id: "folder-1",
    name: "Campaign Assets",
    type: "folder",
    detail: "Shared by Marketing • Updated 3 days ago",
    sharedBy: "Marketing",
    updatedAt: "3 days ago",
  },
  {
    id: "folder-2",
    name: "Brand Guidelines",
    type: "folder",
    detail: "Shared by Design • Updated last week",
    sharedBy: "Design",
    updatedAt: "Last week",
  },
  {
    id: "folder-3",
    name: "Product Specs",
    type: "folder",
    detail: "Shared by PMO • Updated yesterday",
    sharedBy: "PMO",
    updatedAt: "Yesterday",
  },
  {
    id: "folder-4",
    name: "Leadership",
    type: "folder",
    detail: "Shared by Exec Team • Updated 5 days ago",
    sharedBy: "Exec Team",
    updatedAt: "5 days ago",
  },
];

const PENDING_APPROVALS_SOURCE: FilePreviewItem[] = [
  {
    id: "pending-1",
    name: "Legal agreement.pdf",
    detail: "Awaiting your review · Shared by Maya",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
    sharedBy: "Maya",
    updatedAt: "Awaiting review",
  },
  {
    id: "pending-2",
    name: "Design sprint notes",
    detail: "Request to edit · Shared by Darius",
    type: "folder",
    sharedBy: "Darius",
    updatedAt: "Requested today",
  },
];

const COLLAB_AVATARS = [
  require("../../../assets/images/pictures/pic1.jpg"),
  require("../../../assets/images/pictures/pic2.jpg"),
  require("../../../assets/images/pictures/pic3.jpg"),
];

export default function SharedScreen() {
  const [previewItem, setPreviewItem] = useState<FilePreviewItem | null>(null);

  const recentStripData = useMemo(
    () =>
      RECENT_SHARED_SOURCE.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: item.detail ?? "",
        thumbnail: item.thumbnail!,
        onPress: () => setPreviewItem(item),
      })),
    []
  );

  const handlePreview = (item: FilePreviewItem) => setPreviewItem(item);
  const closePreview = () => setPreviewItem(null);

  return (
    <View style={styles.screen}>
      <Header
        title="Shared"
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
          placeholder="Search shared items"
          containerStyle={styles.searchBar}
        />

        <View style={styles.collabCard}>
          <View style={styles.collabTextBlock}>
            <Text style={styles.collabTitle}>Work together</Text>
            <Text style={styles.collabSubtitle}>
              See who recently shared files with you and manage their access in
              one place.
            </Text>
            <TouchableOpacity style={styles.manageAccessButton}>
              <Text style={styles.manageAccessLabel}>Manage access</Text>
            </TouchableOpacity>
          </View>
          <AvatarStack images={COLLAB_AVATARS} size={40} overlap={14} />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons name="history" size={24} color={colors.text} />
            }
            title="Recently shared"
            linkHref="/activity"
          />
          <RecentItemsStrip data={recentStripData} />
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
            title="Shared folders"
            linkHref="/folders"
          />
          <FlatList
            data={SHARED_FOLDERS_SOURCE}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridList}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <FileGridItem
                name={item.name}
                type={item.type}
                thumbnail={item.thumbnail}
                onPress={() => handlePreview(item)}
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
            title="Pending approvals"
            linkHref="/activity"
          />
          {PENDING_APPROVALS_SOURCE.map((item) => (
            <FileItem
              key={item.id}
              name={item.name}
              detail={item.detail ?? ""}
              type={item.type}
              thumbnail={item.thumbnail}
              onPress={() => handlePreview(item)}
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
    backgroundColor: "white",
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
    backgroundColor: "#edeaff",
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
