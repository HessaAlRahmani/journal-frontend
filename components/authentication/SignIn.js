import { View, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { observer } from "mobx-react";
import usersStore from "../../stores/usersStore";
import {
  ExtraBigButton,
  InputField,
  SmallButton,
  SmlLabel,
} from "../../constants";

function SignIn({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const signin = async () => {
    await usersStore.signin(user);
    setUser({
      username: "",
      password: "",
    });
    navigation.navigate("BottomNav");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <InputField
          placeholder="Enter username"
          label="username"
          value={user.username}
          onChangeText={(username) => setUser({ ...user, username })}
        />

        <InputField
          placeholder="Enter password"
          label="password"
          secureTextEntry={true}
          value={user.password}
          onChangeText={(password) => setUser({ ...user, password })}
        />

        <ExtraBigButton onPress={signin} text={"Sign in"} />
        <View style={styles.signUpContainer}>
          <SmlLabel text={"Don't have an account?"} />
          <SmallButton onPress={goToSignUp} text={"Sign up!"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default observer(SignIn);

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
