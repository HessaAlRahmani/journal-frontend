import { View, StyleSheet, ScrollView } from "react-native";
import { Image } from "native-base";
import { theme, BoldBigLabel, XsmlLabel, NumOfFriends } from "../../constants";
import entriesStore from "../../stores/entriesStore";
import { baseURL } from "../../instance";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import JournalEntry from "../journal/JournalItem";
import userStore from "../../stores/usersStore";
import { observer } from "mobx-react";

function FriendProfile({ route }) {
  const { friend } = route.params;
  const navigation = useNavigation();
  const entries = entriesStore.entries;
  const friendEntries = entries.filter((entrie) => entrie.user == friend._id);
  let Memories = friendEntries.map((entry) => (
    <JournalEntry entry={entry} key={entry._id} />
  ));

  return (
    <ScrollView>
      <Image
        source={{ uri: `${baseURL}${friend.headerImg}` }}
        alt={"header"}
        style={styles.header}
      />
      <View style={styles.bigContainer}>
        <Image
          style={styles.pfp}
          source={{
            uri: `${baseURL}${friend.profileImage}`,
          }}
          alt={"profile pic"}
        />
        <View style={styles.smallContainer}>
          <BoldBigLabel text={friend.displayname} />
        </View>
        <XsmlLabel text={"@" + friend.username} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("friendsList", { userID: friend._id });
          }}
        >
          <NumOfFriends num={friend.friends?.length || 0} />
        </TouchableOpacity>

        <XsmlLabel text={friend.bio} />
        {Memories}
      </View>
    </ScrollView>
  );
}
export default observer(FriendProfile);

const styles = StyleSheet.create({
  pfp: {
    width: 100,
    height: 100,
    backgroundColor: theme.grey,
    borderRadius: 100 / 2,
    borderColor: "white",
    borderWidth: 4,
  },
  bigContainer: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    bottom: 60,
  },

  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: theme.windowWidth - 40,
  },
  header: {
    height: 136,
    backgroundColor: theme.darkGrey,
    width: theme.windowWidth,
  },
});
