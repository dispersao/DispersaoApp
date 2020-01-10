import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';


class FeedScreen extends React.Component {

  render() {
    return (
      <Container>
        <Content padder>
          <Card >
            <CardItem header bordered>
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                <Body>
                  <Text style={{ fontWeight: 'bold'}}>João</Text>
                  <Text style={{ color: 'gray'}}>há 5 minutos</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody  style={{margin: 0}}>
              <Body  >
                <Image source={require('../../assets/images/jabor-regrets.png')} style={{flex: 1, aspectRatio: 1, resizeMode: 'contain', alignSelf: 'center' , }} />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Left>
                <Ionicons name="ios-thumbs-up" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 12 </Text>
                <Ionicons name="ios-thumbs-down" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 5 </Text>
              </Left>
              <Right>
                <Ionicons  name="ios-chatbubbles" color="#d96235" size={17} />
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                <Body>
                  <Text style={{ fontWeight: 'bold'}}>João</Text>
                  <Text style={{ color: 'gray'}}>há 5 minutos</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody bordered>
              <Body style={{ paddingHorizontal: 5}}>
                <Text style={{ paddingBottom: 25}}> Hoje eu decidi me juntar a uma coisa muito doida com meus amigos da faculdade, chamada “bicicletada”. Nunca havia exercitado meu dever de cidadão de modo tão consciente e divertido. 😍🤩 Posso dizer que além de uma pessoa ativa, sou um ativista :P</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Left>
                <Ionicons name="ios-thumbs-up" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 12 </Text>
                <Ionicons name="ios-thumbs-down" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 5 </Text>
              </Left>
              <Right>
                <Ionicons  name="ios-chatbubbles" color="#d96235" size={17} />
              </Right>
            </CardItem>
            </Card>
            <Card>
            <CardItem header bordered>
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                <Body>
                  <Text style={{ fontWeight: 'bold'}}>João</Text>
                  <Text style={{ color: 'gray'}}>há 5 minutos</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody bordered>
              <Body style={{ paddingHorizontal: 5, paddingVertical:15}}>
                <Text  style={{ paddingBottom: 25}}> Hoje eu decidi me juntar a uma coisa muito doida com meus amigos da faculdade, chamada “bicicletada”. Nunca havia exercitado meu dever de cidadão de modo tão consciente e divertido. 😍🤩 Posso dizer que além de uma pessoa ativa, sou um ativista :P</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered >
              <Left >
                <Ionicons name="ios-thumbs-up" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 12 </Text>
                <Ionicons name="ios-thumbs-down" color="#d96235" size={17} />
                <Text style={{ fontSize: 12, color: "#d96235"  }}> 5 </Text>
              </Left>
              <Right>
                <Ionicons  name="ios-chatbubbles" color="#d96235" size={17} />
              </Right>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}

//padder contentContainerStyle={styles.cardStyles}



export default (FeedScreen);
