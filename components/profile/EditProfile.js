import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "native-base";

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
    //profileImage: user.profileImage,
  });
  const [toStore, setToStore] = useState(updatedUser.profileImage);
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
      setPfp(result.uri);
      const file = await FileSystem.uploadAsync(
        `${baseURL}uploadImage`,
        result.uri
      );
      console.log(file);
      setToStore(file.body);
      console.log("uri in openLibrary: ", toStore);
    }
  };

  const handleSubmit = async () => {
    //console.log("img uri: " + pfp);
    usersStore.updateUser(updatedUser, toStore);
    console.log("user after update: ", usersStore.user.profileImage);
    navigation.navigate("MainProfile");
    //toaaaaaaaast
  };

  return (
    <ScrollView>
      <View style={styles.pics}>
        <TouchableOpacity style={styles.header}>
          <Header height={200} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pfp} onPress={openLibrary}>
          {/* <ProfileImg width={130} height={130} pfp={pfp} /> */}
          <Image
            style={{
              width: 130,
              height: 130,
              backgroundColor: theme.grey,
              borderRadius: 130 / 2,
              zIndex: 100,
              borderColor: "white",
              borderWidth: 4,
            }}
            source={{
              uri: pfp,
            }}
            alt={"profile pic"}
          />
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
