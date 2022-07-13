import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { InputField, BigInputField, theme, SmlLabel } from "../../constants";
import { Dropdown } from "react-native-element-dropdown";

export default function AddEntry1({ newEntry, setNewEntry }) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  //needs to be retireved from somewhere!
  //in entries store? fetch all entries' activities?
  const data = [
    { label: "add a new activity", value: "0" },
    { label: "art", value: "1" },
    { label: "friends", value: "2" },
    { label: "uni", value: "3" },
    { label: "academic", value: "4" },
  ];
  const [showField, setShowField] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        {/* scroll to find the date */}
        <InputField
          value={newEntry.date}
          label={"Date:"}
          onChangeText={(date) => {
            setNewEntry({ ...newEntry, date });
          }}
        />
        <SmlLabel text="Activity type: " />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            if (item.label === "add a new activity") {
              setShowField(true);
              setNewEntry({ ...newEntry, activityType: "" });
            } else {
              setNewEntry({ ...newEntry, activityType: item.label });
            }
            setIsFocus(false);
          }}
        />
        {showField && (
          <InputField
            value={newEntry.activityType}
            label={"New activity type:"}
            onChangeText={(activityType) => {
              setNewEntry({ ...newEntry, activityType });
            }}
          />
        )}
        <InputField
          value={newEntry.title}
          label={"Title:"}
          onChangeText={(title) => setNewEntry({ ...newEntry, title })}
        />

        <BigInputField
          value={newEntry.body}
          label={"Activity: "}
          onChangeText={(body) => setNewEntry({ ...newEntry, body })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderColor: theme.grey,
    borderWidth: 1,
    fontSize: 18,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
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

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
