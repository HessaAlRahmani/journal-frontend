import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { theme, BoldLabel } from "../../constants";
import { AntDesign } from '@expo/vector-icons'; 
import userStore from "../../stores/usersStore";
import {observer} from "mobx-react"
import notificationsStore from "../../stores/notificationsStore";


function Friend({ friend }) {
  let found=userStore.user.friends.find((friendid)=>friendid==friend._id)
  let user=userStore.user._id;
  return (
    <View style={styles.container}>
      <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <Image
        style={styles.pfp}
        source={{
          uri: `${baseURL}${friend.profileImage}`,
        }}
        alt={"profile pic"}
      />
      <BoldLabel text={friend.username} />
      </View>
      {/* unfriend button? */}
      {found || user==friend._id?<></>: <TouchableOpacity onPress={()=>{notificationsStore.newNotification({sender:user,receiver:friend._id,type:"friendRequest"})}} style={{justifyContent:"center",left:"0%"}}><AntDesign name="adduser" size={28} color="black" /></TouchableOpacity>  }
     

    </View>
  );
}

export default observer(Friend);
const styles = StyleSheet.create({
  container: {
    height: 80,
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    margin: 10,
    padding: 15,
    backgroundColor: theme.grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
    borderRadius: 10,
  },
  pfp: {
    width: 50,
    height: 50,
    backgroundColor: theme.grey,
    borderRadius: 50 / 2,
    zIndex: 100,
    borderColor: "white",
    borderWidth: 4,
  },
});
