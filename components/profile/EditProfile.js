import { View, Text } from "react-native";
import React from "react";

export default function EditProfile() {
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

  return (
    <View>
      <TouchableOpacity onPress={openLibrary}></TouchableOpacity>
      <Text>EditProfile</Text>
    </View>
  );
}
