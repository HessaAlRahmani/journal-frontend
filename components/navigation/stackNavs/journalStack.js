import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Journal from "../../journal/Journal";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="Journal"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="Journal" component={Journal} />
    </Navigator>
  );
}
