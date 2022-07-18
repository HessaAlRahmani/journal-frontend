import { View, ScrollView, Text , RefreshControl ,Dimensions,StyleSheet} from "react-native";
import { SmlLabel, RoundButton, theme ,InputField} from "../../constants";
import entriesStore from "../../stores/entriesStore";
import userStore from "../../stores/usersStore";
import JournalEntry from "./JournalItem";
import { observer } from "mobx-react";
import { Dropdown } from "react-native-element-dropdown";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import * as React from "react";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function JournalList({ navigation }) {
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  let data = [{ label: "all", value: "0" }];

  const addTypes = entriesStore.entries
    .filter((entry) => entry.user === userStore.user._id && entry.activityType)
    .map((entry) => entry.activityType);

  for (let i = 0; i < addTypes.length; i++) {
    data.push({ label: `${addTypes[i]}`, value: `${i + 1}` });
  }

  const entries = entriesStore.filteredUserEntries.map((entry) => (
    <JournalEntry entry={entry} key={entry._id} />
  ));

  const handleSearch = (newText, label) => {
    setQuery(newText);
    entriesStore.filterUserEntries(newText, label);
  };

  // const [entries, setEntries] = useState(
  //   entriesStore.userEntries
  //     .filter((entry) => entry.date == todaysDate)
  //     .map((entry) => <JournalEntry entry={entry} key={entry._id} />)
  // );
  // let entries = entriesStore.userEntries
  //   .filter((entry) => entry.date == todaysDate)
  //   .map((entry) => <JournalEntry entry={entry} key={entry._id} />);
  // console.log(entries);
  // const handleSearch = (newText) => {
  //   setQuery(newText);
  //   if (query !== "") {
  //     entries = entriesStore.userEntries
  //       .filter((entry) =>
  //         entry.title.toLowerCase().includes(query.toLowerCase())
  //       )
  //       .map((entry) => <JournalEntry entry={entry} key={entry._id} />);
  //   }
  //   if (query == "")
  //     entries = entriesStore.userEntries
  //       .filter((entry) => entry.date == todaysDate)
  //       .map((entry) => <JournalEntry entry={entry} key={entry._id} />);
  // };

  return (
<View style={styles.screen}>
<ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <InputField
          placeholder={"Search All Memories"}
          value={query}
          onChangeText={(newText) => handleSearch(newText, value)}
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
          placeholder={!isFocus ? "Filter By Type" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
            handleSearch(query, item.label);
          }}
        />
        {/* <Text style={{ padding: 5, margin: 10, fontSize: RFValue(14) }}>
          {today.toDateString()}
        </Text> */}
        {/* <View
          style={{
            borderTopColor: theme.darkGrey,
            borderTopWidth: 1,
            margin: 20,
            marginTop: 0,
          }}
        ></View> */}
        {entries.length == 0 ? (
          <SmlLabel text="no entries yet" />
        ) : (
          <View>{entries}</View>
        )}
      </ScrollView>
      <RoundButton navigation={navigation} />
    </View>
  );
}

export default observer(JournalList);

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    flex: 1, 
    paddingTop: 10 
  },
  dropdown: {
    borderColor: theme.grey,
    borderWidth: 1,
    fontSize: 18,
    margin: 10,
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
