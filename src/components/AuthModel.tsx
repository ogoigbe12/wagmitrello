import { View, Text } from 'react-native'
import React from 'react'
import { ModalType } from '../types/enums'

interface AuthModelProps{
  authType: ModalType | null
}

const AuthModel = ({authType}: AuthModelProps) => {
  return (
    <View>
      <Text>AuthModel</Text>
    </View>
  )
}

export default AuthModel