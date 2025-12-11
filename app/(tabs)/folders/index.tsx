import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Header } from "@/app/components/Header";
import { useState } from "react";
import { FileItem } from "../../components/FileItem";
import { colors, spacing } from "../../constants/theme";

const FILE_ITEMS = [
  {
    id: "1",
    name: "Gilley Aguilar",
    detail: "3 MB · 11 Jun. 2025, 07:06",
    type: "file" as const,
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
  },
  {
    id: "2",
    name: "Project Brief.pdf",
    detail: "1.2 MB · 09 Jun. 2025, 14:32",
    type: "file" as const,
    thumbnail: require("../../../assets/images/pictures/pic2.jpg"),
  },
  {
    id: "3",
    name: "Marketing",
    detail: "Shared folder · Updated yesterday",
    type: "folder" as const,
  },
  {
    id: "4",
    name: "Design Assets",
    detail: "Folder · Updated 2 days ago",
    type: "folder" as const,
  },
  {
    id: "5",
    name: "Quarterly Report.pptx",
    detail: "8.4 MB · 03 Jun. 2025, 09:18",
    type: "file" as const,
    thumbnail: require("../../../assets/images/pictures/pic3.jpg"),
  },
];

export default function F() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.screen}>
      <Header
        title="Files"
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
      <View style={styles.toolbarRow}>
            <View style={styles.sortControl}>
              <MaterialIcons
                name="arrow-downward"
                size={18}
                color={colors.textMuted}
              />
              <Text style={styles.sortLabel}>Last modified</Text>
            </View>

            <View style={styles.actionsRow}>
              <View style={styles.selectControl}>
                <Text style={styles.selectLabel}>Select all</Text>
                <Checkbox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? colors.primary : undefined}
                />
              </View>
              <MaterialIcons
                name="grid-view"
                size={22}
                color={colors.textMuted}
                style={styles.viewToggleIcon}
              />
            </View>
          </View>
      <FlatList
        data={FILE_ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <FileItem
            name={item.name}
            detail={item.detail}
            type={item.type}
            thumbnail={item.thumbnail}
          />
        )}
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
    paddingHorizontal: spacing.sm,
  },
  searchBar: {
    marginBottom: spacing.lg,
  },
  placeholder: {
    color: colors.text,
    fontSize: 16,
  },
  toolbarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  sortControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  sortLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  selectControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  selectLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  viewToggleIcon: {
    marginRight: spacing.xs,
  },
  sectionCard: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#F9F9FA",
    paddingHorizontal: spacing.xs,
  },
});
