import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainMap from "../../map/MainMap";
import PinEntries from "../../map/PinEntries";
import ItemDetails from "../../journal/ItemDetails";

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
      <Screen name="Details" component={ItemDetails} />
    </Navigator>
  );
}
