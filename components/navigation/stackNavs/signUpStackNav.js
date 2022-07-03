import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import SignIn from "../../authentication/SignIn";
import SignUp from "../../authentication/SignUp";
import ImageBrowserScreen from "../../../screens/ImageBrowserScreen";

//nav
import bottomNav from "../bottomNav";

const { Navigator, Screen } = createStackNavigator();

export default function SignUpStackNavigator() {
  return (
    <Navigator initialRouteName="SignUp">
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign up",
        }}
      />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Sign in",
        }}
      />
      <Screen
        name="MainScreen"
        //it will be a stack nav? or a bottom one
        component={bottomNav}
        options={{
          title: "Journal",
        }}
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
