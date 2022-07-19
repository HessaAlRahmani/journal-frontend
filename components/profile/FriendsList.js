import { View, Text ,FlatList,Dimensions,StyleSheet} from 'react-native'
import React from 'react'
import FriendItem from './FriendItem'

export default function FriendsList({route}) {
    const { friends } = route.params;
    const friendslist=friends.map((friend)=><FriendItem key={friend._id}friend={friend}/>)
  return (
    <View style={styles.screen}>
    {/* {friendslist} */}
    <FlatList 
        data={friends}
        renderItem={({ item: friend}) => (<FriendItem key={friend._id}friend={friend}/>)}>
          </FlatList>
    </View>
  )
}
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