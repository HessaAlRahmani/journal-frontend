import { View, StyleSheet } from "react-native";
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

  const text = pageNum === 4 ? "publish" : "next";
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
            text={"prev"}
            onPress={() => {
              setPageNum(pageNum - 1);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: theme.grey,
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 7,
  },

  plusIcon: {
    width: 30,
    height: 30,
  },

  bottomTab: {
    width: 25,
    height: 25,
  },

  ExtraBigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    margin: 30,
    height: 50,
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
  ExtraBigButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  BigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 5,
    margin: 15,
    width: 113,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 50,
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

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 7,
    width: 79,
    height: 30,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },

  bigInput: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 7,

    height: 160,
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

  BigLabel: {
    fontSize: 24,
  },

  BoldBigLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },

  Label: {
    fontSize: 18,
  },

  BoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  SmlLabel: {
    marginLeft: 30,
    fontSize: 16,
    //fontWeight: "bold",
  },

  XsmlLabel: {
    fontSize: 14,
    color: theme.darkGrey,
    width: "auto",
  },

  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 30,
    padding: 7,
    height: 50,
    borderRadius: 10,
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
