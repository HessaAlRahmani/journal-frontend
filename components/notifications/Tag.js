import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { BoldLabel, XsmlLabel, theme } from "../../constants";
import userStore from "../../stores/usersStore";
import entriesStore from "../../stores/entriesStore";

export default function Tag({ notification, navigation }) {
  const entry = entriesStore.entries.find(
    (entry) => entry.id === notification.entry
  );
  const item = { name: entry.title };
  const friend = userStore.users.find(
    (user) => user._id == notification.sender
  );

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { item: item });
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `${baseURL}${friend.profileImage}`,
            }}
            alt={"profile pic"}
          />
          <View>
            <BoldLabel text={`@${friend.username}`} />
            <XsmlLabel text={"Tagged you in a memory!"} />
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            right: "3%",
            top: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
    marginLeft: 10,
    backgroundColor: theme.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  username: { marginTop: 10 },
  displayname: {},
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});
