import { View, Text } from 'react-native'
import React from 'react'
import FriendItem from './FriendItem'

export default function FriendsList({route}) {
    const { friends } = route.params;
    const friendslist=friends.map((friend)=><FriendItem key={friend._id}friend={friend}/>)
  return (
    <View>
    {friendslist}
    </View>
  )
}