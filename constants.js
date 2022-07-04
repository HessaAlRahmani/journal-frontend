import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";

export const theme = {
  lightGrey: "#F6F6F6",
  grey: "#D9D9D9",
  darkGrey: "#696969",
  primary: "yellow",
  danger: "#EB7070",
  success: "#2FA83B",
};

export const NavIcon = ({ name }) => {
  return (
    <Image
      name
      style={styles.bottomTab}
      source={require(`./assets/BottomNavIcons/${name}.png`)}
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

export const RoundButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Image style={styles.plusIcon} source={require("./assets/plus.png")} />
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

//component call <Steps stepNum={stepNum}/>
export function Steps({ stepNum }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Dot id={1} stepNum={stepNum} />
      <Dot id={2} stepNum={stepNum} />
      <Dot id={3} stepNum={stepNum} />
      <Dot id={4} stepNum={stepNum} />
      <Dot id={5} stepNum={stepNum} />
    </View>
  );
}

export function ProfileImg({ width, height }) {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: theme.grey,
        borderRadius: 50,
        zIndex: 100,
        borderColor: "white",
        borderWidth: 4,
      }}
    ></View>
  );
}

export const Profile = ({ displayName, username, num, bio, onPress }) => {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        position: "absolute",
        marginTop: 70,
        marginLeft: 10,
      }}
    >
      <ProfileImg width={100} height={100} />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BoldBigLabel text={displayName} />
        <SmallButton text={"edit profile"} onPress={onPress} />
      </View>
      <XsmlLabel text={"@" + username} />
      <NumOfFriends num={num} />
      <XsmlLabel text={bio} />
    </View>
  );
};

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

export const Header = () => {
  return (
    <View
      style={{
        height: 136,
        backgroundColor: theme.darkGrey,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    borderRadius: "50%",
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    zIndex: 100,
    alignSelf: "flex-end",
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
    margin: 15,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
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
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //elevation: 7,
  },
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 7,
    width: 79,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
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
  },

  SmlLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 14,
    color: theme.darkGrey,
    width: "auto",
  },
});
