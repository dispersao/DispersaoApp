import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedScreen from './Feed/index.jsx'
import NotificationsScreen from './NotificationsScreen'
import ProfileHub from './Profiles/index.jsx'
import InfoScreen from './Info/index.jsx'
import LanguageScreen from '../screens/Languages/index.jsx'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const AppScreen = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {
          let iconName
          let routeName = route.name
          if (routeName === 'Feed') {
            iconName = 'ios-paper' //Ionicons
          } else if (routeName === 'Notifications') {
            iconName = 'ios-notifications'
          } else if (routeName === 'Profiles') {
            iconName = 'ios-people'
          } else if (routeName === 'Info') {
            iconName = 'ios-information-circle'
          } else if (routeName === 'Language') {
            iconName = 'ios-globe'
          }
          return (
          <Ionicons 
            name={iconName} 
            size={25} 
            color={color}
            />)
        },
      })}
        tabBarOptions={{
          activeTintColor: 'rgb(217, 98, 53)',
          inactiveTintColor: 'gray',
          activeBackgroundColor: 'black',
          inactiveBackgroundColor: 'black',
          showLabel: false
        }}>
        <Tab.Screen 
          name="Feed" 
          component={FeedScreen} />
        <Tab.Screen 
          name="Notifications" 
            component={NotificationsScreen} />
        <Tab.Screen 
          name="Profiles" 
          component={ProfileHub}
          unmountOnBlur={true}
          options={{
            unmountOnBlur: true
          }} />
        <Tab.Screen
          name="Info"
          component={InfoScreen}
        />
        <Tab.Screen 
          name="Language" 
          component={LanguageScreen} />
      </Tab.Navigator> 
  )
  
}
 export default AppScreen
