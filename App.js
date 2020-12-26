import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from './src/store'

import UserManager from './src/HOC/UserManager/index.jsx'
// import Dataloader from './src/HOC/DataLoader.jsx'
import AppScreen from './src/screens/AppScreen.jsx'
import JabaScreen from './src/screens/Jaba/index.jsx'
import TokenScreen from './src/screens/Token/index.jsx'

import i18n from './src/translations/i18next'

export default function App() {
  const [i18nready, seti18nReady] = useState(false)
  i18n.on('initialized', () => {
    seti18nReady('true')
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
