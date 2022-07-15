import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Image } from "native-base";
import { baseURL } from "../../instance";
import {BoldLabel,XsmlLabel } from '../../constants';

export default function FriendItem({friend}) {
  return (
    <View style={styles.container}>
      {/* <Text>FriendItem</Text> */}
      <View style={{display:"flex",flexDirection:"row"}}>
      <Image
        source={{ uri: `${baseURL}${friend.profileImage}` }}
        alt={"image"}
        style={styles.image}
      />
      <View style={{marginTop:15}}>

      <XsmlLabel text={`@${friend.username}`}/>
      <XsmlLabel text={`${friend.displayname}`}/>

      </View>
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
    marginLeft:20
}
,
username:{marginTop:10},
displayname:{},
container:{
    backgroundColor:"white",
    
}
  });