import { View, Text } from "react-native";
import React from "react";
import MainMap from "../map/MainMap";
import NewEntryMap from "../map/NewEntryMap";
import { SmallButton, Steps } from "../../constants";

export default function AddEntry3({ navigation, newEntry, setNewEntry }) {
  return (
    <View style={{ flex: 1 }}>
      <NewEntryMap newEntry={newEntry} setNewEntry={setNewEntry} />
    </View>
  );
}
