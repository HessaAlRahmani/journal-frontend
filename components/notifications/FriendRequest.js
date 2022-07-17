import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Image } from "native-base";
import { baseURL } from "../../instance";
import {BoldLabel,XsmlLabel,theme } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SmallButton } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import userStore from '../../stores/usersStore';
import notificationsStore from '../../stores/notificationsStore';

export default function FriendRequest({notification}) {
    const friend=userStore.users.find((user)=>user._id==notification.sender);
    const user=userStore.user;
  return (
    <View style={{display:"flex",flexDirection:"row",backgroundColor:"white",justifyContent:"space-between"}}>
   
       <View style={styles.container}>
      {/* <Text>FriendItem</Text> */}
      <View style={{display:"flex",flexDirection:"row"}}>
    
      <View style={styles.image}><AntDesign name="adduser" size={28} color="black" /></View>
      <View style={{marginTop:15}}>

      <BoldLabel text={`@${friend.username}`}/>
      <XsmlLabel text={`Sent you a friend request`}/>

      </View>

      </View>
      
     
    </View>
    
   
    <View style={{alignItems:"center",right:"3%",top:"5%",display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
    <SmallButton text={"accept"} onPress={()=>{notificationsStore.acceptFriend(friend._id,user._id);console.log("user"+user.username+"friend"+friend.username);notificationsStore.deleteNotification(notification._id)}}/>
    <TouchableOpacity onPress={()=>{notificationsStore.deleteNotification(notification._id)}}><Feather name="x" size={19} color={theme.darkGrey}/></TouchableOpacity>
       
    </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
    image:{
     width:60,
     height:60,
     borderRadius:100,
     margin:10,
     marginLeft:20,
     backgroundColor:theme.grey,
     justifyContent:"center",
     alignItems:"center"
 }
 ,
 username:{marginTop:10},
 displayname:{},
 container:{
     backgroundColor:"white",
     
 }
   });