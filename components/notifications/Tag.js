import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { BoldLabel, XsmlLabel, theme } from "../../constants";
import userStore from "../../stores/usersStore";
import entriesStore from "../../stores/entriesStore";
import notificationsStore from "../../stores/notificationsStore";
import {observer} from "mobx-react"

function Tag({ notification, navigation }) {
  const entry = entriesStore.entries.find(
    (entry) => entry._id === notification.entry
  );

  console.log("entry noti",notification);
  const item = { name: entry.title };
  const friend = userStore.users.find(
    (user) => user._id == notification.sender
  );

  return (
   
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            {notification.open?<></>: <View style={{width:10,height:10,backgroundColor:theme.primary,borderRadius:100,top:"50%",left:"530%"}}></View>}
            <TouchableOpacity
      onPress={() => {
        if(notification.open==false){notificationsStore.openNotification(notification._id)}
        navigation.navigate("friendProfile", { friend:friend});
      }}
    >
          <Image
            style={styles.image}
            source={{
              uri: `${baseURL}${friend.profileImage}`,
            }}
            alt={"profile pic"}
          /></TouchableOpacity></View>
          <TouchableOpacity
      onPress={() => {
        if(notification.open==false){notificationsStore.openNotification(notification._id)}
        navigation.navigate("Details", { item: item ,noti:notification});
      }}
    >
          <View>
            <BoldLabel text={`@${friend.username}`} />
            <XsmlLabel text={"Tagged you in a memory!"} />
          </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            right: "3%",
            top: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        ></View>
      </View>
  );
}
export default observer(Tag);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
    marginLeft: 10,
    backgroundColor: theme.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  username: { marginTop: 10 },
  displayname: {},
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});
