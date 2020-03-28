import React from 'react';
import { View, Image, Text, BackHandler, Vibration } from 'react-native';
import { Container, Icon, Header, Content, Button, Input, Item } from 'native-base';
import { Entypo, Foundation } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Linking, Notifications } from 'expo';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


class TokenScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      statusText: "",
      inputText: "",
      expoPushToken: '',
      notification: {},
    };
    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  checkToken = () => {

    if (this.state.inputText !== "APP") {
      this.setState({ statusText: "Nenhuma sessão em andamento " });
    } else {
      this.props.navigation.navigate('Main');
    }
  };
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  _handleNotification = notification => {
    Vibration.vibrate()
    this.setState({ notification: notification });
  };



  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // We can move to any screen. If we want
    this.props.navigation.navigate('Jaba');
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  render() {
    return (
      <Container >
        <Content contentContainerStyle={styles.contentStyles} enableOnAndroid>
          <Grid style={{ alignItems: 'center' }} >
            <Row size={1} style={{}}>
              {/* hi, i'm a spacer */}
            </Row>
            <Row size={5} style={{}}>
              <Image source={require('../../assets/images/dispersao_jaba.png')} style={{ resizeMode: 'contain', paddingHorizontal: 50, width: "100%", height: "100%" }} />
            </Row>
            <Row size={1} style={{ justifyContent: 'flex-start', alignItems: 'center'   /* backgroundColor: '#00CE9F' , height: 100 */ }}>
              {/* hi, i'm a spacer */}
              <Text style={{ fontSize: 15, color: 'rgb(217, 98, 53)', justifyContent: 'center', alignItems: 'center' }}>{this.state.statusText}</Text>
            </Row>

            <Row size={1} style={{ marginVertical: 5 }}>
              <Item regular style={{ width: '90%', justifyContent: 'center', color: 'white' }}>
                <Input placeholder='Token da Sessão' autoCapitalize="characters" style={{ textTransform: 'uppercase', justifyContent: 'center', color: 'white', borderColor: 'gray' }}
                  onChangeText={(inputText) => this.setState({ inputText })} />
              </Item>
            </Row>

            <Row size={1} style={{ paddingHorizontal: 10 }}>
              <Button rounded
                style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(217, 98, 53)' }}
                onPress={() => { this.checkToken() }}>
                <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center', alignItems: 'center' }}>Começar</Text>
              </Button>
            </Row>

            <Row size={1} style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center', alignItems: 'center' }}>
              </Text>
            </Row>

            <Row size={1} style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center', alignItems: 'center' }}>
                {this.state.notification.data}
              </Text>
            </Row>


            <Row size={1} style={{ paddingHorizontal: 10 }}>
              {/* hi, i'm a spacer */}
            </Row>
          </Grid>

        </Content>
      </Container>
    );
  }
}

const styles = {
  contentStyles: {
    //flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
}

export default (TokenScreen);
