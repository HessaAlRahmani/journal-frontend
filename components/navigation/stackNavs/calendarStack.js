import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import AgendaScreen from "../../calendar/Calender";
import ItemDetails from "../../journal/ItemDetails";

const { Navigator, Screen } = createStackNavigator();

export default function CalendarStack() {
  return (
    <Navigator
      initialRouteName="MainAgendaScreen"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainAgendaScreen" component={AgendaScreen} />
      <Screen name="Details" component={ItemDetails} />
    </Navigator>
  );
}
