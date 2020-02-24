import React from 'react'
import { Image } from 'react-native'
import { Container, Content} from 'native-base'

import { styles } from './styles/splashscreen'

const SplashScreen = () => {
  return (
    <Container>
      <Content contentContainerStyle={styles.viewStyles}>
        <Image source={require('../../../../assets/images/dispersao_splash.png')} />
      </Content>
    </Container>
  )
}

export default SplashScreen
