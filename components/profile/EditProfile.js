import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  theme,
  Header,
  ProfileImg,
  InputField,
  BigInputField,
  BigButton,
} from "../../constants";
import usersStore from "../../stores/usersStore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { baseURL } from "../../instance";

export default function EditProfile({ navigation }) {
  const user = usersStore.user;
  const [updatedUser, setUpdatedUser] = useState({
    _id: user._id,
    bio: user.bio,
    displayname: user.displayname,
    headerImg: user.headerImg,
    profileImage: user.profileImage,
  });
  const [pfp, setPfp] = useState(updatedUser.profileImage);
  let result;

  const openLibrary = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //.All for the other one
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      const file = await FileSystem.uploadAsync(
        `${baseURL}uploadImage`,
        result.uri
      );

      setPfp(file.body);
      console.log("done", file.body);
    }
  };

  const handleSubmit = async () => {
    //console.log("img uri: " + pfp);
    usersStore.updateUser(updatedUser, pfp);

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
          <ProfileImg width={130} height={130} pfp={pfp} />
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
