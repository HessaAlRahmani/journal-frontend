import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import AgendaScreen from "../../calendar/Calender";

const { Navigator, Screen } = createStackNavigator();

export default function CalendarStack() {
  return (
    <Navigator
      initialRouteName="AgendaScreen"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="Calendar" component={AgendaScreen} />
    </Navigator>
  );
}
