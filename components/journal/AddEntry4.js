import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";
import { ExtraBigButton, InputLabel, SmlLabel, theme } from "../../constants";
import { MultiSelect } from "react-native-element-dropdown";
import { Switch } from "native-base";
import { baseURL } from "../../instance";
import userStore from "../../stores/usersStore";
import entriesStore from "../../stores/entriesStore";
import { FlatListSlider } from "react-native-flatlist-slider";
import ImageItem from "../journal/EntryImgItem";


export default function AddEntry4({
  newEntry,
  setNewEntry,
  navigation,
  route,
}) {
  let pics = [];
  const userfriends = userStore.users
    .find((user) => user._id == userStore.user._id)
    .friends.map((user) => ({ label: user.username, value: user._id }));

  const [isPriv, setIsPriv] = useState(false);
  const [selected, setSelected] = useState([]);
  const friends = [];
let images;
  if (route.params) {
    const { photos } = route.params;
    images = photos.map((img) => {
      return {
        image: `${baseURL}${img}`,
      };
    });
  }
  

  console.log(pics[0]);
  return (
    <View style={{ flex: 1 }}>
      <ExtraBigButton
        text="Choose pictures"
        onPress={() => {
          navigation.navigate("MyImageBrowser");
        }}
      />
      {route.params && (
         <View>
         <FlatListSlider
           data={images}
           width={390}
           height={240}
           timer={5000}
           component={<ImageItem />}
         />
       </View>
      )}

      <InputLabel text="Tag friends: " />
      <View
        style={{
          margin: 10,
          marginBottom: 30,
        }}
      >
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={userfriends}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select friends"
          searchPlaceholder="Search..."
          value={selected}
          onChange={(friend) => {
            if (friends.find((f) => f === friend)) {
              friends.splice(friends.indexOf(friend), 1);
            } else {
              friends.push(friend);
            }
            setSelected(friend);
            setNewEntry({ ...newEntry, friends: friends });
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <InputLabel text="Private" />
        <Switch
          onToggle={() => {
            setIsPriv(!isPriv);
            setNewEntry({ ...newEntry, isPriv: isPriv });
          }}
          isChecked={!isPriv}
          colorScheme="emerald"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 7,
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.lightGrey,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  flex: {
    flex: 1,
  },

  emptyStay: {
    textAlign: "center",
  },
  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
