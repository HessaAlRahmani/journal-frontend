import { View, ScrollView, StyleSheet, Button } from "react-native";
import { theme, SmlLabel } from "../../constants";
import EmojiItem from "./EmojiItem";

export default function AddEntry2({ newEntry, setNewEntry }) {
  const feelingsEmoji = [
    "lovely",
    "happy",
    "ok",
    "worried",
    "sad",
    "angry",
  ].map((emoji) => (
    <EmojiItem
      key={emoji}
      emojiType={"feeling"}
      emoji={emoji}
      setNewEntry={setNewEntry}
      newEntry={newEntry}
    />
  ));

  const healthEmoji = [
    "good",
    "recovering",
    "unwell",
    "highTemp",
    "reallySick",
  ].map((emoji) => (
    <EmojiItem
      key={emoji}
      emoji={emoji}
      setNewEntry={setNewEntry}
      newEntry={newEntry}
      emojiType={"health"}
    />
  ));

  const weatherEmoji = [
    "misty",
    "windy",
    "rainy",
    "cloudy",
    "sunny",
    "stormy",
  ].map((emoji) => (
    <EmojiItem
      key={emoji}
      emoji={emoji}
      setNewEntry={setNewEntry}
      newEntry={newEntry}
      emojiType={"weather"}
    />
  ));

  return (
    <ScrollView style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
      <View>
        <SmlLabel text={"Feeling"} />
        <View style={styles.input}>{feelingsEmoji}</View>
      </View>

      <View>
        <SmlLabel text={"Health"} />
        <View style={styles.input}>{healthEmoji}</View>
      </View>

      <View>
        <SmlLabel text={"Weather"} />
        <View style={styles.input}>{weatherEmoji}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 70,
    backgroundColor: theme.lightGrey,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
});
