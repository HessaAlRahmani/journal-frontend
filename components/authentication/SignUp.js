import { Text, View, SafeAreaView, StyleSheet, TextInput,Dimensions } from "react-native";
import { Image } from "native-base";
import { useState } from "react";
import usersStore from "../../stores/usersStore";
import { ExtraBigButton, InputField } from "../../constants";
import { observer } from "mobx-react";

function SignUp() {
  const initialUser = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);

  const signup = async () => {
    await usersStore.signup(user);
    setUser(initialUser);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 140, height: 140, alignSelf: "center", marginTop: 50 }}
        alt="logo"
      />
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
    marginTop: 50,
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});
