import React from 'react';
import { View, Image, Text } from 'react-native';
import { Container, Icon, Header, Content, Button, Input, Item } from 'native-base';
import { Entypo, Foundation } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Linking } from 'expo';

class TokenScreen extends React.Component {




  render() {
    return (
      <Container >
	      <Content contentContainerStyle={styles.contentStyles} enableOnAndroid>
        <Grid  style={{ alignItems: 'center'}} >
          <Row size={1} style={{ }}>
            {/* hi, i'm a spacer */}
          </Row>
          <Row size={5} style={{  }}>
            <Image source={require('../../assets/images/dispersao_jaba.png')}  style={{resizeMode: 'contain',  paddingHorizontal: 50,  width: "100%", height: "100%"}} />
          </Row>
          <Row size={1} style={{ justifyContent: 'flex-start', alignItems: 'center'   /* backgroundColor: '#00CE9F' , height: 100 */}}>
            {/* hi, i'm a spacer */}
          </Row>

          <Row size={1} style={{marginVertical: 5 }}>
            <Item regular style={{width: '90%',  justifyContent: 'center', color: 'white' }}>
             <Input placeholder='Token da Sessão' autoCapitalize="characters" style={{textTransform: 'uppercase', justifyContent: 'center', color: 'white', borderColor: 'gray'}} />
            </Item>
          </Row>
          <Row size={1} style={{paddingHorizontal: 10}}>
            <Button rounded
            style={{width: '100%', justifyContent: 'center' ,  alignItems: 'center',  backgroundColor: 'rgb(217, 98, 53)' }} >
              <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center' , alignItems: 'center' }}>Começar</Text>
            </Button>
          </Row>
          <Row size={1} style={{paddingHorizontal: 10}}>
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
