import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Notifications from "../../notifications/Notifications";
import ItemDetails from "../../journal/ItemDetails";
import FriendProfile from "../../profile/FriendProfile";

const { Navigator, Screen } = createStackNavigator();

export default function NotificationsStack() {
  return (
    <Navigator
      initialRouteName="MainNotifications"
      screenOptions={{
        tabBarActiveTintColor: "black",
        // headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Screen name="MainNotifications"
       component={Notifications} 
       options={() => ({
        title: `Notifications`,
      })}/>
      <Screen name="Details" component={ItemDetails} />
      <Screen
        name="friendProfile"
        component={FriendProfile}
        options={({ route }) => ({
          title: `${route.params.friend.username}`,
        })}
      />
    </Navigator>
  );
}
