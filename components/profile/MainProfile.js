import { View, StyleSheet } from "react-native";
import {
  theme,
  Header,
  ProfileImg,
  BoldBigLabel,
  SmallButton,
  XsmlLabel,
  NumOfFriends,
  BigButton,
} from "../../constants";
import { observer } from "mobx-react";
import usersStore from "../../stores/usersStore";
import { useNavigation } from "@react-navigation/native";

function MainProfile() {
  const user = usersStore.user;
  const navigation = useNavigation();
  return (
    <View>
      <Header height={136} />
      <View style={styles.bigContainer}>
        <ProfileImg width={100} height={100} />
        <View style={styles.smallContainer}>
          <BoldBigLabel text={user.displayname} />
          <SmallButton
            text={"edit profile"}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
        </View>
        <XsmlLabel text={"@" + user.username} />
        <NumOfFriends num={user.friends.length} />
        <XsmlLabel text={user.bio} />
        <BigButton
          text={"signout"}
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
});
