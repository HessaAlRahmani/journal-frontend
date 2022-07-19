import { useState} from 'react';
import { StyleSheet, View ,Dimensions} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker} from "react-native-maps";
import * as Location from 'expo-location';;
import { googleMapsKey } from '../../instance';
import { useNavigation } from "@react-navigation/native";

export default function JournalMap({route}) {
    const {entry}=route.params;
    Location.setGoogleApiKey(googleMapsKey);
    const memorylocation=entry.location;

  
  
    const [location, setLocation] = useState(null);
    const [view,setView]=useState({latitude:memorylocation.lat,longitude:memorylocation.lng,longitudeDelta: 0.005,latitudeDelta: 0.005});
  
    // setView({latitude:memorylocation.lat,longitude:memorylocation.lng,longitudeDelta: 0.005,latitudeDelta: 0.005});
    const r={ region: {
      latitude: 29.267575,
        latitudeDelta: 0.055,
        longitude:47.992789,
        longitudeDelta: 0.005,}
    };
   const [markerloc,SetMarkerloc]=useState({latitude:memorylocation.lat,longitude:memorylocation.lng});

    return (
      <View style={{flex:1,backgroundColor:"white"}}>
      {/* <View style={{backgroundcolor:"red",width:"90%",height:"30%",position:"absolute",zIndex:10}}></View> */}
  <View style={{alignItems:"center"}}></View>
   
    
      <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map}
   region={view}
  >
  {/* pins to be rendered */}
  
    <Marker
      // key={index}
      draggable 
      coordinate={markerloc}
      onDragEnd={(e) => drag(e)}
      pinColor={"red"}
      title="my current"
      description="purple pin borahe"
      // image={{uri: "https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg"}}
      // image={require("https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg")}
    />
  </MapView>
        
  </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width:  Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      zIndex:1
    },
  });



