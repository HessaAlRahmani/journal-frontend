import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavIcon } from "../../constants";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Text } from "react-native";
// stack navigators
import CalendarStack from "./stackNavs/calendarStack";
import profileStackNav from "./stackNavs/profileStackNav";
import MainMap from "../map/MainMap";
import JournalStack from "./stackNavs/journalStack";
import NotificationsStack from "./stackNavs/notificationsStack";
import mapStack from "./stackNavs/mapStack";

const { Navigator, Screen } = createBottomTabNavigator();

function bottomTab() {
  return (
    <Navigator
      initialRouteName="Journal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName = route.name.toLowerCase();
          const fullIconName = focused ? `${iconName}-colored` : `${iconName}`;
          return <NavIcon name={fullIconName} />;
        },
        tabBarActiveTintColor: "black",
        headerTitleAlign: "center",
        tabBarLabelStyle: {
          fontWeight: "bold",
          color: "black",
          fontSize: RFValue(10),
        },
        tabBarStyle: {
          height: 80,
        },
      })}
    >
      <Screen
        name="Journal"
        component={JournalStack}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Calendar"
        component={CalendarStack}
        options={{ headerShown: false }}
      />

      <Screen
        name="Map"
        component={mapStack}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          tabBarLabel: "Notifications",
          //tabBarBadge: 3,
        }}
      />

      <Screen
        name="Profile"
        component={profileStackNav}
        options={{
          //tabBarLabel: "Profile",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

export default observer(bottomTab);
