import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import notificationsStore from "../../stores/notificationsStore";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";
import FriendRequest from "./FriendRequest";
import Tag from "./Tag";
import { BoldBigLabel } from "../../constants";

function Notifications({ navigation }) {
  const user = userStore.user;
  const myNotifications = notificationsStore.notifications.filter(
    (notification) => notification.receiver == user._id
  );

  let friendReqNotifications = myNotifications
    .filter((notification) => notification.type == "friendRequest")
    .map((notification) => (
      <FriendRequest
        key={notification._id}
        notification={notification}
        navigation={navigation}
      />
    ));

  let tagNotifications = myNotifications
    .filter((notification) => notification.type == "tag")
    .map((notification) => (
      <Tag
        key={notification._id}
        notification={notification}
        navigation={navigation}
      />
    ));

  return (
    <ScrollView>
      <View style={styles.screen}>
        <BoldBigLabel style={styles.label} text={"Friend requests"} />
        {friendReqNotifications}
        <BoldBigLabel style={styles.label} text={"Friend tags"} />

        {tagNotifications}
      </View>
    </ScrollView>
  );
}
export default observer(Notifications);
const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  label: {
    margin: 10,
    marginTop: 20,
  },
});
