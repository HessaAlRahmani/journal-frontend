import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainMap from "../../map/MainMap";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="MainMap"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainMap" component={MainMap} />
    </Navigator>
  );
}
