import React from 'react';
import { View, Image, Text } from 'react-native';
import { Container, Icon, Header, Content, Button } from 'native-base';
import { Entypo, Foundation } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

class JabaScreen extends React.Component {

  myPress = () => {
    // this.setState({
    //   name: "Coulibaly"
    // });
  };


  render() {
    return (
      <Container >
	      <Content contentContainerStyle={styles.contentStyles}>
        <Grid  style={{ alignItems: 'center'}} >
          <Row size={1} style={{ }}>
            {/* hi, i'm a spacer */}
          </Row>
          <Row size={5} style={{  }}>
            <Image source={require('../../assets/images/dispersao_jaba.png')}  style={{resizeMode: 'contain',  paddingHorizontal: 50,  width: "100%", height: "100%"}} />
          </Row>
          <Row size={1} style={{ justifyContent: 'flex-start', alignItems: 'center'   /* backgroundColor: '#00CE9F' , height: 100 */}}>
            <Foundation name="info" size={32} color="rgb(217,98,53)" />
            <Text style={{ fontSize: 15, color: 'rgb(217,98,53)', justifyContent: 'center' , left: '10%', alignItems: 'center' }}>  Saiba mais sobre o filme</Text>
          </Row>
          <Row size={1} style={{paddingHorizontal: 10}}>
            <Button rounded    style={{height: 38, width: 38, justifyContent: 'center' ,  alignItems: 'center', paddingHorizontal: 2, marginHorizontal: 5, backgroundColor: 'rgb(63, 83, 245)' }} onPress={this.myPress}>
              <Entypo name="facebook" color="white" size={22} />
            </Button>
            <Button rounded    style={{height: 38, width: 38, justifyContent: 'center' ,  alignItems: 'center', paddingHorizontal: 2, marginHorizontal: 5, backgroundColor: 'rgb(198, 28 ,146)' }} onPress={this.myPress}>
              <Entypo name="instagram" color="white" size={22} />
            </Button>
            <Button rounded    style={{height: 38, width: 38, justifyContent: 'center' ,  alignItems: 'center', paddingHorizontal: 2, marginHorizontal: 5, backgroundColor: 'rgb( 88, 159, 194)' }} onPress={this.myPress}>
               <Entypo  color='white' name="twitter" size={22} />
            </Button>
          </Row>
          <Row size={1} style={{}}>
            <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center' , alignItems: 'center' }}>Conheça o site  &gt;</Text>
          </Row>
          <Row size={1} style={{paddingHorizontal: 10}}>
            <Button rounded    style={{width: '100%', justifyContent: 'center' ,  alignItems: 'center',  backgroundColor: 'rgb(217, 98, 53)' }} onPress={this.myPress}>
              <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center' , alignItems: 'center' }}>Iniciar</Text>
            </Button>
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

export default (JabaScreen);
