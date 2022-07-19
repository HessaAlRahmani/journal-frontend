import { View, TouchableOpacity, StyleSheet, ScrollView ,Dimensions} from "react-native";
import { Image } from "native-base";

import { useState } from "react";
import { theme, InputField, BigInputField, BigButton } from "../../constants";
import usersStore from "../../stores/usersStore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { baseURL } from "../../instance";
import { useToast } from "native-base";

export default function EditProfile({ navigation }) {
  const toast = useToast();
  const user = usersStore.user;
  const [updatedUser, setUpdatedUser] = useState({
    _id: user._id,
    bio: user.bio,
    displayname: user.displayname,
    headerImg: user.headerImg,
    profileImage: user.profileImage,
  });

  const [pfp, setPfp] = useState(`${baseURL}${updatedUser.profileImage}`);
  const [header, setHeader] = useState(`${baseURL}${updatedUser.headerImg}`);
  let result1;

  const openLibraryForPfp = async () => {
    result1 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });
    if (!result1.cancelled) {
      setPfp(result1.uri);
      const file = await FileSystem.uploadAsync(
        `${baseURL}/uploadImage`,
        result1.uri
      );
      setUpdatedUser({ ...updatedUser, profileImage: file.body });
    }
  };

  let result2;
  const openLibraryForHeader = async () => {
    result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [11, 4],
      quality: 0.6,
    });
    if (!result2.cancelled) {
      setHeader(result2.uri);
      const file = await FileSystem.uploadAsync(
        `${baseURL}/uploadImage`,
        result2.uri
      );

      setUpdatedUser({ ...updatedUser, headerImg: file.body });
    }
  };

  const handleSubmit = async () => {
    usersStore.updateUser(updatedUser);
    toast.show({
      title: "Profile Updated Successfully",
      placement: "top",
      bg: "green.800",
    });
    navigation.navigate("MainProfile");
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.pics}>
        <TouchableOpacity style={styles.header} onPress={openLibraryForHeader}>
          <Image
            style={styles.header}
            source={{ uri: header }}
            alt={"header"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pfp} onPress={openLibraryForPfp}>
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
            source={{ uri: pfp }}
            alt={"profile pic"}
          />
        </TouchableOpacity>
      </View>

      <InputField
        label={"Display Name:"}
        value={updatedUser.displayname}
        onChangeText={(displayname) =>
          setUpdatedUser({ ...updatedUser, displayname })
        }
      />
      <BigInputField
        label={"Bio:"}
        value={updatedUser.bio}
        onChangeText={(bio) => setUpdatedUser({ ...updatedUser, bio })}
      />
      <BigButton
        text={"Save changes"}
        onPress={handleSubmit}
        style={{ alignSelf: "flex-end" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pics: {
    justifyContent: "center",
    marginBottom: 30,
    alignItems: "center",
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  header: {
    height: 200,
    backgroundColor: theme.darkGrey,
    width: theme.windowWidth,
  },
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
