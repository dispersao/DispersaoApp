import React from 'react'

import { 
  Container, 
  Content, 
  Button 
} from 'native-base'

import { 
  Row, 
  Grid 
} from 'react-native-easy-grid'

import { 
  Text, 
  StyleSheet 
} from 'react-native'

import Logo from '../../components/logo'
import ButtonRow from '../../components/socialMedia/ButtonRow.jsx'
import Informative from './Informative.jsx'
import SiteLink from '../../components/socialMedia/site'

const styles = StyleSheet.create({
  contentStyles: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  mediaRow: {
    paddingHorizontal: 10
  },
  grid: {
    alignItems: 'center'
  }
})

class JabaScreen extends React.Component {

  render() {
    const socialMedia = ['facebook', 'instagram', 'twitter']

    return (
      <Container >
        <Content contentContainerStyle={styles.contentStyles}>
          <Grid style={styles.grid} >
          <Row size={1} />
            <Row size={5}>
              <Logo />
            </Row>
            <Row size={1}>
              <Informative />
            </Row>
            <Row size={1} style={styles.mediaRow}>
              <ButtonRow socialMedias={socialMedia}/>
            </Row>
            <Row size={1}>
              <SiteLink />
            </Row>
            <Row size={1} style={{ paddingHorizontal: 10 }}>
              <Button rounded style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(217, 98, 53)' }} onPress={this.myPress}>
                <Text style={{ fontSize: 15, color: 'white', justifyContent: 'center', alignItems: 'center' }}>Iniciar</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default (JabaScreen)
