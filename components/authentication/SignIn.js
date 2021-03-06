import { View, SafeAreaView, StyleSheet ,Dimensions} from "react-native";
import { Image } from "native-base";
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

    if (usersStore.user) navigation.navigate("BottomNav");
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
    marginTop: 50,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  screen:{
    width:  Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  backgroundColor:"white"
  }
});
