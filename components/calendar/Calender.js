import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import entries from "../../entriesdata";
import { useNavigation } from "@react-navigation/native";
import entriesStore from "../../stores/entriesStore";
import { withNavigation } from "react-navigation";
import { theme } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AgendaScreen extends Component {
  constructor(props, { navigation }) {
    super(props);

    // const navigation = useNavigation();

    let entries = entriesStore.userEntries;
    // let itemsArr = [
    //   { date: entries[0].date, name: entries[0].title },
    //   { date: entries[1].date, name: entries[1].title },
    // ];
    let itemsArr = [];
    for (let i = 0; i < entries.length; i++) {
      itemsArr.push({ date: entries[i].date, name: entries[i].title });
    }
    let items = {};
    let UniqueDates = [
      ...new Set(
        entries.map((entry) => {
          return entry.date;
        })
      ),
    ];
    for (let i = 0; i < UniqueDates.length; i++) {
      items[UniqueDates[i]] = [];
      for (let j = 0; j < entries.length; j++) {
        if (entries[j].date == UniqueDates[i]) {
          let obj = {};
          obj["name"] = entries[j].title;
          items[UniqueDates[i]].push(obj);
        }
      }
    }
    let marked = {};
    itemsArr.forEach((item) => (marked[item.date] = { marked: true }));

    this.state = {
      items: items,
      // "entries.date": [{ name: entries.title}],
      // "": [{ name: entries[0].title }],
      // "2022-07-05": [{ name: entries[1].title }],
      // "2022-07-06": [{ name: "Something" }, { name: "Harakat" }],
      data: {
        "2021-03-06": [{ name: "item 1 - any js object" }],
        "2021-03-07": [{ name: "item 2 - any js object", height: 80 }],
        "2021-03-08": [],
        "2021-03-09": [
          { name: "item 3 - any js object" },
          { name: "any js object" },
        ],
      },
      markedDates: marked,
      navigation: navigation,
    };
    {
      // const navigation = useNavigation();
    }
  }

  importData = async () => {
    try {
      const data = [];
      let keys = await AsyncStorage.getAllKeys();
      for (let inKey of keys) {
        let obj = await AsyncStorage.getItem(inKey);
        obj = JSON.parse(obj);

        const DATE = this.formatDate(obj.date);

        const newAgendaObject = {
          [DATE]: [
            {
              id: DATE,
              name: obj.title,
              height: 100,
            },
          ],
        };

        data.push(newAgendaObject);
      }
      //   console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    // console.log(this.state.items);

    return (
      <View style={{ flex: 1 }}>
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={this.state.items}
          /*  items={{
                          '2021-01-19': [{ name: 'item 1 - any js object' }],
                          '2021-01-19': [{ name: 'item 2 - any js object', height: 80 }],
                          '2021-01-20': [],
                          '2021-01-19': [{ name: 'item 3 - any js object' }]
                      }} */
          markingType={"custom"}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          //  loadItemsForMonth={(month) => { console.log('trigger items loading') }}
          loadItemsForMonth={this.loadItems.bind(this)}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          // onDayPress={(day) => { console.log('day pressed') }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day) => {
            console.log("day changed");
          }}
          // Initially selected day
          // selected={'2021-01-19'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2020-01-01"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2022-05-30'}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={20}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={12}
          // Specify how each item should be rendered in agenda
          //  renderItem={(item, firstItemInDay) => { return (<View />); }}
          renderItem={this.renderItem.bind(this)}
          // displayLoadingIndicator={true}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
          //  renderDay={(day, item) => { return (<View />); }}
          // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
          /* onDayPress={(day) => {
                         getSelectedDayEvents(day.dateString);
                         //to change the month and year on top of agenda
                         setDate(moment(day.dateString).format("MMMM YYYY"));
                         //set the date in case onRefresh is executed
                         setDateToRefresh(day.dateString);
                     }
                     }*/
          // Specify how empty date content with no items should be rendered
          //renderEmptyDate={() => { return (<View />); }}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          // Specify how agenda knob should look like
          // renderKnob={() => { return (<View />); }}
          renderKnob={this.renderKnobIcon.bind(this)}
          // Specify what should be rendered instead of ActivityIndicator
          //    renderEmptyData={() => { return (<View />); }}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed

          markedDates={this.state.markedDates}
          // {{
          //   "2021-01-16": { selected: true, marked: true, startingDay: true },
          //   "2021-01-17": { marked: true },
          //   "2021-01-18": { disabled: true },
          // }}
          firstDay={1}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={false}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log("refreshing...")}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          //  refreshControl={null}
          // Agenda theme
          showScrollIndicator={true}
          scrollEnabled={true}
          pagingEnabled={true}
          theme={{
            agendaKnobColor: "#000000",
            agendaDayTextColor: "#000000",
            agendaDayNumColor: "#000000",
            agendaTodayColor: "#000000",
            agendaKnobColor: "#000000",
            indicatorColor: "#000000",
            textSectionTitleColor: "#000000",
            dotColor: theme.primary,
            selectedDayBackgroundColor: theme.primary,
            arrowColor: "#000000",
            textDayFontSize: 12,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
            textDayHeaderFontWeight: "bold",
          }}
          // Agenda container style

          style={
            {
              //height: 20
            }
          }
        />
        {/* plus button */}
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Form")}
          style={{
            backgroundColor: "white",
            position: "absolute",
            borderRadius: 50,
            width: 50,
            height: 50,
            zIndex: 50,
            right: 20,
            bottom: 20,
            alignItems: "center",
            elevation: 20,
          }}
        >
          <AntDesign name="pluscircle" color="#283747" size={50} />
        </TouchableOpacity> */}
      </View>
    );
  }

  // loadItems(day) {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);

  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: "Item for " + strTime + " #" + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach((key) => {
  //       newItems[key] = this.state.items[key];
  //     });
  //     this.setState({
  //       items: newItems,
  //     });
  //   }, 1000);
  // }

  loadItems(day) {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      //   console.log(strTime);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        // const numItems = Math.floor(Math.random() * 3 + 1);
        // for (let j = 0; j < numItems; j++) {
        //   this.state.items[strTime].push({
        //     name: "Item for " + strTime + " #" + j,
        //     height: Math.max(50, Math.floor(Math.random() * 150)),
        //   });
        // }
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach((key) => {
      newItems[key] = this.state.items[key];
    });
    this.setState({
      items: newItems,
    });
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  renderItem(item, navigation) {
    let entry = entriesStore.entries.find((e) => e.title == item.name);
    console.log(entry);
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() =>
          this.props.navigation.navigate("Details", { item: item })
        }
        // onPress={() =>
        //   navigation.navigate("Details", {
        //     navigation: navigation,
        //     entry: entry,
        //   })
        // }
      >
        <Text style={styles.textStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <TouchableOpacity style={[styles.item, {}]}>
        {/* <MaterialCommunityIcons
          name="exclamation-thick"
          size={15}
          color="#283747"
        /> */}
        {/* <Text style={styles.textStyle}>Wow, Look! Nothing!</Text> */}
      </TouchableOpacity>
    );
  }

  renderKnobIcon() {
    return (
      <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/
      >
        <MaterialCommunityIcons name="ray-vertex" size={30} color="#000000" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  dateViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
  },
  dateStyle: {
    color: "#000000",
    fontSize: 18,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginTop: 30,
    height: 50,
  },
  textStyle: {
    fontSize: 18,
    margin: 5,
    color: "#000000",
    fontWeight: "500",
    // color: "#283747",
  },
});
