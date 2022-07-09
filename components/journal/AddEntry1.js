import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import {
  InputField,
  BigInputField,
  Steps,
  SmallButton,
  theme,
} from "../../constants";
import { Dropdown } from "react-native-element-dropdown";

export default function AddEntry1({ navigation }) {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];

  const [newEntry, setNewEntry] = useState({
    date: todaysDate,
    activityType: null,
    title: "",
    body: "",
  });

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "art", value: "1" },
    { label: "friends", value: "2" },
    { label: "uni", value: "3" },
    { label: "academic", value: "4" },
  ];

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
            //console.log(item);
            setValue(item.value);
            setNewEntry({ ...newEntry, activityType: item.label });
            //console.log(newEntry.activityType);
            setIsFocus(false);
          }}
          //   renderLeftIcon={() => (
          //   )}
        />

        {/* 
        <InputField
          value={newEntry.activityType}
          label={"Activity type:"}
          onChangeText={(type) => setNewEntry({ ...newEntry, type })}
        /> */}

        <InputField
          value={newEntry.title}
          label={"Title:"}
          onChangeText={(title) => setNewEntry({ ...newEntry, title })}
        />

        <BigInputField
          value={newEntry.body}
          onChangeText={(body) => setNewEntry({ ...newEntry, body })}
        />
      </View>

      <View
        style={{
          alignItems: "flex-end",
          marginRight: 25,
        }}
      >
        <SmallButton
          text={"next"}
          onPress={() => {
            console.log(newEntry);
            navigation.navigate("AddEntry2");
            //   console.log(value);
          }}
        />
      </View>
      <Steps stepNum={1} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: theme.grey,
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 7,
  },

  plusIcon: {
    width: 30,
    height: 30,
  },

  bottomTab: {
    width: 25,
    height: 25,
  },

  ExtraBigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    margin: 30,
    height: 50,
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
  ExtraBigButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  BigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 5,
    margin: 15,
    width: 113,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 50,
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

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 7,
    width: 79,
    height: 30,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },

  bigInput: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 7,

    height: 160,
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

  BigLabel: {
    fontSize: 24,
  },

  BoldBigLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },

  Label: {
    fontSize: 18,
  },

  BoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  SmlLabel: {
    marginLeft: 30,
    fontSize: 16,
    //fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 14,
    color: theme.darkGrey,
    width: "auto",
  },

  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
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
