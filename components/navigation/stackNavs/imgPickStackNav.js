import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import SignIn from "../../authentication/SignIn";
import SignUp from "../../authentication/SignUp";
import ImageBrowserScreen from "../../../screens/ImageBrowserScreen";
import MainScreen from "../../../screens/MainScreen";

//nav
import bottomNav from "../bottomNav";

const { Navigator, Screen } = createStackNavigator();

export default function SignUpStackNavigator() {
  return (
    <Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Screen
        name="Main"
        //need to uncomment this at some point
        options={{
          headerShown: false,
        }}
        component={MainScreen}
      />
      <Screen
        name="ImageBrowser"
        component={ImageBrowserScreen}
        optionscd
        dev={{
          title: "Selected 0 files",
        }}
      />
    </Navigator>
  );
}
