import { useState,useEffect } from 'react';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker}from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Button} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import userStore from '../../stores/usersStore';
import entries from '../../data/entriesData';

const key ="AIzaSyAB82YOHpacO5IF2NXyi5IR3wNaCHXuvCQ";


export default function MainMap() {
    Location.setGoogleApiKey(key);
  const r={ region: {
    latitude: 29.267575,
      latitudeDelta: 0.055,
      longitude:47.992789,
      longitudeDelta: 0.005,}
  };
  const [location, setLocation] = useState(null);
 const [markerloc,SetMarkerloc]=useState({latitude:r.region.latitude,longitude:r.region.longitude});
 const [view,setView]=useState(null);
 

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
    setView({latitude:location.coords.latitude,longitude:location.coords.longitude,longitudeDelta: 0.005,latitudeDelta: 0.005});
    SetMarkerloc({latitude:location.coords.latitude,longitude:location.coords.longitude})

  })();
}, []);

 const drag=async(e)=>{
  const lat=e.nativeEvent.coordinate.latitude.toFixed(6);
  const lng=e.nativeEvent.coordinate.longitude.toFixed(6);
  SetMarkerloc({latitude:lat,longitude:lng});
  alert(Object.entries(markerloc));
  console.log(lat,lng)
  // search();

  // console.log(resultt); 
  
 }

 const getCurrentlocation=()=>{
    setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.005,latitudeDelta: 0.005});
    SetMarkerloc({latitude:location.latitude,longitude:location.longitude})
   }

   let myEntries=entries.filter((entry)=>entry.user==userStore.user._id);
   let myPins=myEntries.map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}} title={marker.title} description={marker.body}/>)

  
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
     
    }}
    query={{
      key:key,
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

    {myPins}
  <Marker
    // key={index}
    draggable 
    coordinate={markerloc}
    onDragEnd={(e) => drag(e)}
    pinColor={"#9A9AEB"}
    title="my pin"
    description="purple pin borahe"
    // image={{uri: "https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg"}}
    // image={require("https://mpng.subpng.com/20180615/zzw/kisspng-gps-navigation-systems-computer-icons-android-icon-5b246d324b4c66.9491847615291139063084.jpg")}
  />
    
 
  

</MapView>
<Button onPress={()=>{getCurrentlocation()}} variant={"outline"} bgColor={"white"} style={{borderRadius:100,width:50,height:50,flex:0,position:"absolute",zIndex:5,top:"90%",left:"85%",borderColor:"#ced0d3"}}><MaterialIcons name="my-location" size={20} color="#1a73e8" /></Button>
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