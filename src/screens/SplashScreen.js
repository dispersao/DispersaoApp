import React from 'react';
import { Image } from 'react-native';
import { Container, Content} from 'native-base';

class SplashScreen extends React.Component {
  performWait = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        500
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performWait();

    // const fontLoaded =   await Font.loadAsync({ FontAwesome, Entypo});

    if ((data !== null)/*&&(fontLoaded!==null)*/) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.viewStyles}>
          <Image source={require('../../assets/images/dispersao_splash.png')} />
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
    backgroundColor: 'black'
  }
}

export default (SplashScreen);
