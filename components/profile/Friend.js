import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image ,useToast} from "native-base";
import { baseURL } from "../../instance";
import { theme, BoldLabel } from "../../constants";
import { AntDesign } from '@expo/vector-icons'; 
import userStore from "../../stores/usersStore";
import {observer} from "mobx-react"
import notificationsStore from "../../stores/notificationsStore";


function Friend({ friend }) {
  const toast = useToast();
  let found=userStore.user.friends.find((friendid)=>friendid==friend._id);
  let user=userStore.user._id;
  let pendingrequest=userStore.users.find((userr)=>userr._id==user).notifications.find((id)=>id==friend._id);
  
  const handleAddFriend=()=>{
    notificationsStore.newNotification({sender:user,receiver:friend._id,type:"friendRequest"});
    setAddFriendButton(<></>);
    notificationsStore.pending(user,friend._id);
    toast.show({
      title: `Friend Request Sent`,
      placement: "top",
      bg: "green.800",
    });
  }
  const [addFriendButton,setAddFriendButton]=useState(<TouchableOpacity onPress={()=>{handleAddFriend()}} style={{justifyContent:"center",left:"0%"}}><AntDesign name="adduser" size={28} color="black" /></TouchableOpacity>)
 
  
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
      {found || user==friend._id || pendingrequest ?<></>: addFriendButton  }
     

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
