import { View, Text ,Button} from 'react-native'
import React from 'react'
import JournalEntry from "../journal/JournalItem"

export default function PinEntries({ route}) {
    const { entries } = route.params;
    let Memories=entries.map((entry) => <JournalEntry entry={entry} key={entry._id} />)

  return (
    <View>
{/* <Text>{entries.length} Memories</Text> */}
<View>{Memories}</View>
    </View>
  )
}