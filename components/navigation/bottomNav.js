import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react-lite";
import { NavIcon } from "../../constants";

// stack navigators
import imgPickStackNav from "./stackNavs/imgPickStackNav";
import profileStackNav from "./stackNavs/profileStackNav";

import AgendaScreen from "../imagePicker/Calender";

import usersStore from "../../stores/usersStore";

const { Navigator, Screen } = createBottomTabNavigator();

function bottomTab() {
  const login = async () => {
    await usersStore.signout();
  };
  login();

  return (
    <Navigator
      initialRouteName="Calendar"
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
          alignItems: "center",
        },
      })}
    >
      <Screen
        name="Journal"
        //change to journal stack  nav
        component={profileStackNav}
        options={
          {
            //tabBarLabel: "Journal",
          }
        }
      />

      <Screen
        name="Calendar"
        component={AgendaScreen}
        options={
          {
            //tabBarLabel: "Calendar",
          }
        }
      />

      <Screen
        name="Map"
        component={profileStackNav}
        options={
          {
            //tabBarLabel: "Map",
          }
        }
      />

      <Screen
        name="Notifications"
        component={profileStackNav}
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
