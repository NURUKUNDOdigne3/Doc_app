import { MaterialIcons } from "@expo/vector-icons";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AvatarStack } from "../components/AvatarStack";
import { FileGridItem } from "../components/FileGridItem";
import { FileItem, FileItemType } from "../components/FileItem";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { colors, spacing, typography } from "../constants/theme";

const FOLDER_DIRECTORY: Record<
  string,
  {
    id: string;
    name: string;
    description: string;
    owner: string;
    updatedAt: string;
    size: string;
    filesCount: number;
    path: string[];
    sharedWith: ImageSourcePropType[];
    pinned?: { id: string; name: string; type: FileItemType }[];
    items: {
      id: string;
      name: string;
      detail: string;
      type: FileItemType;
      thumbnail?: ImageSourcePropType;
    }[];
  }
> = {
  "1": {
    id: "1",
    name: "Documents",
    description: "Central workspace agreements, policies, and internal docs.",
    owner: "Digne",
    updatedAt: "1 hour ago",
    size: "2.1 GB",
    filesCount: 24,
    path: ["Workspace", "Shared", "Documents"],
    sharedWith: [
      require("../../assets/images/pictures/pic1.jpg"),
      require("../../assets/images/pictures/pic2.jpg"),
      require("../../assets/images/pictures/pic3.jpg"),
    ],
    pinned: [
      { id: "5", name: "Construct contract.docx", type: "file" },
      { id: "9", name: "Press Kit", type: "folder" },
    ],
    items: [
      {
        id: "5",
        name: "Construct contract.docx",
        detail: "1.8 MB · Edited yesterday",
        type: "file",
        thumbnail: require("../../assets/images/pictures/pic1.jpg"),
      },
      {
        id: "9",
        name: "Press Kit",
        detail: "Folder · Updated 3 days ago",
        type: "folder",
      },
      {
        id: "10",
        name: "HR Policies.pdf",
        detail: "3.4 MB · Updated 4 days ago",
        type: "file",
        thumbnail: require("../../assets/images/pictures/pic2.jpg"),
      },
      {
        id: "11",
        name: "Company Handbook",
        detail: "Folder · Updated last week",
        type: "folder",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Design",
    description: "Brand guidelines, illustrations, and product UI kits.",
    owner: "Lora",
    updatedAt: "Yesterday",
    size: "7.8 GB",
    filesCount: 52,
    path: ["Workspace", "Creative", "Design"],
    sharedWith: [
      require("../../assets/images/pictures/pic1.jpg"),
      require("../../assets/images/pictures/pic2.jpg"),
      require("../../assets/images/pictures/pic3.jpg"),
    ],
    pinned: [
      { id: "12", name: "Brand Kit", type: "folder" },
      { id: "13", name: "Marketing Header.fig", type: "file" },
    ],
    items: [
      {
        id: "12",
        name: "Brand Kit",
        detail: "Folder · Updated 2 hours ago",
        type: "folder",
      },
      {
        id: "13",
        name: "Marketing Header.fig",
        detail: "26 MB · Updated today",
        type: "file",
        thumbnail: require("../../assets/images/pictures/pic3.jpg"),
      },
      {
        id: "14",
        name: "Product Illustrations",
        detail: "Folder · Updated 2 days ago",
        type: "folder",
      },
      {
        id: "15",
        name: "Hero Graphic.png",
        detail: "4.6 MB · Updated 3 days ago",
        type: "file",
        thumbnail: require("../../assets/images/pictures/pic2.jpg"),
      },
    ],
  },
};

export default function FolderDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const folder = params.id ? FOLDER_DIRECTORY[params.id] : undefined;

  const handleOpenSubFolder = (id: string) => {
    router.push(`/folder/${id}` as Href);
  };

  const handleOpenFile = (itemId: string) => {
    router.push("/document-details" as Href);
  };

  if (!folder) {
    return (
      <View style={styles.screen}>
        <Header
          title="Folder"
          actions={[
            {
              id: "close",
              icon: (
                <MaterialIcons name="close" size={28} color={colors.text} />
              ),
              onPress: () => router.back(),
            },
          ]}
        />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Folder not found</Text>
          <Text style={styles.emptySubtitle}>
            The folder you are looking for might have been moved or deleted.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.replace("/(tabs)/folders" as Href)}
          >
            <Text style={styles.primaryButtonLabel}>Return to folders</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header
        title={folder.name}
        subtitle={`Updated ${folder.updatedAt}`}
        actions={[
          {
            id: "more",
            icon: (
              <MaterialIcons name="more-vert" size={28} color={colors.text} />
            ),
          },
          {
            id: "share",
            icon: <MaterialIcons name="share" size={28} color={colors.text} />,
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="folder" size={36} color={colors.primary} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>{folder.name}</Text>
            <Text style={styles.heroMeta}>
              {folder.filesCount} items · {folder.size} · Owner {folder.owner}
            </Text>
            <Text style={styles.heroDescription}>{folder.description}</Text>
          </View>
          <View style={styles.heroSide}>
            <AvatarStack images={folder.sharedWith} size={36} overlap={14} />
            <TouchableOpacity
              style={styles.heroShareButton}
              activeOpacity={0.85}
            >
              <MaterialIcons name="add" size={20} color={colors.surface} />
              <Text style={styles.heroShareLabel}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.breadcrumbs}>
          {folder.path.map((segment, index) => {
            const isLast = index === folder.path.length - 1;
            return (
              <View key={segment} style={styles.breadcrumbSegment}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!isLast) {
                      router.push("/(tabs)/folders" as Href);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.breadcrumbLabel,
                      isLast && styles.breadcrumbActive,
                    ]}
                  >
                    {segment}
                  </Text>
                </TouchableOpacity>
                {!isLast && (
                  <MaterialIcons
                    name="chevron-right"
                    size={18}
                    color={colors.textMuted}
                  />
                )}
              </View>
            );
          })}
        </View>

        <SearchBar
          placeholder="Search within this folder"
          containerStyle={styles.folderSearch}
        />

        {folder.pinned?.length ? (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pinned</Text>
              <Text style={styles.sectionMeta}>
                {folder.pinned.length} items
              </Text>
            </View>
            <View style={styles.pinnedGrid}>
              {folder.pinned.map((item) => (
                <FileGridItem
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  onPress={() =>
                    item.type === "folder"
                      ? handleOpenSubFolder(item.id)
                      : handleOpenFile(item.id)
                  }
                />
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All items</Text>
          <Text style={styles.sectionMeta}>{folder.filesCount} total</Text>
        </View>

        <View style={styles.listContainer}>
          {folder.items.map((item) => (
            <FileItem
              key={item.id}
              name={item.name}
              detail={item.detail}
              type={item.type}
              thumbnail={item.thumbnail}
              onPress={() =>
                item.type === "folder"
                  ? handleOpenSubFolder(item.id)
                  : handleOpenFile(item.id)
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4ff",
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#edeaff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
  },
  heroMeta: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  heroDescription: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
    lineHeight: 20,
  },
  heroSide: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 96,
  },
  heroShareButton: {
    marginTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  heroShareLabel: {
    marginLeft: spacing.xs,
    fontSize: typography.body,
    color: colors.surface,
    fontWeight: "600",
  },
  breadcrumbs: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: spacing.md,
  },
  breadcrumbSegment: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.xs,
  },
  breadcrumbLabel: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  breadcrumbActive: {
    color: colors.text,
    fontWeight: "600",
  },
  folderSearch: {
    marginBottom: spacing.lg,
  },
  sectionCard: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.subheading,
    fontWeight: "700",
    color: colors.text,
  },
  sectionMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
  pinnedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listContainer: {
    marginBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.heading,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  primaryButtonLabel: {
    color: colors.surface,
    fontSize: typography.body,
    fontWeight: "600",
  },
});
