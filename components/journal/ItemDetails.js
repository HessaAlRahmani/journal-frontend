import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { View } from "native-base";
import { FlatListSlider } from "react-native-flatlist-slider";
import { baseURL } from "../../instance";
import { Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import entriesStore from "../../stores/entriesStore";
import ImageItem from "./EntryImgItem";
import { useNavigation } from "@react-navigation/native";
import { theme, BoldBigLabel } from "../../constants";

export default function ItemDetails({ route }) {
  const navigation = useNavigation();
  const { item ,noti} = route.params;
  let entry = entriesStore.entries.find((e) => e.title == item.name);

  let tagged = entry.friends.map((friend) => {
    return (
      <TouchableOpacity>
        <Text style={styles.user}>@{friend.displayname}</Text>
      </TouchableOpacity>
    );
  });
  const images = entry.attachments.map((img) => {
    return {
      image: `${baseURL}${img}`,
    };
  });

  console.log({ entry });
  console.log("notiiifiiicaaation     ",noti);
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <FlatListSlider
          data={images}
          width={390}
          height={300}
          timer={5000}
          component={<ImageItem />}
        />
        <View style={{ paddingLeft: 30, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ alignContent: "flex-start" }}>{entry.date}</Text>
        </View>
        <View style={{ paddingLeft: 30, paddingRight: 30 }}>
          <BoldBigLabel text={entry.title} />
          <View style={styles.desc}>
            <View>{tagged}</View>
            <TouchableOpacity
              onPress={() => navigation.navigate("map", { entry: entry })}
            >
              <MaterialIcons name="location-pin" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bigInput}>
          <Text>{entry.body}</Text>
        </View>
        <View style={styles.emojiContainer}>
          <View style={styles.emoji}>
            <Text style={styles.emojiLabel}>feeling</Text>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/feeling/${entry.feeling}.png`,
              }}
              alt={`${entry.feeling}`}
            />
          </View>
          <View style={styles.emoji}>
            <Text style={styles.emojiLabel}>weather</Text>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/weather/${entry.weather}.png`,
              }}
              alt={`${entry.weather}`}
            />
          </View>
          <View style={styles.emoji}>
            <Text style={styles.emojiLabel}>health</Text>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/health/${entry.health}.png`,
              }}
              alt={`${entry.health}`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigInput: {
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 7,
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
    height: 120,
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },

  desc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
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

  emojiContainer: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 7,
    height: 70,
  },

  emojiLabel: {
    marginBottom: 5,
  },

  pic1: {
    width: 30,
    marginBottom: 4,
    height: 30,
  },

  emoji: { margin: 6, alignItems: "center", justifyContent: "center" },

  imgContainer: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    backgroundColor: theme.lightGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  user: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },

  imglist: {
    flex: 1,
    borderRadius: 10,
  },
});
