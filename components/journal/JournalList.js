import { View, ScrollView, Text , RefreshControl ,Dimensions,StyleSheet} from "react-native";
import { SmlLabel, RoundButton, theme } from "../../constants";
import entriesStore from "../../stores/entriesStore";
import JournalEntry from "./JournalItem";
import { observer } from "mobx-react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as React from "react";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function JournalList({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];
  const entries = entriesStore.userEntries
    .filter((entry) => entry.date == todaysDate)
    .map((entry) => <JournalEntry entry={entry} key={entry._id} />);

  return (
    <View style={styles.screen}>
      <ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Text style={{ padding: 5, margin: 10, fontSize: RFValue(14) }}>
          {today.toDateString()}
        </Text>
        <View
          style={{
            borderTopColor: theme.darkGrey,
            borderTopWidth: 1,
            margin: 20,
            marginTop: 0,
          }}
        ></View>
        {entries.length === 0 ? (
          <SmlLabel text="no entries yet" />
        ) : (
          <View>{entries}</View>
        )}
      </ScrollView>
      <RoundButton navigation={navigation} />
    </View>
  );
}

export default observer(JournalList);

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    flex: 1, 
    paddingTop: 10 
  },

});