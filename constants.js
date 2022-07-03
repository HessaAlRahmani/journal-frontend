export const theme={
    lightGrey:"#F6F6F6",
    grey:"#D9D9D9",
    darkGrey:"#696969",
    primary:"yellow",
    danger:"#EB7070",
    success:"#2FA83B",
    bigLabel:{ 
        size:"24",
    },
    BoldBigLabel:{ 
        size:"24",
        weight:"bold"
    },
    Label:{ 
        size:"18",
    },
    BoldLabel:{ 
        size:"18",
        weight:"bold"
    },
    smlLabel:{ 
        size:"16",

    },
    smlLabel:{ 
        size:"16",
        weight:"bold"
    },
    xsmlLabel:{ 
        size:"14",
    },
}

import { View, Text } from 'react-native'
import React from 'react'

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