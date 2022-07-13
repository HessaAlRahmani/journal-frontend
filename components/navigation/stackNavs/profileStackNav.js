import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import MainProfile from "../../profile/MainProfile";
import EditProfile from "../../profile/EditProfile";
import FriendsList from "../../profile/FriendsList";

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
      <Screen name="friendsList"
      component={FriendsList}
      options={{
        title: "Friends",
      }}/>
    </Navigator>
  );
}
