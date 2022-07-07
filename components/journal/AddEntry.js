import { View, Text } from "react-native";
import { useState } from "react";
import { InputField, BigInputField, Steps } from "../../constants";

export default function AddEntry() {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];
  const [newEntry, setNewEntry] = useState({
    date: todaysDate,
    type: "",
    title: "",
    body: "",
  });

  return (
    <View style={{ margin: 20, flex: 1 }}>
      {/* scroll to find the date */}
      <InputField
        value={newEntry.date}
        label={"Date:"}
        onChangeText={(date) => setNewEntry({ ...newEntry, date })}
      />

      {/* select activity, or add a new one */}
      <InputField
        value={newEntry.type}
        label={"Activity type:"}
        onChangeText={(type) => setNewEntry({ ...newEntry, type })}
      />

      <InputField
        value={newEntry.title}
        label={"Title:"}
        onChangeText={(title) => setNewEntry({ ...newEntry, title })}
      />

      <BigInputField
        value={newEntry.body}
        onChangeText={(body) => setNewEntry({ ...newEntry, body })}
      />
      <Steps stepNum={1} />
    </View>
  );
}
