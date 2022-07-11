import { View, ScrollView, Text } from "react-native";
import React from "react";
import { SmlLabel, RoundButton, theme } from "../../constants";
import entriesStore from "../../stores/entriesStore";
import JournalEntry from "./JournalItem";
import { observer } from "mobx-react";

function JournalList({ navigation }) {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];

  const entries = entriesStore.entries
    .filter((entry) => entry.date == todaysDate)
    .map((entry) => <JournalEntry entry={entry} key={entry._id} />);
  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <ScrollView>
        <Text style={{ padding: 5, margin: 10 }}>{today.toDateString()}</Text>
        <View
          style={{
            borderTopColor: theme.darkGrey,
            borderTopWidth: 1,
            margin: 20,
            marginTop: 0,
          }}
        ></View>
        {entriesStore.entries.length === 0 && (
          <SmlLabel text="no entries yet" />
        )}
        <View>{entries}</View>
      </ScrollView>
      <RoundButton navigation={navigation} />
    </View>
  );
}

export default observer(JournalList);