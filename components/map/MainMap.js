import { useState,useEffect } from 'react';
import { StyleSheet, Text, View ,Dimensions, FlatList} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Button, Image} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import userStore from '../../stores/usersStore';
import { googleMapsKey } from '../../instance';
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../instance";
import entriesStore from '../../stores/entriesStore';


//check the key 
export default function MainMap() {
  Location.setGoogleApiKey(googleMapsKey);
  const navigation = useNavigation();
  const entries=entriesStore.entries;

  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [view,setView]=useState(null);
  const userfriends=userStore.users.find((user)=>user._id==userStore.user._id).friends;

  const r={ region: {
    latitude: 29.267575,
      latitudeDelta: 0.055,
      longitude:47.992789,
      longitudeDelta: 0.005,}
  };
 const [markerloc,SetMarkerloc]=useState({latitude:r.region.latitude,longitude:r.region.longitude});

 
 const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

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
    SetMarkerloc({latitude:location.coords.latitude,longitude:location.coords.longitude})

  })();
}, []);

 const drag=async(e)=>{
  const lat=e.nativeEvent.coordinate.latitude.toFixed(6);
  const lng=e.nativeEvent.coordinate.longitude.toFixed(6);
  SetMarkerloc({latitude:lat,longitude:lng});
  alert(Object.entries(markerloc));
  console.log(lat,lng)
 }
const makepins=(entries)=>{
  let unique=[];
for (let i=0;i<entries.length;i++)
{
    let found=unique.find((entrie)=>entrie.lat==entries[i].location.lat && entrie.lng==entries[i].location.lng);
    if (!found){unique.push(entries[i].location)}
}


let locations=[];
unique.forEach((location)=>{let obj={};obj["location"]=location;obj["entries"]=[];locations.push(obj)});
 for (let i=0;i<entries.length;i++)
 {
     for(let j=0;j<locations.length;j++)
     {
         if(entries[i].location.lat == locations[j].location.lat && entries[i].location.lng == locations[j].location.lng)
         {
             locations[j].entries.push(entries[i])
         }
     }
 }
 console.log("theeeee locaaaatiooonsnssss      "+locations);
 return locations;
}
const getFriendsEntries=(userfriends,entries)=>{

  let friendsIds=userfriends.map((friend)=>{return friend._id});
  let friendsEntries=[];

for (let i=0;i<friendsIds.length;i++)
{
    for (let j=0;j<entries.length;j++)
    {
        if (friendsIds[i]==entries[j].user && entries[j].isPriv==false)
        {
            friendsEntries.push(entries[j])
        }
    }
}
return friendsEntries;

}
 const getCurrentlocation=()=>{
    setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.005,latitudeDelta: 0.005});
    SetMarkerloc({latitude:location.latitude,longitude:location.longitude})
    // alert("userrrrr  ",userStore.user)
   }
   let myentries=entries.filter((entry)=>entry.user==userStore.user._id);
   let myPins=makepins(myentries).map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}}  title={`${marker.entries.length} Memories`} description={"Click to view all Memories"} onCalloutPress={()=>{navigation.navigate("PinEntries",{entries:marker.entries});}}/>)
  let friendsEntries=getFriendsEntries(userfriends,entries);
  let allEntries=myentries.concat(friendsEntries);
  let allPins=makepins(allEntries).map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}}  title={`${marker.entries.length} Memories`} description={"Click to view all Memories"} onCalloutPress={()=>{navigation.navigate("PinEntries",{entries:marker.entries});}}/>)
  // let myPins=entries.filter((entry)=>entry.user==userStore.user._id).map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}} title={marker.title} description={marker.body}/>)
  // let friendsPublicPins=entries.filter((entry)=>entry.user!=userStore.user._id && entry.status=="public").map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}} title={marker.title} description={marker.body}/>)
  // let allPins=myPins.concat(friendsPublicPins);
    let buttons=[{title:"All",img:<FontAwesome5 name="users" size={24} color="black" />},{title:"Me",img: <Image style={{borderRadius:100}}source={{uri:`${baseURL}${userStore.user.profileImage}`}} alt="Alternate Text" size="xs" />}]
   let friendsButtons=[];
userfriends.forEach((friend) => {let obj={};obj["_id"]=friend._id;obj["title"]=friend.username;obj.img=<Image style={{borderRadius:100}}source={{uri:`${baseURL}${friend.profileImage}`}} alt="Alternate Text" size="xs" />;friendsButtons.push(obj)});

//  let allbuttons =buttons;
 let allbuttons =buttons.concat(friendsButtons);

   const [viewPins,SetViewPins]=useState(allPins);
   const[filterButton,setFilterButton]=useState(<FontAwesome5 name="users" size={24} color="black" />)
   const filterMapPins=(title,img,_id)=>{
      if(title=="All")
      {
        SetViewPins(allPins);
        setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.6,latitudeDelta: 0.005});
        setFilterButton(<FontAwesome5 name="users" size={24} color="black" />)
        console.log(viewPins);
        toggleModal()
      }
      else if(title=="Me")
      {
        SetViewPins(myPins);
        setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.6,latitudeDelta: 0.005});
        setFilterButton(img)
        console.log(viewPins);
        makepins(myentries);
        toggleModal()
      }
      else
      {
        let friendEntries=entries.filter((entry)=>entry.user==_id && entry.isPriv==false);
        let friendPins=makepins(friendEntries).map((marker,index)=><Marker key={index} coordinate={{latitude:marker.location.lat,longitude:marker.location.lng}}  title={`${marker.entries.length} Memories`} description={"Click to view all Memories"} onCalloutPress={()=>{navigation.navigate("PinEntries",{entries:marker.entries});}}/>)
        SetViewPins(friendPins);
        setView({latitude:location.latitude,longitude:location.longitude,longitudeDelta: 0.6,latitudeDelta: 0.005});
        setFilterButton(img)
        console.log(viewPins);
        toggleModal()
      }
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
    {viewPins}
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
<Button onPress={()=>{toggleModal()}} variant={"outline"} bgColor={"white"} style={{borderRadius:100,width:70,height:70,flex:0,position:"absolute",zIndex:5,top:"80%",left:"80%",borderColor:"#ced0d3"}}>{filterButton}</Button>
<Modal propagateSwipe isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} style={{borderTopLeftRadius:50,borderTopRightRadius:50}}>
<View style={{height:"30%",top:"38%",backgroundColor:"white",borderTopLeftRadius:50,borderTopRightRadius:50,paddingTop:20}}>
  <FlatList 
        data={allbuttons}
        numColumns={4}
        renderItem={({ item: button }) => (
          <View style={{ flex: 0.25, flexDirection: "column" }}>
            <Button onPress={()=>{filterMapPins(button.title,button.img,button._id)}} bgColor={"#D9D9D9"} style={{alignSelf:"center",borderRadius:100,width:70,height:70,margin:10,marginBottom:5}}>{button.img}</Button>
            <Text style={{alignSelf:"center",fontSize:12}}>{button.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
         style={{paddingLeft:15,paddingRight:15,flex:1,width:"100%",height:"10%",borderTopLeftRadius:50,borderTopRightRadius:50}} >
         
          {/* <Button title="Hide modal" onPress={toggleModal}>X</Button> */}
        </FlatList>
</View>
        

      </Modal>
      
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



