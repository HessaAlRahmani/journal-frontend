import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import SignUpStackNavigator from "./components/navigation/stackNavs/signUpStackNav";
import BottomNav from "./components/navigation/bottomNav";
import usersStore from "./stores/usersStore";
import { observer } from "mobx-react";

const App = () => {
  //if (usersStore.user) console.log(usersStore.user.username);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {usersStore.user ? <BottomNav /> : <SignUpStackNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default observer(App);
