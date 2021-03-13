import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from './src/store'

import UserManager from './src/HOC/UserManager/index.jsx'
import AppScreen from './src/screens/AppScreen.jsx'
import JabaScreen from './src/screens/Jaba/index.jsx'
import TokenScreen from './src/screens/Token/index.jsx'

import { preventAutoHideAsync } from 'expo-splash-screen'

import i18n from './src/translations/i18next'

export default function App() {
  
  const [i18nready, seti18nReady] = useState(false)
  
  i18n.on('initialized', () => {
    seti18nReady('true')
  })

  useEffect(()=> {
    try{
      preventAutoHideAsync()
    } catch(e) {
      console.warn(e)
    }
  })

  const Stack = createStackNavigator()
  
  return (
    <Provider store={store}>
      { i18nready && 
        <UserManager>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
              >
              <Stack.Screen name="Jaba" component={JabaScreen} />
              <Stack.Screen name="Token" component={TokenScreen} />
              <Stack.Screen name="App" component={AppScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserManager>
      }
    </Provider>
  )
}
