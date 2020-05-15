import React from 'react';
import { Image, BackHandler, View } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Left, Right, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';


class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation: { navigate }, route: {params : { id }}} = props
    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // We can move to any screen. If we want
    this.props.navigation.navigate('ProfileList');
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content >
        <Grid  style={{ alignItems: 'center'}} >
          <Row size={2} style={{ }}>
            {/* hi, i'm a spacer */}
          </Row>
          <Row size={1} style={{ }}>
            <Col>
              <Grid >
               <Row style={{paddingVertical: 10}}>
                 <Col size={1}>
                  {/* hi, i'm a spacer */}
                </Col>
                 <Col size={1}>
                    <Thumbnail source={require('../../../assets/images/profile_joao.jpg')}  />
                </Col>
                <Col  size={3} >
                    <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'left'}}>João</Text>
                    <Text style={{ fontSize: 14, textAlign: 'left'}}>Estudante, militante, futuro economista</Text>
                    <View style={{flexDirection: 'row', textAlign: 'left', paddingVertical: 5}}>
                      <Ionicons name="ios-thumbs-up" color="#d96235" size={17} />
                      <Text style={{ fontSize: 12, color: "#d96235"  }}> 12 </Text>
                      <Ionicons name="ios-thumbs-down" color="#d96235" size={17} />
                      <Text style={{ fontSize: 12, color: "#d96235"  }}> 5 </Text>
                    </View>
                </Col>
                <Col  size={1}>
                {/* hi, i'm a spacer */}
                </Col>
                </Row>
                <Row size={1} style={{ }}>
                    <Col size={2}>
                     {/* hi, i'm a spacer */}
                    </Col>
                    <Col  size={3}>
                      <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                      }}
                    />
                    </Col>
                    <Col size={2}>
                     {/* hi, i'm a spacer */}
                    </Col>
                </Row>
              </Grid>
            </Col>
          </Row>
          <Row size={1} style={{ }}>
            <Col size={6}>
             {/* hi, i'm a spacer */}
             <Text style={{ fontSize: 12, color: "#d96235"  }}>  </Text>
            </Col>
          </Row>
          <Row>
            <Col  size={1}>
            {/* hi, i'm a spacer */}
            </Col>
            <Col  size={4}>
              <Text  style={{ textAlign: 'center' ,fontSize: 12 }}>Bruno Vianna é um diretor cinematográfico com quatro curtas e dois longas premiados, que desde cedo se interessou pela tecnologia como linguagem.
              </Text>
            </Col>
            <Col  size={1}>
            {/* hi, i'm a spacer */}
            </Col>
          </Row>
        </Grid>
        <View style={{backgroundColor: '#fafafa'}}>
          <View style={{width: '90%',  alignSelf: 'center', paddingVertical: 15 }}>
            <Text style={{ fontSize: 17, color: "#080808"  }}>Últimas Postagens</Text>
            <Card >
              <CardItem header bordered>
                <Left>
                  <Thumbnail source={require('../../../assets/images/profile_joao.jpg')}  />
                  <Body>
                    <Text style={{ fontWeight: 'bold'}}>João</Text>
                    <Text style={{ color: 'gray'}}>há 5 minutos</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody  style={{margin: 0}}>
                <Body  >
                  <Image source={require('../../../assets/images/jabor-regrets.png')} style={{flex: 1, aspectRatio: 1, resizeMode: 'contain', alignSelf: 'center' , }} />
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
          </View>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles ={
  container: {
    paddingTop: Expo.Constants.statusBarHeight
  }
}

export default (ProfileScreen);
