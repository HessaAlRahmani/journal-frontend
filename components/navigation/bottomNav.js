import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Fontisto } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { NavIcon } from "../../constants";

// stack navigators
import imgPickStackNav from "./stackNavs/imgPickStackNav";

const { Navigator, Screen } = createBottomTabNavigator();

function bottomTab() {
  return (
    <Navigator
      initialRouteName="Journal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Journal") {
            iconName = focused ? "journal-colored" : "journal";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar-colored" : "calendar";
          } else if (route.name === "Map") {
            iconName = focused ? "map-colored" : "map";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications-colored" : "notifications";
          } else if (route.name === "Profile") {
            iconName = focused ? "user-colored" : "user";
          }
          return <NavIcon name={iconName} size={24} color="#D1D1D1" />;
        },
        tabBarActiveTintColor: "black",
        headerTitleAlign: "center",
        tabBarLabelStyle: {
          fontWeight: "bold",
          color: "black",
          paddingBottom: 3,
        },
      })}
    >
      <Screen
        name="Journal"
        //change to journal stack  nav
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Journal",
        }}
      />

      <Screen
        name="Calendar"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Calendar",
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Map"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Map",
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Notifications"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Notifications",

          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Profile"
        component={imgPickStackNav}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Navigator>
  );
}

export default observer(bottomTab);
