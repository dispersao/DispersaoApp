import React from 'react';
import { Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Text } from 'native-base';

import SplashScreen from './src/screens/SplashScreen';
import JabaScreen from './src/screens/JabaScreen';
import TokenScreen from './src/screens/TokenScreen';

import FeedScreen from './src/screens/FeedScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileListScreen from './src/screens/ProfileListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InfoScreen from './src/screens/InfoScreen';
import LanguageScreen from './src/screens/LanguageScreen';

class HomeScreen extends React.Component {



  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </Container>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </Container>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}


/*
const FeedStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});
*/

const BottomTab = createBottomTabNavigator(
  {
    Feed: { screen: FeedScreen },
    Notifications: { screen: NotificationsScreen },
    Profiles: { screen: ProfileListScreen },
    Info: { screen: InfoScreen },
    Language: { screen: LanguageScreen}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
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


        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const InitialNavigator = createSwitchNavigator({
  //temporarily jumping straight to mains. swtich back to Splash first later
  Main: BottomTab,
  Splash: SplashScreen,
  Jaba: JabaScreen,
  Token: TokenScreen,
  Profile: ProfileScreen

});

export default createAppContainer(InitialNavigator);
