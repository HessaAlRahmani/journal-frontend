import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavIcon } from "../../constants";

// stack navigators
import CalendarStack from "./stackNavs/calendarStack";
import profileStackNav from "./stackNavs/profileStackNav";
import MainMap from "../map/MainMap";
import JournalStack from "./stackNavs/journalStack";
import NotificationsStack from "./stackNavs/notificationsStack";

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
        },
        tabBarStyle: {
          height: 80,
        },
      })}
    >
      <Screen
        name="Journal"
        //change to journal stack  nav
        component={JournalStack}
      />

      <Screen name="Calendar" component={CalendarStack} />

      <Screen
        name="Map"
        component={MainMap}
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
