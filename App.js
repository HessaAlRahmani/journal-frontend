import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import SignUpStackNavigator from "./components/navigation/stackNavs/signUpStackNav";
import BottomNav from "./components/navigation/bottomNav";
import usersStore from "./stores/usersStore";
import { observer } from "mobx-react";
import entriesStore from "./stores/entriesStore";
import { RefreshControl ,ScrollView} from "react-native";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {
  console.disableYellowBox = true; //to remove all warnings from the app
  if (usersStore.user) {
    console.log(usersStore.user.username);
    entriesStore.fetchUserEntries();
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <NativeBaseProvider>
      
        
      <NavigationContainer>
        {usersStore.user ? <BottomNav /> : <SignUpStackNavigator />}

      </NavigationContainer>
      
    </NativeBaseProvider>
  );
};
export default observer(App);
