import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import { useState } from "react";
import { Container, HStack, View } from "native-base";
import { FlatListSlider } from "react-native-flatlist-slider";
import { baseURL } from "../../instance";
import { Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import entriesStore from "../../stores/entriesStore";
import userStore from "../../stores/usersStore";
import ImageItem from "./EntryImgItem";

import {
  InputField,
  BigInputField,
  theme,
  SmlLabel,
  BoldBigLabel,
} from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function ItemDetails({ route }) {
  const navigation=useNavigation();
  const { item } = route.params;
  let entry = entriesStore.entries.find((e) => e.title == item.name);
  let tagged = entry.friends.map((friend) => {
    return (
      <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate("", {
      //     user: user,
      //   })
      // }
      >
        <Text style={styles.user}>@{friend.displayname}</Text>
      </TouchableOpacity>
    );
  });
  const images0 = [
    {
      image:
        "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      desc: "Silent Waters in the mountains in midst of Himilayas",
    },
    {
      image:
        "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
      desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
    },
  ];
  const images = entry.attachments.map((img) => {
    return {
      image: `${baseURL}${img}`,
    };
  });
  console.log({ entry });
  let date = entry.date;
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={{ paddingLeft: 30, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ alignContent: "flex-start" }}>{entry.date}</Text>
        </View>
        <View>
          <FlatListSlider
            data={images}
            width={390}
            height={240}
            timer={5000}
            component={<ImageItem />}
          />
        </View>
        <View style={{ paddingLeft: 30, paddingTop: 20, paddingRight: 30 }}>
          <BoldBigLabel text={entry.title} />

          <View>{tagged}</View>
          <View>
            <TouchableOpacity
            onPress={() =>
              navigation.navigate("map", {entry:entry})
            }
            >
              <MaterialIcons name="location-pin" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bigInput}>
          <Text>
            {/* orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus
            mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
            vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
            condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
            neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
            Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
            Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
            fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
            consequat, leo eget bibendum sodales, augue velit cursus nunc */}
            {entry.body}
          </Text>
        </View>
        <View style={styles.input}>
          {/* <Text>Emojies</Text> */}
          <View style={styles.emoji}>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/feeling/${entry.feeling}.png`,
              }}
              alt={`${entry.feeling}`}
            />
          </View>
          <View style={styles.emoji}>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/weather/${entry.weather}.png`,
              }}
              alt={`${entry.weather}`}
            />
          </View>
          <View style={styles.emoji}>
            <Image
              style={styles.pic1}
              source={{
                uri: `${baseURL}/media/emojis/health/${entry.health}.png`,
              }}
              alt={`${entry.health}`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigInput: {
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 7,
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
    height: 250,
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },

  input: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 7,
    height: 70,
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

  pic1: {
    width: 30,
    marginBottom: 4,
    height: 30,
  },

  emoji: { margin: 6, alignItems: "center", justifyContent: "center" },

  imgContainer: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
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
  user: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },

  imglist: {
    flex: 1,
    borderRadius: 10,
  },
});
