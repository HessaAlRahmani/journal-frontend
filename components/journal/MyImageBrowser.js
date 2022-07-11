import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as FileSystem from "expo-file-system";
import { baseURL } from "../../instance";

export default function MyImageBrowser({ navigation }) {
  const imagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: () => <ActivityIndicator size="small" color={"#0580FF"} />,
    });
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await processImageAsync(photo.uri);

          const newpic = await FileSystem.uploadAsync(
            `${baseURL}uploadImage`,
            pPhoto.uri
          );
          cPhotos.push(newpic.body);
        }

        navigation.navigate("AddEntry", { photos: cPhotos });
      })
      .catch((e) => console.log(e));
  };

  const processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    return file;
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Selected ${count}/4 files`,
      headerRight: () => {
        if (!count) return null;
        return (
          <TouchableOpacity title={"Done"} onPress={onSubmit}>
            <Text onPress={onSubmit}>Done</Text>
          </TouchableOpacity>
        );
      },
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  //   const imagesCallback = (callback) => {
  //     navigation.setOptions({
  //       headerRight: () => <ActivityIndicator size="small" color={"#0580FF"} />,
  //     });

  //
  //   };

  //   const updateHandler = (count, onSubmit) => {
  //     navigation.setOptions({
  //       title: `Selected ${count} files`,
  //       headerRight: () => {
  //         if (!count) return null;
  //         return (
  //           <TouchableOpacity title={"Done"} onPress={onSubmit}>
  //             <Text onPress={onSubmit}>Done</Text>
  //           </TouchableOpacity>
  //         );
  //       },
  //     });
  //   };

  //   const renderSelectedComponent = (number) => (
  //     <View style={styles.countBadge}>
  //       <Text style={styles.countBadgeText}>{number}</Text>
  //     </View>
  //   );

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});
