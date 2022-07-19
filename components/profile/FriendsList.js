import FriendItem from "./FriendItem";
import { SmlLabel } from "../../constants";
import { observer } from "mobx-react";
import userStore from "../../stores/usersStore";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

function FriendsList({ route }) {
  const { userID } = route.params;

  const userfriends = userStore.users.find(
    (user) => user._id == userID
  ).friends;

  return (
    <View style={styles.screen}>
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
