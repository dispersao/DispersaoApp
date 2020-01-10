import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


class ProfileScreen extends React.Component {


  render() {
    return (
      <Container>
        <Content >
        <Grid  style={{ alignItems: 'center'}} >
          <Row size={1} style={{ }}>
            {/* hi, i'm a spacer */}
          </Row>
          <Row size={1} style={{ }}>
            <Grid style={{width: '50%'}}>
             <Row>
               <Col>
                {/* hi, i'm a spacer */}
              </Col>
               <Col>
                <Left>
                  <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
                  <Body>
                    <Text style={{ fontWeight: 'bold', fontSize: 22}}>João</Text>
                    <Text style={{ }}>Estudante, militante, futuro economista</Text>
                  </Body>
                  </Left>
              </Col>
              <Col>
                {/* hi, i'm a spacer */}
              </Col>
              </Row>
            </Grid>
          </Row>
        </Grid>
        <Card >
            <CardItem >
              <Left>
                <Thumbnail source={require('../../assets/images/profile_joao.jpg')}  />
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


export default (ProfileScreen);
