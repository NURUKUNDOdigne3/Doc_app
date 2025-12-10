import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1,}}>
      {/* <Image source="../images/fav.png" style={styles.logo} /> */}
      <Image source={require("../assets/images/fav.png")} style={styles.logo} />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 118,
    height: 118,
  }
})