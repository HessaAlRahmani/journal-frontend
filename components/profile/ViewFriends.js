import { View, Text } from "react-native";
import React from "react";
import userStore from "../../stores/usersStore";
import Friend from "./Friend";

export default function ViewFriends() {
  //modify container of this please
  const userfriends = userStore.users
    .find((user) => user._id == userStore.user._id)
    .friends.map((friend) => <Friend key={friend._id} friend={friend} />);

  return <View>{userfriends}</View>;
}
