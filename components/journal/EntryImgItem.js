import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

export default function ImageItem({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) {
  return (
    <View style={[styles.imageContainer, styles.shadow]}>
      <Image style={styles.videoPreview} source={{ uri: item[imageKey] }} />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: 390,
    paddingVertical: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  videoPreview: {
    width: 390,
    height: 290,
    borderRadius: 10,
    resizeMode: "cover",
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
