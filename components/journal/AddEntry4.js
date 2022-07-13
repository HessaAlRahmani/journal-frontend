import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";
import { ExtraBigButton, SmlLabel, theme } from "../../constants";
import { MultiSelect } from "react-native-element-dropdown";
import { Switch } from "native-base";
import { baseURL } from "../../instance";
import userStore from "../../stores/usersStore";

export default function AddEntry4({
  newEntry,
  setNewEntry,
  navigation,
  route,
}) {
  let pics = [];
  let sendPics = [];
  const userfriends = userStore.users
    .find((user) => user._id == userStore.user._id)
    .friends.map((user) => ({ label: user.username, value: user._id }));

  const [isPriv, setIsPriv] = useState(false);
  const [selected, setSelected] = useState([]);

  if (route.params) {
    const { photos } = route.params;
    sendPics = photos;

    pics = photos.map((pic, i) => (
      <Image
        style={{ height: 500, width: 500, borderRadius: 4 }}
        source={{ uri: `${baseURL}${pic}` }}
        key={i}
      />
    ));
  }

  return (
    <View style={{ flex: 1 }}>
      <ExtraBigButton
        text="Choose pictures"
        onPress={() => {
          navigation.navigate("MyImageBrowser");
        }}
      />
      {route.params && (
        <ScrollView
          style={{
            marginRight: 30,
            marginLeft: 30,
            marginBottom: 30,
            maxHeight: 500,
            backgroundColor: "white",
            borderRadius: 12,
          }}
          horizontal
        >
          {pics}
        </ScrollView>
      )}

      <SmlLabel text="Tag friends: " />
      <View
        style={{
          marginRight: 30,
          marginLeft: 30,
          marginTop: 10,
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
          placeholder={"Select friends"}
          searchPlaceholder="Search..."
          value={selected}
          onChange={(friend) => {
            setSelected(friend);
            setNewEntry({
              ...newEntry,
              friends: selected,
              attachments: sendPics,
            });
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 30,
        }}
      >
        <SmlLabel text="Private" />
        <Switch
          onToggle={() => {
            setIsPriv(!isPriv);
            setNewEntry({ ...newEntry, isPriv: isPriv });
          }}
          isChecked={!isPriv}
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
