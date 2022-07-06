import { Text, View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import usersStore from "../../stores/usersStore";
import { ExtraBigButton, InputField } from "../../constants";
import { observer } from "mobx-react";

function SignUp({ navigation }) {
  const initialUser = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);

  const signup = async () => {
    await usersStore.signup(user);
    setUser(initialUser);
    //navigation.navigate("BottomNav");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <InputField
          placeholder="Enter username"
          //label="username"
          value={user.username}
          onChangeText={(username) => setUser({ ...user, username })}
        />

        <InputField
          placeholder="Enter password"
          //label="password"
          secureTextEntry={true}
          value={user.password}
          onChangeText={(password) => setUser({ ...user, password })}
        />
      </View>
      <ExtraBigButton onPress={signup} text={"Sign up"} />
    </SafeAreaView>
  );
}

export default observer(SignUp);

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});
