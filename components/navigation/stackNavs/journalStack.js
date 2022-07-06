import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Journal from "../../journal/Journal";
import AddEntry from "../../journal/AddEntry";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="MainJournal"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainJournal" component={Journal} />
      <Screen
        name="AddEntry"
        component={AddEntry}
        screenOptions={{ tabBarLabel: "Add a memory" }}
      />
    </Navigator>
  );
}
