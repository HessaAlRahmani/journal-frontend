import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "native-base";
import { baseURL } from "../../instance";
import { theme, BoldLabel } from "../../constants";

export default function Friend({ friend }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.pfp}
        source={{
          uri: `${baseURL}${friend.profileImage}`,
        }}
        alt={"profile pic"}
      />
      <BoldLabel text={friend.username} />
      {/* unfriend button? */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 15,
    backgroundColor: theme.grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
    borderRadius: 10,
  },
  pfp: {
    width: 50,
    height: 50,
    backgroundColor: theme.grey,
    borderRadius: 50 / 2,
    zIndex: 100,
    borderColor: "white",
    borderWidth: 4,
  },
});
