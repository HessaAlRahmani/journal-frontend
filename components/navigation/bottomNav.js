import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
          const iconName = route.name.toLowerCase();
          const fullIconName = focused ? `${iconName}-colored` : `${iconName}`;
          return <NavIcon name={fullIconName} />;
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
