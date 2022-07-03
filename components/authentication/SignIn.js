import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import usersStore from "../../stores/usersStore";

export default function SignIn({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const signin = async () => {
    await usersStore.signin(user);
    setUser({
      username: "",
      password: "",
    });
    navigation.navigate("MainScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter username"
          label="username"
          value={user.username}
          autoCapitalize="none"
          onChangeText={(username) => setUser({ ...user, username })}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter password"
          label="password"
          secureTextEntry={true}
          value={user.password}
          autoCapitalize="none"
          onChangeText={(password) => setUser({ ...user, password })}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={signin}>
        <Text style={styles.submitButtonText}> Sign in </Text>
      </TouchableOpacity>
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
  submitButton: {
    backgroundColor: "#547AA5",
    padding: 10,
    margin: 15,
    height: 40,
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
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  welcome: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 69,
    fontSize: 30,
  },
});
