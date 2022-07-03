import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import Main from "./screens/MainScreen";
import ImageBrowser from "./screens/ImageBrowserScreen";
import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { configure } from "mobx";
import SignUpStackNavigator from "./components/navigation/stackNavs/signUpStackNav";
import {Steps,ProfileImg} from "./constants";


export default () => {
  let stepnum=5;
  // let width=15;
  // let height=15;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SignUpStackNavigator />
        <Steps stepnum={stepnum}/>
        <ProfileImg width={100} height={100}/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
