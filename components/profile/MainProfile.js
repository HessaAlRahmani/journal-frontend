import { View} from "react-native";
import usersStore from "../../stores/usersStore";
import { BigButton, Profile, Header, XsmlLabel } from "../../constants";
import { observer } from "mobx-react";

function MainProfile({ navigation }) {
  const user = usersStore.user;
  return (
      <View>
        <Header />
        <Profile
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

export default MainProfile;
