import { View, Text } from 'react-native'
import React from 'react' 

export default function Index () {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }} >
      <Text>Hello supabase and clerk</Text>
    </View>
  )
}