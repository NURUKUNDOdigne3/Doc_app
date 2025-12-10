import { FlatList, StyleSheet, ViewStyle } from "react-native";

import { spacing } from "../constants/theme";
import { TeamFolderCard } from "./TeamFolderCard";

type TeamFolder = {
  id: string;
  name: string;
};

type TeamFoldersStripProps = {
  data: TeamFolder[];
  contentContainerStyle?: ViewStyle;
};

export function TeamFoldersStrip({
  data,
  contentContainerStyle,
}: TeamFoldersStripProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      renderItem={({ item }) => <TeamFolderCard name={item.name} />}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: spacing.sm,
    paddingRight: spacing.lg,
  },
});
