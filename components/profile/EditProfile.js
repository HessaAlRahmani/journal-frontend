import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import {
  theme,
  Header,
  ProfileImg,
  InputField,
  BigInputField,
  BigButton,
} from "../../constants";
import usersStore from "../../stores/usersStore";

export default function EditProfile({ navigation }) {
  const user = usersStore.user;
  const [updatedUser, setUpdatedUser] = useState(user);

  const [img, SetImg] = useState("");
  const openLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      SetImg(result.uri);
      console.log(img);
      usersStore.image(img);
    }
  };

  const handleSubmit = () => {
    usersStore.updateUser(updatedUser);
    navigation.navigate("MainProfile");
    //toaaaaaaaast
    //go to profile
  };

  return (
    <ScrollView>
      <View style={styles.pics}>
        <TouchableOpacity style={styles.header}>
          <Header height={200} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pfp} onPress={openLibrary}>
          <ProfileImg width={130} height={130} />
        </TouchableOpacity>
      </View>

      {/* <InputField
        label={"username"}
        value={updatedUser.username}
        onChangeText={(username) =>
          setUpdatedUser({ ...updatedUser, username })
        }
      /> */}
      <InputField
        label={"displayname"}
        value={updatedUser.displayname}
        onChangeText={(displayname) =>
          setUpdatedUser({ ...updatedUser, displayname })
        }
      />
      <BigInputField
        label={"bio"}
        value={updatedUser.bio}
        onChangeText={(bio) => setUpdatedUser({ ...updatedUser, bio })}
      />
      <BigButton text={"Save changes"} onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pics: {
    justifyContent: "center",
    marginBottom: 30,
    alignItems: "center",
  },
  header: {},
  pfp: {
    position: "absolute",
  },

  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: theme.windowWidth,
  },
});
