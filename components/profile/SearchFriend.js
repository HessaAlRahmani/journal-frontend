import { View, Text, ScrollView ,Dimensions,StyleSheet} from "react-native";
import { useState } from "react";
import { InputField } from "../../constants";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";
import Friend from "./Friend";

function SearchFriend() {
  const [search, setSearch] = useState("");
  let filteredUsers;
  if (userStore.filteredUsers) {
    filteredUsers = userStore.filteredUsers.map((user) => (
      <Friend friend={user} key={user._id} />
    ));
  }

  return (
    <View style={styles.screen}>
      <InputField
        value={search}
        placeholder="Search for a friend!"
        onChangeText={(newsearch) => {
          setSearch(newsearch);
          if (userStore.filteredUsers) userStore.searchFriend(newsearch);
        }}
      />
      {userStore.filteredUsers && (
        <ScrollView>
          <View style={{ flex: 1 }}>{filteredUsers}</View>
        </ScrollView>
      )}
    </View>
  );
}
export default observer(SearchFriend);

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});