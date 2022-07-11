import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { View } from "native-base";
import { theme } from "../../constants";

export default function JournalItem({ entry }) {
  const viewDetails = () => {
    //go to entry details
    // navigation.navigate("Detail", {
    //   itemId: trip._id,
    //   tripp: trip,
    // });
  };
  return (
    <TouchableOpacity style={styles.bigContainer} onPress={viewDetails}>
      <ImageBackground
        style={styles.thumb}
        source={{ uri: entry.attachments[0] }}
      ></ImageBackground>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{entry.title}</Text>
        <Text style={styles.text}>friends</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: theme.darkGrey,
    margin: 12,
    //padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //elevation: 7,

    overflow: "hidden",
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },

  thumb: {
    height: 200,
    width: "100%",
    borderRadius: 16,
  },

  infoContainer: {
    padding: 12,
    backgroundColor: "#2C2C2Cc0",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
