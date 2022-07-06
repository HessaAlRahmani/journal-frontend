import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Notifications from "../../notifications/Notifications";

const { Navigator, Screen } = createStackNavigator();

export default function NotificationsStack() {
  return (
    <Navigator
      initialRouteName="Notifications"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="Notifications" component={Notifications} />
    </Navigator>
  );
}
