import 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileList from './ProfileList.jsx'
import ProfileScreen from './Profile.jsx'

import ForegroundNotification from '../../components/notification'

const ProfileHub = ({ navigation }) => {
  const Stack = createStackNavigator()

  useFocusEffect(
    useCallback(() => {
      return () => navigation.setParams({ screen: undefined })
    }, [navigation])
  )
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="ProfileList" component={ProfileList} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ profileId: route.params.id })}
        />
      </Stack.Navigator>
      <ForegroundNotification />
    </>
  )
}

export default ProfileHub
