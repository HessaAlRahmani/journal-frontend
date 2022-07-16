import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { TopIcon } from "../../../constants";

//screens
import MainProfile from "../../profile/MainProfile";
import EditProfile from "../../profile/EditProfile";
import FriendsList from "../../profile/FriendsList";
import FriendProfile from "../../profile/FriendProfile"
import SearchFriend from "../../profile/SearchFriend";

const { Navigator, Screen } = createStackNavigator();

export default function ProfileStackNavigator({ navigation }) {
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
      {/* <Screen name="friendsList"
      component={FriendsList}
      options={{
        title: "Friends",
      }}/> */}
      <Screen name="friendProfile"
      component={FriendProfile}
      options={({ route }) => ({
        title: `${route.params.friend.username}`,
      })}/>
      {/* <Screen
        name="ViewFriends"
        component={ViewFriends}
        options={{
          title: "Friends",
          headerRight: () => (
            <TopIcon
              name={"add"}
              onPress={() => navigation.navigate("SearchFriend")}
            />
          ),
        }}
      /> */}
      <Screen
        name="SearchFriend"
        component={SearchFriend}
        options={{
          title: "Search friend",
        }}
      />
      <Screen
        name="friendsList"
        component={FriendsList}
        options={{
          title: "Friends",
          headerRight: () => (
            <TopIcon
              name={"add"}
              onPress={() => navigation.navigate("SearchFriend")}
            />
          ),
        }}
      />
    </Navigator>
  );
}
