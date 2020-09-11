import React from 'react'
import { Image } from 'react-native'
import { Container, Content} from 'native-base'
import { StatusBar } from 'expo-status-bar';

import { styles } from './styles/splashscreen'

const SplashScreen = () => {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.viewStyles}>
        <Image source={require('../../../assets/images/dispersao_splash.png')} />
      </Content>
      <StatusBar style="light" />
    </Container>
  )
}

export default SplashScreen
