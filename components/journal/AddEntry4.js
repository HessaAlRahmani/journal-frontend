import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";
import { ExtraBigButton, SmlLabel, theme } from "../../constants";
import { MultiSelect } from "react-native-element-dropdown";
import { Switch } from "native-base";

export default function AddEntry4({
  newEntry,
  setNewEntry,
  navigation,
  route,
}) {
  let pics = [];
  let sendPics = [];
  if (route.params) {
    const { photos } = route.params;
    sendPics = photos;
    pics = photos.map((pic, i) => (
      <Image
        style={{ height: 500, width: 500, borderRadius: 4 }}
        source={{ uri: pic }}
        key={i}
      />
    ));
  }
  const [isPriv, setIsPriv] = useState(false);

  const [selected, setSelected] = useState([]);
  const data = [
    { label: "maryam", value: "1" },
    { label: "aisha", value: "2" },
    { label: "doha", value: "3" },
  ];
  // const dataID = data.map((data) => data.value);
  // const friend = dataID.find((id) => 1 == id);
  // console.log(friend);

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
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder={"Select friends"}
          searchPlaceholder="Search..."
          value={selected}
          onChange={(friend) => {
            setSelected(friend);
            console.log(friend);
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
            setNewEntry({
              ...newEntry,
              attachments: sendPics,
              isPriv: isPriv,
              friends: selected,
            });
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
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
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
