import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import JournalList from "../../journal/JournalList";
import AddEntry from "../../journal/AddEntry";
import ItemDetails from "../../journal/ItemDetails";

import MyImageBrowser from "../../journal/MyImageBrowser";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="MainJournal"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: true,
        headerTitleAlign: "center",
        title: "Add a memory",
        headerBackTitle: false,
        headerLeft: () => null,
      }}
    >
      <Screen
        name="MainJournal"
        component={JournalList}
        options={{ title: "Journal" }}
      />
      <Screen name="AddEntry" component={AddEntry} />
      <Screen name="MyImageBrowser" component={MyImageBrowser} />
      <Screen name="Details" component={ItemDetails} />
    </Navigator>
  );
}
