import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { Steps, SmallButton, theme, OneEmoji, SmlLabel } from "../../constants";
import EmojiItem from "./EmojiItem";

export default function AddEntry2({ navigation }) {
  const [newEntry, setNewEntry] = useState({
    feeling: "",
    health: "",
    weather: "",
  });

  const feelingsEmoji = [
    "lovely",
    "happy",
    "ok",
    "worried",
    "sad",
    "angry",
  ].map((emoji) => <EmojiItem emoji={emoji} />);

  const healthEmoji = [
    "good",
    "well",
    "unwell",
    "high temp",
    "really sick",
  ].map((emoji) => <EmojiItem emoji={emoji} />);

  const weatherEmoji = [
    "misty",
    "windy",
    "rainy",
    "cloudy",
    "sunny",
    "stormy",
  ].map((emoji) => <EmojiItem emoji={emoji} />);

  // const onPress = (text, label) => {
  //   setNewEntry({ ...newEntry, label: text });
  // };

  return (
    //render the emojis, save the text to the newentry.
    <ScrollView>
      <View style={{ marginTop: 20, marginBottom: 20, flex: 1 }}>
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

        <View
          style={{
            alignItems: "flex-end",
            marginRight: 25,
          }}
        >
          <SmallButton
            text={"next"}
            onPress={() => {
              console.log(newEntry);
              navigation.navigate("AddEntry3");
              //   console.log(value);
            }}
          />
        </View>
        <Steps stepNum={2} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: theme.grey,
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 7,
  },

  plusIcon: {
    width: 30,
    height: 30,
  },

  bottomTab: {
    width: 25,
    height: 25,
  },

  ExtraBigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    margin: 30,
    height: 50,
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
  ExtraBigButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  BigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 5,
    margin: 15,
    width: 113,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  input: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 60,
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

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 7,
    width: 79,
    height: 30,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },

  bigInput: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 7,

    height: 160,
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

  BigLabel: {
    fontSize: 24,
  },

  BoldBigLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },

  Label: {
    fontSize: 18,
  },

  BoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  SmlLabel: {
    marginLeft: 30,
    fontSize: 16,
    //fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 14,
    color: theme.darkGrey,
    width: "auto",
  },

  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 50,
    borderRadius: 10,
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
