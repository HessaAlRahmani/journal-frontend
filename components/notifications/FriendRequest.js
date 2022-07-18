import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useToast } from "native-base";
import { baseURL } from "../../instance";
import { BoldLabel, XsmlLabel, theme } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SmallButton } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import userStore from "../../stores/usersStore";
import notificationsStore from "../../stores/notificationsStore";

export default function FriendRequest({ navigation, notification }) {
  const toast = useToast();
  const friend = userStore.users.find(
    (user) => user._id == notification.sender
  );
  const user = userStore.user;
  return (
   
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
         <TouchableOpacity
      onPress={() => navigation.navigate("friendProfile", { friend: friend })}
    >
        <View style={styles.container}>
          <View style={styles.image}>
            <AntDesign name="adduser" size={28} color="black" />
          </View>
          <View>
            <BoldLabel text={`@${friend.username}`} />
            <XsmlLabel text={`Sent you a friend request`} />
          </View>
        </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            right: "3%",
            top: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* accept friend button */}
          <SmallButton
            text={"accept"}
            onPress={() => {
              notificationsStore.acceptFriend(friend._id, user._id);
              console.log("user" + user.username + "friend" + friend.username);
              notificationsStore.deleteNotification(notification._id);
              toast.show({
                title: ` You Accepted @${friend.username} Friend Request`,
                placement: "top",
                bg: "green.800",
              });
            }}
            style={{ width: 60 }}
          />
          {/* reject friend button */}
          <TouchableOpacity
            onPress={() => {
              notificationsStore.deleteNotification(notification._id);
              notificationsStore.rejectFriend(user._id,friend._id);
            }}
          >
            <Feather name="x" size={19} color={theme.darkGrey} />
          </TouchableOpacity>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    backgroundColor: theme.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {},
  displayname: {},
  container: {
    backgroundColor: "white",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});
