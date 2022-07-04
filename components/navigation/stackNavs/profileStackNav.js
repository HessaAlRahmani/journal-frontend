import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainProfile from "../../profile/MainProfile";

const { Navigator, Screen } = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Navigator
      initialRouteName="MainProfile"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerTitleAlign: "center",
        //headerShown: false,
      }}
    >
      <Screen
        name="MainProfile"
        component={MainProfile}
        options={{
          title: "My Profile",
          headerShown: false,
        }}
      />
      <Screen
        name="EditProfile"
        component={MainProfile}
        options={{
          title: "Edit Profile",
        }}
      />
    </Navigator>
  );
}
