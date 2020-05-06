import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileList from './ProfileList.jsx'
import ProfileScreen from './ProfileScreen'

const ProfileHub = () => {
  const Stack = createStackNavigator()

  return (
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
  )
}

export default ProfileHub
