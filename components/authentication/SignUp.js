import { Text, View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import usersStore from "../../stores/usersStore";
import { ExtraBigButton, SmallButton, InputField } from "../../constants";

export default function SignUp({ navigation }) {
  const initialUser = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);

  const signup = async () => {
    await usersStore.signup(user);
    setUser(initialUser);
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
      </View>
      <ExtraBigButton onPress={signup} text={"Sign up"} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ width: "auto" }}>already have an account?</Text>
        <SmallButton
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          text={"Sign in!"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    width: "100%",
  },

  input: {
    margin: 15,
    padding: 7,
    height: 40,
    borderColor: "#D1D1D1",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  welcome: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 69,
    fontSize: 30,
  },
});
