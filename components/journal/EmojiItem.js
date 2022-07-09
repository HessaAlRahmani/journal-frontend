import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

//emojis store???
export default function EmojiItem({ emoji }) {
  const onPress = () => {
    console.log("pressed on " + emoji);
  };
  return (
    <TouchableOpacity style={styles.emoji} onPress={onPress}>
      {/* <Image
        style={styles.plusIcon}
        source={require("./assets/plus.png")}
        alt={"plus button"}
      /> */}
      <Text>{emoji}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emoji: { margin: 6 },
});
