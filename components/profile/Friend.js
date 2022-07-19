import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { theme, XsmlLabel } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";
import notificationsStore from "../../stores/notificationsStore";

function Friend({ friend }) {
  let found = userStore.user.friends.find((friendid) => friendid == friend._id);
  let user = userStore.user._id;

  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={styles.pfp}
          source={{
            uri: `${baseURL}${friend.profileImage}`,
          }}
          alt={"profile pic"}
        />
        <View>
          <XsmlLabel text={`@${friend.username}`} />
          <XsmlLabel text={`${friend.displayname}`} />
        </View>
      </View>
      {/* unfriend button? */}
      {found || user == friend._id ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={() => {
            notificationsStore.newNotification({
              sender: user,
              receiver: friend._id,
              type: "friendRequest",
            });
          }}
          style={{ justifyContent: "center", paddingRight: 20 }}
        >
          <AntDesign name="adduser" size={28} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default observer(Friend);
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 10,
    marginLeft: 20,
    backgroundColor: theme.grey,
  },
});
