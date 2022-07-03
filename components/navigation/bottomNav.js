import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Fontisto } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";

// stack navigators
import imgPickStackNav from "./stackNavs/imgPickStackNav";

const { Navigator, Screen } = createBottomTabNavigator();

function bottomTab() {
  return (
    <Navigator
      initialRouteName="Journal"
      screenOptions={{
        tabBarActiveTintColor: "black",
        // tabBarActiveBackgroundColor: "#547AA5",
        headerShown: false,
      }}
    >
      <Screen
        name="Journal"
        //change to journal stack  nav
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Journal",
          tabBarIcon: () => (
            <Fontisto name="compass" size={24} color="#D1D1D1" />
          ),
        }}
      />

      <Screen
        name="Calendar"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="book-account-outline"
              size={24}
              color="#D1D1D1"
            />
          ),
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Map"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="book-account-outline"
              size={24}
              color="#D1D1D1"
            />
          ),
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Notifications"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="book-account-outline"
              size={24}
              color="#D1D1D1"
            />
          ),
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="MainProfile"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={24} color="#D1D1D1" />
          ),
        }}
      />
    </Navigator>
  );
}

export default observer(bottomTab);
