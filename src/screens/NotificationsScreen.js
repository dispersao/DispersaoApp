import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail, View} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

class NotificationsScreen extends React.Component {

  render() {
    return (
      <Container>
        <Content padder>
          <Card >
            <CardItem header bordered>
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                <View  style={{ paddingHorizontal: 8, flexDirection: 'column'}}>
                  <View  style={{ flexDirection: 'row'}}>
                    <Text style={{ fontWeight: 'bold'}}>João</Text><Text  > atualizou o seu status</Text>
                  </View>
                  <Text style={{ color: '#999999'}}>há 5 minutos</Text>
                </View>
              </Left>
            </CardItem>
          </Card>
          <Card >
            <CardItem  bordered>
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                  <View  style={{ paddingHorizontal: 8, flexDirection: 'column'}}>
                  <View  style={{ flexDirection: 'row'}}>
                    <Text style={{ fontWeight: 'bold'}}>João</Text><Text  > atualizou o seu status</Text>
                  </View>
                  <Text style={{ color: '#999999'}}>há 5 minutos</Text>
                </View>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
}

export default (NotificationsScreen);
