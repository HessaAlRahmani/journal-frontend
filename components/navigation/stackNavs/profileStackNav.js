import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainProfile from "../../profile/MainProfile";
import EditProfile from "../../profile/EditProfile";
import ImageBrowserScreen from "../../imagePicker/ImageBrowserScreen";

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
        component={EditProfile}
        options={{
          title: "Edit Profile",
        }}
      />

      <Screen
        name="ImageBrowser"
        component={ImageBrowserScreen}
        optionscd
        dev={{
          title: "Selected 0 files",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
