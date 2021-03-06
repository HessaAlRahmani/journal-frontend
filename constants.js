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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const theme = {
  lightGrey: "#F6F6F6",
  grey: "#D9D9D9",
  darkGrey: "#696969",
  primary: "#7AA6CC",
  danger: "#EB7070",
  success: "#2FA83B",
  windowWidth: Dimensions.get("window").width,
};

export const NavIcon = ({ name }) => {
  return (
    <Image
      style={styles.bottomTab}
      source={{
        uri: `${baseURL}/media/BottomNavIcons/${name}.png`,
      }}
      alt={`${name}`}
    />
  );
};

export const TopIcon = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress}>
      <Image
        style={styles.bottomTab}
        source={{
          uri: `${baseURL}/media/BottomNavIcons/${name}.png`,
        }}
        alt={`${name}`}
      />
    </TouchableOpacity>
  );
};
export const ExtraBigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={[styles.basicShadow, styles.ExtraBigButton]}
      onPress={onPress}
    >
      <Text style={styles.ExtraBigButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const BigButton = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity
      style={[styles.basicShadow, styles.BigButton, style]}
      onPress={onPress}
    >
      <Text style={styles.BigButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SmallButton = ({ onPress, text, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.basicShadow, styles.SmallButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.SmallButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const RoundButton = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("AddEntry");
  };
  return (
    <TouchableOpacity
      style={[styles.basicShadow, styles.roundButton]}
      onPress={onPress}
    >
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
        margin: 5,
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

export const NumOfFriends = ({ num, onPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderBottomColor: theme.grey,
        borderBottomWidth: 1,
        marginBottom: 15,
      }}
    >
      <BoldLabel text={num} />
      <BoldLabel text={"Friends"} />
      {/* <Text style={{ fontSize: RFValue(14), marginLeft: 5 }}>Friends</Text> */}
    </View>
  );
};

export const BoldBigLabel = ({ text, style }) => {
  return <Text style={[styles.BoldBigLabel, style]}>{text}</Text>;
};

export const BoldLabel = ({ text }) => {
  return <Text style={styles.BoldLabel}>{text}</Text>;
};

export const XsmlLabel = ({ text }) => {
  return <Text style={styles.XsmlLabel}>{text}</Text>;
};

export const SmlLabel = ({ text, style }) => {
  return <Text style={[styles.SmlLabel, style]}>{text}</Text>;
};

export const InputLabel = ({ text }) => {
  return <Text style={styles.inputLabel}>{text}</Text>;
};

export const InputField = ({
  value,
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
  editable,
}) => {
  return (
    <View>
      {label && <InputLabel text={label} />}
      <TextInput
        style={[styles.input, styles.basicShadow]}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        label={label}
        value={value}
        autoCapitalize="none"
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
};

export const BigInputField = ({ placeholder, label, value, onChangeText }) => {
  return (
    <View>
      <InputLabel text={label} />

      <TextInput
        style={[styles.bigInput, styles.basicShadow]}
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
  basicShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  roundButton: {
    backgroundColor: theme.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 10,
    marginRight: 10,
    marginBottom: 10,
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
    backgroundColor: theme.primary,
    padding: 10,
    margin: 30,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
  },
  ExtraBigButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFValue(14),
    color: "white",
  },

  BigButton: {
    backgroundColor: theme.primary,
    padding: 5,
    margin: 7,
    width: 113,
    height: 28,
    borderRadius: 6,
  },
  BigButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },

  input: {
    borderColor: theme.grey,
    borderWidth: 1,
    fontSize: 18,
    margin: 10,
    padding: 7,
    height: 50,
    backgroundColor: theme.lightGrey,
  },

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.primary,
    padding: 5,
    margin: 7,
    width: 79,
    height: 30,
    borderRadius: 6,
  },
  SmallButtonText: {
    fontSize: RFValue(10),
    color: "white",
    textAlign: "center",
    color: "white",
  },

  bigInput: {
    margin: 10,
    padding: 7,
    borderColor: theme.grey,
    borderWidth: 1,
    height: 130,
    backgroundColor: theme.lightGrey,
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
    fontSize: RFValue(14),
    fontWeight: "bold",
    margin: 5,
  },

  SmlLabel: {
    marginLeft: 30,
    fontSize: RFValue(14),
    color: theme.darkGrey,
  },

  inputLabel: {
    marginLeft: 10,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 16,
    color: theme.darkGrey,
    width: "auto",
  },
});
