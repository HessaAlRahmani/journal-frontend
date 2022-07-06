import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Journal from "../../journal/Journal";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="MainJournal"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainJournal" component={Journal} />
    </Navigator>
  );
}
