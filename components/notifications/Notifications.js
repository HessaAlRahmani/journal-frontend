import { View, Text, StyleSheet, Dimensions, ScrollView ,RefreshControl} from "react-native";
import * as React from "react";
import notificationsStore from "../../stores/notificationsStore";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";
import FriendRequest from "./FriendRequest";
import Tag from "./Tag";
import { BoldBigLabel, SmlLabel } from "../../constants";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function Notifications({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


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
    tagNotifications.reverse();
  return (
    <ScrollView  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <View style={styles.screen}>
        <BoldBigLabel style={styles.label} text={"Friend requests"} />
        {friendReqNotifications.length ? (
          friendReqNotifications
        ) : (
          <SmlLabel text={"no requests"} />
        )}
        <BoldBigLabel style={styles.label} text={"Friend tags"} />
        {tagNotifications.length ? (
          tagNotifications
        ) : (
          <SmlLabel text={"no tags yet"} />
        )}
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
