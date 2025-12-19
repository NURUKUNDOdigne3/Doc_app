import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Header } from "@/app/components/Header";
import { FileGridItem } from "../../components/FileGridItem";
import type { FileItemType } from "../../components/FileItem";
import { FileItem } from "../../components/FileItem";
import type { FilePreviewItem } from "../../components/FilePreviewModal";
import { FilePreviewModal } from "../../components/FilePreviewModal";
import { colors, spacing } from "../../constants/theme";

type FileDescriptor = {
  id: string;
  translationId: string;
  type: FileItemType;
  thumbnail?: ImageSourcePropType;
};

type LocalizedFileItem = FileDescriptor & {
  name: string;
  detail: string;
};

const FILE_DESCRIPTORS: FileDescriptor[] = [
  {
    id: "1",
    translationId: "documents",
    type: "folder",
  },
  {
    id: "2",
    translationId: "design",
    type: "folder",
  },
  {
    id: "3",
    translationId: "development",
    type: "folder",
  },
  {
    id: "4",
    translationId: "legals",
    type: "folder",
  },
  {
    id: "5",
    translationId: "constructContract",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
  },
  {
    id: "6",
    translationId: "salarySheet",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic2.jpg"),
  },
  {
    id: "7",
    translationId: "brandAssets",
    type: "folder",
  },
  {
    id: "8",
    translationId: "projectBrief",
    type: "file",
    thumbnail: require("../../../assets/images/pictures/pic3.jpg"),
  },
];

export default function F() {
  const { t } = useTranslation("folders");
  const [isChecked, setIsChecked] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [previewItem, setPreviewItem] = useState<FilePreviewItem | null>(null);
  const router = useRouter();

  const items = useMemo<LocalizedFileItem[]>(
    () =>
      FILE_DESCRIPTORS.map((descriptor) => ({
        ...descriptor,
        name: t(`items.${descriptor.translationId}.name`),
        detail: t(`items.${descriptor.translationId}.detail`),
      })),
    [t]
  );

  const isGrid = viewMode === "grid";

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  const openFolder = (id: string) => {
    if (!id) {
      return;
    }
    router.push(`/folder/${id}` as Href);
  };

  const handlePreview = (item: LocalizedFileItem) => {
    setPreviewItem({
      id: item.id,
      name: item.name,
      type: item.type,
      detail: item.detail,
      thumbnail: item.thumbnail,
    });
  };

  const closePreview = () => setPreviewItem(null);

  const renderItem = ({ item }: { item: LocalizedFileItem }) => {
    if (isGrid) {
      return (
        <FileGridItem
          name={item.name}
          type={item.type}
          thumbnail={item.thumbnail}
          onPress={() => handlePreview(item)}
        />
      );
    }

    return (
      <FileItem
        name={item.name}
        detail={item.detail}
        type={item.type}
        thumbnail={item.thumbnail}
        onPress={() => handlePreview(item)}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        title={t("header.title")}
        actions={[
          {
            id: "notifications",
            icon: (
              <MaterialIcons
                name="cloud-upload"
                size={30}
                color={colors.text}
              />
            ),
          },
          {
            id: "upload",
            icon: <MaterialIcons name="search" size={30} color={colors.text} />,
          },
          {
            id: "new",
            icon: <MaterialIcons name="add" size={30} color={colors.text} />,
          },
        ]}
      />
      <View
        style={[
          styles.toolbarRow,
          isGrid ? styles.toolbarRowGrid : styles.toolbarRowList,
        ]}
      >
        <View style={styles.sortControl}>
          <MaterialIcons
            name="arrow-downward"
            size={18}
            color={colors.textMuted}
          />
          <Text style={styles.sortLabel}>{t("toolbar.sort")}</Text>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.selectControl}>
            <Text style={styles.selectLabel}>{t("toolbar.selectAll")}</Text>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? colors.primary : undefined}
              style={styles.selectCheckbox}
            />
          </View>
          <TouchableOpacity
            onPress={toggleViewMode}
            style={[
              styles.viewToggleButton,
              isGrid && styles.viewToggleButtonActive,
            ]}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={isGrid ? "view-list" : "grid-view"}
              size={22}
              color={isGrid ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        key={viewMode}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={isGrid ? 2 : 1}
        columnWrapperStyle={isGrid ? styles.gridRow : undefined}
        contentContainerStyle={[
          styles.content,
          isGrid ? styles.gridContent : styles.listContent,
        ]}
        ListHeaderComponentStyle={
          isGrid ? styles.gridHeader : styles.listHeader
        }
        showsVerticalScrollIndicator={false}
      />
      <FilePreviewModal
        visible={!!previewItem}
        item={previewItem}
        onClose={closePreview}
        onOpenFolder={(item) => {
          if (item.type === "folder") {
            openFolder(item.id);
          }
        }}
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
  listContent: {
    paddingHorizontal: spacing.sm,
  },
  gridContent: {
    paddingHorizontal: spacing.md,
  },
  searchBar: {
    marginBottom: spacing.lg,
  },
  placeholder: {
    color: colors.text,
    fontSize: 16,
  },
  listHeader: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  gridHeader: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  toolbarRowList: {
    paddingHorizontal: spacing.sm,
  },
  toolbarRowGrid: {
    paddingHorizontal: spacing.md,
  },
  sortControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectControl: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  selectLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginRight: spacing.xs,
  },
  selectCheckbox: {
    marginLeft: spacing.xs / 2,
  },
  viewToggleButton: {
    // marginLeft: spacing.sm,
    padding: 5,
    borderRadius: 4,
  },
  viewToggleButtonActive: {
    backgroundColor: "#edeaff",
  },
  gridRow: {
    flex: 1,
    justifyContent: "space-between",
  },
  sectionCard: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#F9F9FA",
    paddingHorizontal: spacing.xs,
  },
});
