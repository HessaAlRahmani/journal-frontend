import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Image } from "native-base";
import { baseURL } from "./instance";

export const theme = {
  lightGrey: "#F6F6F6",
  grey: "#D9D9D9",
  darkGrey: "#696969",
  primary: "yellow",
  danger: "#EB7070",
  success: "#2FA83B",
  windowWidth: Dimensions.get("window").width,
};

export const NavIcon = ({ name }) => {
  return (
    <Image
      style={styles.bottomTab}
      source={{
        uri: `${baseURL}media/BottomNavIcons/${name}.png`,
      }}
      alt={`${name}`}
    />
  );
};

export const ExtraBigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.ExtraBigButton} onPress={onPress}>
      <Text style={styles.ExtraBigButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const BigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.BigButton} onPress={onPress}>
      <Text style={styles.BigButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SmallButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.SmallButton} onPress={onPress}>
      <Text style={styles.SmallButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const RoundButton = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("AddEntry");
  };
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Image
        style={styles.plusIcon}
        source={require("./assets/plus.png")}
        alt={"plus button"}
      />
    </TouchableOpacity>
  );
};

export const Dot = ({ id, stepNum }) => {
  let color;
  if (id > stepNum) {
    color = theme.grey;
  } else {
    color = theme.darkGrey;
  }
  return (
    <View
      style={{
        borderRadius: 50,
        backgroundColor: color,
        width: 10,
        height: 10,
        marginRight: 10,
      }}
    ></View>
  );
};

export function Steps({ stepNum }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
        flexDirection: "row",
      }}
    >
      <Dot id={1} stepNum={stepNum} />
      <Dot id={2} stepNum={stepNum} />
      <Dot id={3} stepNum={stepNum} />
      <Dot id={4} stepNum={stepNum} />
    </View>
  );
}

// export function ProfileImg({ width, height, pfp }) {
//   return (
//     <Image
//       style={{
//         width: width,
//         height: height,
//         backgroundColor: theme.grey,
//         borderRadius: width / 2,
//         zIndex: 100,
//         borderColor: "white",
//         borderWidth: 4,
//       }}
//       source={{
//         uri: pfp,
//       }}
//       alt={"profile pic"}
//     />
//   );
// }

export const NumOfFriends = ({ num }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderBottomColor: theme.grey,
        borderBottomWidth: 1,
        marginBottom: 15,
      }}
    >
      <BoldLabel text={num} />
      <Text> Friends</Text>
    </View>
  );
};

export const BoldBigLabel = ({ text }) => {
  return <Text style={styles.BoldBigLabel}>{text}</Text>;
};

export const BoldLabel = ({ text }) => {
  return <Text style={styles.BoldLabel}>{text}</Text>;
};

export const XsmlLabel = ({ text }) => {
  return <Text style={styles.XsmlLabel}>{text}</Text>;
};

export const SmlLabel = ({ text }) => {
  return <Text style={styles.SmlLabel}>{text}</Text>;
};

export const Header = ({ height }) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: theme.darkGrey,
        width: theme.windowWidth,
      }}
    ></View>
  );
};

export const InputField = ({
  value,
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View>
      <SmlLabel text={label} />
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        label={label}
        value={value}
        autoCapitalize="none"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const BigInputField = ({ placeholder, label, value, onChangeText }) => {
  return (
    <View>
      <SmlLabel text={label} />

      <TextInput
        style={styles.bigInput}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        label={label}
        value={value}
        autoCapitalize="none"
        onChangeText={onChangeText}
        multiline={true}
        maxLength={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: theme.grey,
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 7,
  },

  plusIcon: {
    width: 30,
    height: 30,
  },

  bottomTab: {
    width: 25,
    height: 25,
  },

  ExtraBigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    margin: 30,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  ExtraBigButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  BigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 5,
    margin: 15,
    width: 113,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 50,
    backgroundColor: theme.lightGrey,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 7,
    width: 79,
    height: 30,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },

  bigInput: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 7,

    height: 160,
    backgroundColor: theme.lightGrey,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },

  BigLabel: {
    fontSize: 24,
  },

  BoldBigLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },

  Label: {
    fontSize: 18,
  },

  BoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 13,
  },

  SmlLabel: {
    marginLeft: 30,
    fontSize: 16,
    //fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 14,
    color: theme.darkGrey,
    width: "auto",
  },
});
