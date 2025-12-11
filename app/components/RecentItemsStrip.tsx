import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { spacing } from "../constants/theme";
import { RecentItemCard } from "./RecentItemCard";

type RecentItem = {
  id: string;
  thumbnail: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

type RecentItemsStripProps = {
  data: RecentItem[];
  contentContainerStyle?: ViewStyle;
};

export function RecentItemsStrip({
  data,
  contentContainerStyle,
}: RecentItemsStripProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      renderItem={({ item }) => (
        <RecentItemCard
          thumbnail={item.thumbnail}
          title={item.title}
          subtitle={item.subtitle}
          onPress={item.onPress}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: spacing.sm,
    paddingRight: spacing.lg,
  },
});
