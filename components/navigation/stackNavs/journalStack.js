import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Journal from "../../journal/Journal";
import AddEntry1 from "../../journal/AddEntry1";
import AddEntry2 from "../../journal/AddEntry2";
import AddEntry3 from "../../journal/AddEntry3";

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
        name="AddEntry1"
        component={AddEntry1}
        screenOptions={{ tabBarLabel: "Add a memory" }}
      />
      <Screen
        name="AddEntry2"
        component={AddEntry2}
        screenOptions={{ tabBarLabel: "Add a memory" }}
      />
      <Screen
        name="AddEntry3"
        component={AddEntry3}
        screenOptions={{ tabBarLabel: "Add a memory" }}
      />
    </Navigator>
  );
}
