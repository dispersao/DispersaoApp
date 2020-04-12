import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from './src/store'

import Dataloader from './src/HOC/DataLoader.jsx'
import AppScreen from './src/screens/AppScreen.jsx'
import JabaScreen from './src/screens/Jaba/index.jsx'
import TokenScreen from './src/screens/Token/index.jsx'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <Dataloader>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Jaba" component={JabaScreen} />
            <Stack.Screen name="Token" component={TokenScreen} />
            <Stack.Screen name="App" component={AppScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Dataloader>
    </Provider>
  )
}
