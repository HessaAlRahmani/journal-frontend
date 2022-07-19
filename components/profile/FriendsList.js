import { View, FlatList } from "react-native";
import React from "react";
import FriendItem from "./FriendItem";
import { SmlLabel } from "../../constants";
import { observer } from "mobx-react";
import userStore from "../../stores/usersStore";

function FriendsList({ route }) {
  const { userID } = route.params;

  const userfriends = userStore.users.find(
    (user) => user._id == userID
  ).friends;

  return (
    <View>
      {userfriends.length ? (
        <FlatList
          data={userfriends}
          renderItem={({ item: friend }) => (
            <FriendItem key={friend._id} friend={friend} />
          )}
        ></FlatList>
      ) : (
        <SmlLabel style={{ margin: 10 }} text={"Connect with your friends"} />
      )}
    </View>
  );
}

export default observer(FriendsList);
