import React from 'react';
import { Image, View, Text } from 'react-native';
import { Container, Content} from 'native-base';
import { Linking } from 'expo';

class InfoScreen extends React.Component {
  myOpenLink = (buttonUrl) => {
    Linking.openURL(buttonUrl);
  };

  render() {
    return (
      <Container>
        <Content  style={styles.container}>
          <View style={{alignItems: 'center', paddingVertical: 30 }}>
            <Image  source={require('../../assets/images/dispersao_logo.png')} style={{ flex:1, resizeMode: 'contain' }}/>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 20, fontSize: 14}}>
            <Text style={{ paddingVertical: 10}}>Dispersão é uma experiência audiovisual interativa, com edição em tempo real, projetado para salas de exibição, onde a experiência imersiva do cinema é complementada – mas também destruída – pelas pequenas telas dos smartphones.</Text>
            <Text style={{ paddingVertical: 10}}>Através de um aplicativo que simula o funcionamento de uma rede social, o público vai interagir e interferir na narrativa da tela grande. Na maior parte do tempo, essa tela tenta atrair o espectador para a história. Mas em outros instantes, uma câmera distraída, uma cena menos intensa, pode deixar o espectador livre para o devaneio. Esses momentos, somados ao instinto mecânico de conferir o celular a todo momento, são seminais para o projeto.</Text>
            <Text style={{alignSelf: 'center', color: '#D96235'}} onPress={()=> {this.myOpenLink("https://www.dispersao.net/")}}>Conheça mais sobre o projeto no site do Dispersão.</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    marginTop: Expo.Constants.statusBarHeight
  }
}

export default (InfoScreen);
