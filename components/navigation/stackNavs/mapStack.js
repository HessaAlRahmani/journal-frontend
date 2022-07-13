import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainMap from "../../map/MainMap";
import PinEntries from "../../map/PinEntries";

const { Navigator, Screen } = createStackNavigator();

export default function JournalStack() {
  return (
    <Navigator
      initialRouteName="MainMap"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainMap" component={MainMap} options={{headerShown: false}} />
      <Screen name="PinEntries"  component={PinEntries} options={{title:"Memories"}}/>
    </Navigator>
  );
}
