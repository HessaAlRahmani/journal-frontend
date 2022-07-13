import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { XsmlLabel } from "../../constants";

export default function EmojiItem({ emoji, setNewEntry, newEntry, emojiType }) {
  const [emojiUri, setEmojiUri] = useState(
    `${baseURL}/media/emojis/${emojiType}/${emoji}_bnw.png`
  );
  const onPress = () => {
    setEmojiUri(`${baseURL}/media/emojis/${emojiType}/${emoji}.png`);
    setNewEntry({ ...newEntry, [emojiType]: emoji });
  };

  return (
    <TouchableOpacity style={styles.emoji} onPress={onPress}>
      <View>
        <Image
          style={styles.pic1}
          source={{
            uri: emojiUri,
          }}
          alt={`${emoji}`}
        />
      </View>
      <XsmlLabel text={emoji} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emoji: { margin: 6, alignItems: "center", justifyContent: "center" },
  pic1: {
    width: 30,
    marginBottom: 4,
    height: 30,
  },
});
