import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Image } from "native-base";

import {
  theme,
  BoldBigLabel,
  XsmlLabel,
  NumOfFriends,
  BigButton,
} from "../../constants";
import { observer } from "mobx-react";
import usersStore from "../../stores/usersStore";
import entriesStore from "../../stores/entriesStore";
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../instance";
import { TouchableOpacity } from "react-native-gesture-handler";
import MoodsPieChart from "./MoodsPieChart";

const FEELING = {
  lovely: 5,
  happy: 4,
  ok: 3,
  worried: 2,
  sad: 1,
  angry: 0,
  "": 2.5,
};
const HEALTH = {
  good: 4,
  recovering: 3,
  unwell: 2,
  highTemp: 1,
  reallySick: 0,
  "": 2.5,
};

function MainProfile({ navigation }) {
  const user = usersStore.user;
  // const navigation = useNavigation();
  const userfriends = usersStore.users.find(
    (user) => user._id == usersStore.user._id
  ).friends;
  const userEntries = entriesStore.userEntries;

  const userEntriesFeels = userEntries.map((entry) => entry.feeling);
  const neededData = userEntries.map((entry) => {
    return {
      date: entry.date,
      feeling: FEELING[entry.feeling],
      health: HEALTH[entry.health],
    };
  });

  const sumADatesFeelingsAndHealth = Object.values(
    neededData.reduce((a, { date, feeling, health }) => {
      a[date] = a[date] || { date, feeling: 0, health: 0, numOfDays: 0 };
      a[date].numOfDays = a[date].numOfDays + 1;
      a[date].feeling = a[date].feeling + feeling;
      a[date].health = a[date].health + health;
      return a;
    }, {})
  )
    .sort((a, b) => {
      const newA = a.date.split("/").reverse().join("-");
      const newB = b.date.split("/").reverse().join("-");
      return +new Date(newB) - +new Date(newA);
    })
    .slice(0, 7);

  //sort by date

  const ShowFriends = () => {
    navigation.navigate("ViewFriends");
  };

  return (
    //<SafeAreaView>
    <ScrollView>
      <Image
        source={{ uri: `${baseURL}${user.headerImg}` }}
        alt={"header"}
        style={styles.header}
      />
      <View style={styles.bigContainer}>
        <Image
          style={styles.pfp}
          source={{
            uri: `${baseURL}${user.profileImage}`,
          }}
          alt={"profile pic"}
        />
        <View style={styles.smallContainer}>
          <BoldBigLabel text={user.displayname} />
          <BigButton
            text={"Edit profile"}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
        </View>
        <XsmlLabel text={"@" + user.username} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("friendsList", { friends: userfriends });
          }}
        >
          <NumOfFriends num={userfriends?.length || 0} />
        </TouchableOpacity>
        <XsmlLabel text={user.bio} />
      </View>
      <MoodsPieChart
        userEntriesFeels={userEntriesFeels}
        sumADatesFeelingsAndHealth={sumADatesFeelingsAndHealth}
      />
      <BigButton
        text={"Sign out"}
        onPress={() => {
          usersStore.signout();
        }}
        style={{ marginBottom: 20, alignSelf: "center" }}
      />
    </ScrollView>
    //</SafeAreaView>
  );
}

export default observer(MainProfile);

const styles = StyleSheet.create({
  pfp: {
    width: 100,
    height: 100,
    backgroundColor: theme.grey,
    borderRadius: 100 / 2,
    //zIndex: 100,
    borderColor: "white",
    borderWidth: 4,
  },
  bigContainer: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    bottom: 60,
  },

  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: theme.windowWidth - 40,
  },
  header: {
    height: 136,
    backgroundColor: theme.darkGrey,
    width: theme.windowWidth,
  },
});
