import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedScreen from './Feed/index.jsx'
import ProfileHub from './Profiles/index.jsx'
import InfoScreen from './Info/index.jsx'
import LanguageScreen from '../screens/Languages/index.jsx'
import { Ionicons } from '@expo/vector-icons'

import { connect } from 'react-redux'

import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

import { toJS } from '../utils/immutableToJs'

import { getLastInteractedNotification } from '../modules/notification/selector'
import { getBadgeCount } from '../modules/notification/selector'
const Tab = createBottomTabNavigator()

const AppScreen = ({
  interactedNotification,
  feedBadgeCount
}) => {

  const { navigate } = useNavigation()

  useEffect(() => {
    if(interactedNotification) {
      navigate('Feed', {
        interacted: interactedNotification
      })
    }
  }, [JSON.stringify(interactedNotification)])

  return (
    <>
      <StatusBar style="dark" />
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
            component={FeedScreen}
            options={{ tabBarBadge: feedBadgeCount || null }}
             />
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
      </>
  )
}

const mapStateToProps = (state) => ({
  interactedNotification: getLastInteractedNotification(state),
  feedBadgeCount: getBadgeCount(state)
})

 export default connect(mapStateToProps)(toJS(AppScreen))
