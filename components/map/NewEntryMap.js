import { useState,useEffect } from 'react';
import { StyleSheet, Text, View ,Dimensions, FlatList} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Button, Image} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import userStore from '../../stores/usersStore';
import entries from '../../entriesdata';
import { googleMapsKey } from '../../instance';
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../instance";


//check the key 
export default function NewEntryMap({newEntry, setNewEntry }) {
  Location.setGoogleApiKey(googleMapsKey);
  const navigation = useNavigation();


  const [location, setLocation] = useState(null);
  const [view,setView]=useState(null);


  const r={ region: {
    latitude: 29.267575,
      latitudeDelta: 0.055,
      longitude:47.992789,
      longitudeDelta: 0.005,}
  };
 const [markerloc,SetMarkerloc]=useState({latitude:r.region.latitude,longitude:r.region.longitude});

 


 useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    console.log("locaaatiooooonnnnn",location.coords)
    console.log("userr ",userStore.user)
    setView({latitude:location.coords.latitude,longitude:location.coords.longitude,longitudeDelta: 0.005,latitudeDelta: 0.005});
    SetMarkerloc({latitude:location.coords.latitude,longitude:location.coords.longitude});
    setNewEntry({...newEntry,location:{lat:markerloc.latitude,lng:markerloc.longitude}});

  })();
}, []);

 const drag=async(e)=>{
  const lat=e.nativeEvent.coordinate.latitude.toFixed(6);
  const lng=e.nativeEvent.coordinate.longitude.toFixed(6);
  SetMarkerloc({latitude:lat,longitude:lng});
  setNewEntry({...newEntry,location:{lat:markerloc.latitude,lng:markerloc.longitude}});
  alert(Object.entries(markerloc));
  console.log(lat,lng)
 }

 const getCurrentlocation=()=>{
    setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.005,latitudeDelta: 0.005});
    SetMarkerloc({latitude:location.latitude,longitude:location.longitude});
    setNewEntry({...newEntry,location:{lat:markerloc.latitude,lng:markerloc.longitude}});
    // alert("userrrrr  ",userStore.user)
   }
 
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
    {/* <View style={{backgroundcolor:"red",width:"90%",height:"30%",position:"absolute",zIndex:10}}></View> */}
<View style={{alignItems:"center"}}></View>
    <GooglePlacesAutocomplete
    placeholder='Search'
    fetchDetails={true}
    GooglePlacesSearchQuery={{rankby:"distance"}}
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
      setView({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng,longitudeDelta: 0.005,latitudeDelta: 0.0005})
      SetMarkerloc({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng});
      setNewEntry({...newEntry,location:{lat:markerloc.latitude,lng:markerloc.longitude}});
     
    }}
    query={{
      key:googleMapsKey,
      language: 'en||ar',
      radius:30000
    }}
    styles={{container:{flex:0,position:"absolute",width:"83%",zIndex:5,marginTop:40,marginLeft:10,borderColor:"grey",borderRadius:100,alignSelf:"center"},
              listView:{backgroundColor:"white"},
             textInput:{borderColor:"#ced0d3",borderWidth:1}}}
  />
  
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
    pinColor={"#9A9AEB"}
    title="my current"
    description="purple pin borahe"
    // image={{uri: "https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg"}}
    // image={require("https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg")}
  />
    
 
  

</MapView>
<Button onPress={()=>{getCurrentlocation()}} variant={"outline"} bgColor={"white"} style={{borderRadius:100,width:70,height:70,flex:0,position:"absolute",zIndex:5,top:"90%",left:"80%",borderColor:"#ced0d3"}}><MaterialIcons name="my-location" size={25} color="#1a73e8" /></Button>
      
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



