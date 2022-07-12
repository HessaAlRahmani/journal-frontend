import { View } from "react-native";
import { useState } from "react";
import { Steps, SmallButton, theme } from "../../constants";
import entriesStore from "../../stores/entriesStore";

//components
import AddEntry1 from "./AddEntry1";
import AddEntry2 from "./AddEntry2";
import AddEntry3 from "./AddEntry3";
import AddEntry4 from "./AddEntry4";

export default function AddEntry({ route, navigation }) {
  const [pageNum, setPageNum] = useState(1);
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];
  const [newEntry, setNewEntry] = useState({
    date: todaysDate,
    activityType: null,
    title: "",
    body: "",
    feeling: "",
    health: "",
    weather: "",
    location: {},
    attachments: [],
    friends: [],
    isPriv: true,
  });

  const text = pageNum === 4 ? "Publish" : "Next";
  return (
    <View style={{ flex: 1 }}>
      {pageNum === 1 && (
        <AddEntry1 newEntry={newEntry} setNewEntry={setNewEntry} />
      )}
      {pageNum === 2 && (
        <AddEntry2 newEntry={newEntry} setNewEntry={setNewEntry} />
      )}
      {pageNum === 3 && (
        <AddEntry3 newEntry={newEntry} setNewEntry={setNewEntry} />
      )}
      {pageNum === 4 && (
        <AddEntry4
          newEntry={newEntry}
          setNewEntry={setNewEntry}
          navigation={navigation}
          route={route}
        />
      )}

      <Steps stepNum={pageNum} />

      <View
        style={{
          height: 60,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <SmallButton
          text={text}
          onPress={() => {
            setPageNum(pageNum + 1);
            if (pageNum === 4) {
              entriesStore.addEntry(newEntry);
              navigation.navigate("MainJournal");
              //toast
            }
          }}
        />
        {pageNum !== 1 && (
          <SmallButton
            text={"Prev"}
            onPress={() => {
              setPageNum(pageNum - 1);
            }}
          />
        )}
      </View>
    </View>
  );
}
