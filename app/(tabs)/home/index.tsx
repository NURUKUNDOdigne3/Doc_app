import { MaterialIcons } from "@expo/vector-icons";
import { Href } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { CardHeader } from "../../components/CardHeader";
import { Header } from "../../components/Header";
import { OfflinePromoCard } from "../../components/OfflinePromoCard";
import { RecentItemsStrip } from "../../components/RecentItemsStrip";
import { SearchBar } from "../../components/SearchBar";
import { StorageUsageCard } from "../../components/StorageUsageCard";
import { TeamFoldersStrip } from "../../components/TeamFoldersStrip";
import { colors, spacing } from "../../constants/theme";

const RECENT_ITEMS = [
  {
    id: "1",
    title: "Gilley Aguilar",
    subtitle: "Deupload > Camera Upload",
    thumbnail: require("../../../assets/images/pictures/pic1.jpg"),
  },
  {
    id: "2",
    title: "Patrick Federi",
    subtitle: "Deupload > Company",
    thumbnail: require("../../../assets/images/pictures/pic2.jpg"),
  },
  {
    id: "3",
    title: "Marek Piwnicki",
    subtitle: "Deupload Photos",
    thumbnail: require("../../../assets/images/pictures/pic3.jpg"),
  },
];

const TEAM_FOLDERS = [
  { id: "team-1", name: "Documents" },
  { id: "team-2", name: "Design" },
  { id: "team-3", name: "Legals" },
  { id: "team-4", name: "Marketing" },
];

const OFFLINE_PROMO = {
  title: "Offline",
  description: "Make your most important files available without internet",
  href: "/offline" as Href,
  illustration: require("../../../assets/images/illustrations/offline.png"),
};

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Header
        title="Home"
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
        <View style={styles.headers}>
          <SearchBar containerStyle={styles.searchBar} />

          <StorageUsageCard
            userName="Digne"
            totalGb={15}
            usedGb={4.5}
            filesCount={5126}
          />
        </View>
        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons name="history" size={24} color={colors.text} />
            }
            title="Recent"
            linkHref="/activity"
          />
          <RecentItemsStrip data={RECENT_ITEMS} />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={<MaterialIcons name="groups" size={24} color={colors.text} />}
            title="Team folders"
            linkHref="/folders"
          />
          <TeamFoldersStrip data={TEAM_FOLDERS} />
        </View>

        <View style={styles.sectionCard}>
          <CardHeader
            icon={
              <MaterialIcons name="wifi-off" size={24} color={colors.text} />
            }
            title="Offline"
            linkHref="/folders"
          />
          <OfflinePromoCard
            description={OFFLINE_PROMO.description}
            illustration={OFFLINE_PROMO.illustration}
          />
        </View>

        {/* <Text style={styles.placeholder}>Home Screen content</Text> */}
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
    paddingVertical: spacing.md,
  },
  searchBar: {
    marginBottom: spacing.lg,
  },
  placeholder: {
    color: colors.text,
    fontSize: 16,
  },
  headers: {
    paddingHorizontal: spacing.sm,
  },
  sectionCard: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#F9F9FA",
    paddingHorizontal: spacing.xs,
  },
});
