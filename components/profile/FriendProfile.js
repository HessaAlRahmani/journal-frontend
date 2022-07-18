import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    SafeAreaView,
  } from "react-native";
  import { Image } from "native-base";
  
  import {
    theme,
    BoldBigLabel,
    XsmlLabel,
    NumOfFriends,
    BigButton,
  } from "../../constants";
  import { observer } from "mobx-react";
  import usersStore from "../../stores/usersStore";
  import entriesStore from "../../stores/entriesStore";
  import { baseURL } from "../../instance";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import MoodsPieChart from "./MoodsPieChart";
  import { useNavigation } from "@react-navigation/native";
  import JournalEntry from "../journal/JournalItem";
import userStore from "../../stores/usersStore";
  
  
export default function FriendProfile({route}) {
    const {friend}=route.params;
    const navigation = useNavigation();
    const userfriends=userStore.users.find((user)=>user._id==friend._id).friends;
    const entries = entriesStore.entries;
    const friendEntries=entries.filter((entry)=>entry.user==friend._id && entry.isPriv==false)
    let Memories=friendEntries.map((entry) => <JournalEntry entry={entry} key={entry._id} />)

  return (
    <ScrollView style={styles.screen}>
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
            navigation.navigate("friendsList", { friends: userfriends });
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

const styles = StyleSheet.create({
  pfp: {
    width: 100,
    height: 100,
    backgroundColor: theme.grey,
    borderRadius: 100 / 2,
    zIndex: 100,
    borderColor: "white",
    borderWidth: 4,
    //   bottom:"8%"
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  bigContainer: {
    padding: 10,
    flex: 1,
    // position: "absolute",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    bottom: "15%",
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
