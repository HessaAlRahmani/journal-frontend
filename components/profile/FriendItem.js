import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image} from "native-base";
import { baseURL } from "../../instance";
import { BoldLabel, XsmlLabel } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SmallButton } from "../../constants";
import userStore from "../../stores/usersStore";
import {theme} from "../../constants";

export default function FriendItem({ friend }) {
  const navigation = useNavigation();
  const handleRemove = () => {
    userStore.handleRemove(friend);
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("friendProfile", { friend: friend })}
      >
        <View style={styles.container}>
          {/* <Text>FriendItem</Text> */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={{ uri: `${baseURL}${friend.profileImage}` }}
              alt={"image"}
              style={styles.image}
            />
            <View style={{ marginTop: 15 }}>
              <XsmlLabel text={`@${friend.username}`} />
              <XsmlLabel text={`${friend.displayname}`} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", right: "15%" }}>
        <SmallButton onPress={handleRemove} text={"remove"} style={{borderColor:theme.danger,borderWidth: 1,width:60,backgroundColor:"white"}} textStyle={{color:theme.danger}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 10,
    marginLeft: 20,
  },
  username: { marginTop: 10 },
  displayname: {},
  container: {
    backgroundColor: "white",
  },
});
