import { View, SafeAreaView } from "react-native";
import { Profile, Header ,BigButton} from "../../constants";
import { observer } from "mobx-react";
import usersStore from "../../stores/usersStore";
import { useNavigation } from "@react-navigation/native";

function MainProfile() {
  const user = usersStore.user;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
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
    </SafeAreaView>

  );
}

export default observer(MainProfile);
