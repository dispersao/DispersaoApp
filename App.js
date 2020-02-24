import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Text } from 'native-base';
import { Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux'
import store from './src/store';

import Dataloader from './src/modules/script/components/DataLoader.jsx';

import FeedScreen from './src/screens/FeedScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileListScreen from './src/screens/ProfileListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InfoScreen from './src/screens/InfoScreen';
import LanguageScreen from './src/screens/LanguageScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <Dataloader>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
              let iconName;
              let routeName = route.name;
              if (routeName === 'Feed') {
                iconName = 'ios-paper'; //Ionicons
              } else if (routeName === 'Notifications') {
                iconName = 'ios-notifications';
              } else if (routeName === 'Profiles') {
                iconName = 'ios-people';
              } else if (routeName === 'Info') {
                iconName = 'ios-information-circle';
              } else if (routeName === 'Language') {
                iconName = 'ios-globe';
              }
              return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
          })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profiles" component={ProfileListScreen} />
            <Tab.Screen name="Language" component={LanguageScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Dataloader>
    </Provider>
  );
}
