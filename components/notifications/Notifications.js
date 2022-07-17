import { View, Text ,StyleSheet,Dimensions} from "react-native";
import React from "react";
import notificationsStore from "../../stores/notificationsStore";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";
import FriendRequest from "./FriendRequest";

 function Notifications() {
 const user=userStore.user;
 const myNotifications=notificationsStore.notifications.filter((notification)=>notification.receiver==user._id);
 let friendReqNotifications=myNotifications.filter((notification)=>notification.type=="friendRequest").map((notification)=><FriendRequest key={notification._id} notification={notification}/>)
  return (
    <View style={styles.screen}>
      {/* <Text>Notifications</Text>
      <Text>{myNotifications.length}</Text> */}
      {friendReqNotifications}
      
    </View>
  );
}
export default observer(Notifications);
const styles = StyleSheet.create({
screen:{
  width:  Dimensions.get("window").width,
  height: Dimensions.get("window").height,
backgroundColor:"white"
}
 });