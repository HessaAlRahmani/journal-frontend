import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

export const theme = {
  lightGrey: "#F6F6F6",
  grey: "#D9D9D9",
  darkGrey: "#696969",
  primary: "yellow",
  danger: "#EB7070",
  success: "#2FA83B",
  bigLabel: {
    size: "24",
  },
  BoldBigLabel: {
    size: "24",
    weight: "bold",
  },
  Label: {
    size: "18",
  },
  BoldLabel: {
    size: "18",
    weight: "bold",
  },
  smlLabel: {
    size: "16",
  },
  smlLabel: {
    size: "16",
    weight: "bold",
  },
  xsmlLabel: {
    size: "14",
  },
};

export const ExtraBigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}> {text} </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: theme.grey,
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
    //color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
