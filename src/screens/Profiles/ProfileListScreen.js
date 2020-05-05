import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail} from 'native-base';


class ProfileListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content >
          <Card >
            <CardItem  button onPress={() => this.props.navigation.navigate("Profile")}>
              <Left>
                <Thumbnail source={require('../../../assets/images/profile_joao.jpg')}  />
                <Body>
                  <Text style={{ fontWeight: 'bold'}}>João</Text>
                </Body>
              </Left>
              <Right>
                <Text style={{color: "#d96235"}}>ver perfil</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


export default (ProfileListScreen);
