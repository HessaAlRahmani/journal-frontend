import { View, SafeAreaView } from "react-native";
import usersStore from "../../stores/usersStore";
import { Profile, Header } from "../../constants";
import { observer } from "mobx-react";

function MainProfile({ navigation }) {
  //while (usersStore.user === null)

  const user = usersStore.user;
  return (
    <View>
      <Header />
      <Profile
        navigation={navigation}
        displayName={user.displayname}
        username={user.username}
        num={user.friends.length}
        bio={user.bio}
        onPress={() => navigation.navigate("EditProfile")}
      />

      {/* analytics should be here */}
    </View>
  );
}

export default observer(MainProfile);
