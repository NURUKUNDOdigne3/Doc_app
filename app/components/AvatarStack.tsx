import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import { colors } from "../constants/theme";

type AvatarStackProps = {
  images: ImageSourcePropType[];
  size?: number;
  overlap?: number;
};

export function AvatarStack({
  images,
  size = 28,
  overlap = 10,
}: AvatarStackProps) {
  if (!images?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {images.map((source, index) => (
        <Image
          key={index}
          source={source}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: index === 0 ? 0 : -overlap,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.surface,
  },
});
