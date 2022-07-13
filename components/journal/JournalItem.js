import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { View } from "native-base";
import { theme } from "../../constants";
import { baseURL } from "../../instance";
import { Image } from "native-base";
import entriesStore from "../../stores/entriesStore";

export default function JournalItem({ entry }) {
  const [isFav, setIsFav] = useState(entry.isFav);

  const viewDetails = () => {
    console.log(`${baseURL}${entry.attachments[0]}`);

    //go to entry details
    // navigation.navigate("Detail", {
    //   itemId: trip._id,
    //   tripp: trip,
    // });
  };

  const usersTagged = entry.friends.map((friend) => (
    //add onPress => go to friend profile
    <TouchableOpacity>
      <Text style={styles.friend} key={friend._id}>
        @{friend.username}
      </Text>
    </TouchableOpacity>
  ));

  const handleFav = () => {
    setIsFav(!isFav);
    entriesStore.fav(entry._id, isFav);
  };

  return (
    <TouchableOpacity style={styles.bigContainer} onPress={viewDetails}>
      <ImageBackground
        style={styles.thumb}
        source={{ uri: `${baseURL}${entry.attachments[0]}` }}
      >
        <TouchableOpacity onPress={handleFav}>
          <Image
            style={styles.bottomTab}
            source={{
              uri: isFav
                ? `${baseURL}/media/emojis/favorite.png`
                : `${baseURL}/media/emojis/notfavorite.png`,
            }}
            alt={"not favorite"}
          />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.text}>{entry.title}</Text>

        <View style={{ flexDirection: "row" }}>{usersTagged}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    width: 35,
    height: 35,
    margin: 15,
    alignSelf: "flex-end",
  },
  bigContainer: {
    backgroundColor: theme.darkGrey,
    margin: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    overflow: "hidden",
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

  friend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginRight: 16,
  },
});
