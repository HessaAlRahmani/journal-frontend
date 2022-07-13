import { View, StyleSheet } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../instance";
import { TouchableOpacity } from "react-native-gesture-handler";

function MainProfile() {
  const user = usersStore.user;
  const navigation = useNavigation();
  const userfriends=usersStore.users.find((user)=>user._id==usersStore.user._id).friends;

  return (
    <View>
      <Image
        source={{ uri: `${baseURL}${user.headerImg}` }}
        alt={"header"}
        style={styles.header}
      />
      <View style={styles.bigContainer}>
        <Image
          style={{
            width: 100,
            height: 100,
            backgroundColor: theme.grey,
            borderRadius: 100 / 2,
            zIndex: 100,
            borderColor: "white",
            borderWidth: 4,
          }}
          source={{
            uri: `${baseURL}${user.profileImage}`,
          }}
          alt={"profile pic"}
        />
        <View style={styles.smallContainer}>
          <BoldBigLabel text={user.displayname} />
          <BigButton
            text={"edit profile"}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
        </View>
        <XsmlLabel text={"@" + user.username} />
        <TouchableOpacity onPress={()=>{navigation.navigate("friendsList",{friends:userfriends})}}>
          <NumOfFriends num={user.friends?.length || 0} />
          </TouchableOpacity>
        
        <XsmlLabel text={user.bio} />
        <BigButton
          text={"Sign out"}
          onPress={() => {
            usersStore.signout();
          }}
        />
      </View>

      {/* analytics should be here */}
    </View>
  );
}

export default observer(MainProfile);

const styles = StyleSheet.create({
  bigContainer: {
    padding: 10,
    flex: 1,
    position: "absolute",
    marginTop: 70,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
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
