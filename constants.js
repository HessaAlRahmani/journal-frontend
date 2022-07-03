import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";

export const theme = {
  lightGrey: "#F6F6F6",
  grey: "#D9D9D9",
  darkGrey: "#696969",
  primary: "yellow",
  danger: "#EB7070",
  success: "#2FA83B",
  bigLabel: {
    size: "24",
  },
  BoldBigLabel: {
    size: "24",
    weight: "bold",
  },
  Label: {
    size: "18",
  },
  BoldLabel: {
    size: "18",
    weight: "bold",
  },
  smlLabel: {
    size: "16",
  },
  smlLabel: {
    size: "16",
    weight: "bold",
  },
  xsmlLabel: {
    size: "14",
  },
};

export const ExtraBigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.ExtraBigButton} onPress={onPress}>
      <Text style={styles.ExtraBigButtonText}> {text} </Text>
    </TouchableOpacity>
  );
};

export const BigButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.BigButton} onPress={onPress}>
      <Text style={styles.BigButtonText}> {text} </Text>
    </TouchableOpacity>
  );
};

export const SmallButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.SmallButton} onPress={onPress}>
      <Text style={styles.SmallButtonText}> {text} </Text>
    </TouchableOpacity>
  );
};

export const RoundButton = ({ onPress, imgSrc }) => {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Image style={styles.plusIcon} source={imgSrc} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    borderRadius: "50%",
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },

  ExtraBigButton: {
    justifyContent: "center",
    backgroundColor: theme.grey,
    padding: 10,
    margin: 15,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
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
      height: 3,
    },
},

    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //elevation: 7,
  
  BigButtonText: {
    fontSize: 12,
    textAlign: "center",
  },

  SmallButton: {
    justifyContent: "center",
    backgroundColor: theme.darkGrey,
    padding: 5,
    margin: 15,
    width: 79,
    height: 28,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //elevation: 7,
  },
  SmallButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },}
);



//component call <Steps stepnum={stepnum}/>
export  function Steps({stepnum}) {
    let view;
    if (stepnum ==1){
        view=<View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <View style={{borderRadius:50,backgroundColor:theme.darkGrey,width:10,height:10,marginRight:10}}></View>
        <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
        <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
        <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
        <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
        </View>;
    }
    else if(stepnum==2){ view=<View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.darkGrey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    </View>;}
    else if(stepnum==3){ view=<View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.darkGrey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    </View>;}
    else if(stepnum==4){ view=<View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.darkGrey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    </View>;}
    else if(stepnum==5) { view=<View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.grey,width:10,height:10,marginRight:10}}></View>
    <View style={{borderRadius:50,backgroundColor:theme.darkGrey,width:10,height:10,marginRight:10}}></View>
    </View>;}
  return (
    <View>
        {view}
    </View>
  )
}


export function ProfileImg({width,height}) {
  return (
    <View>
      <View style={{width:width,height:height,backgroundColor:theme.grey,borderRadius:50}}></View>
    </View>
  )
}
