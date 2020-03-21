import React from 'react'
import { connect } from 'react-redux'
import { getToken } from '../../modules/script/selector'

import {
  Container,
  Content,
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
import Informative from './components/Informative.jsx'
import SiteLink from '../../components/socialMedia/site'
import InitButton from './components/InitButton.jsx'

const styles = StyleSheet.create({
  contentStyles: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  paddingRow: {
    paddingHorizontal: 10
  },
  grid: {
    alignItems: 'center'
  }
})

const JabaScreen = ({
  token
}) => {
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
          <Row size={1} style={styles.paddingRow}>
            <ButtonRow socialMedias={socialMedia} />
          </Row>
          <Row size={1}>
            <SiteLink />
          </Row>
          {token &&
            <Row size={1} style={styles.paddingRow}>
              <InitButton />
            </Row>
          }
        </Grid>
      </Content>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  token: getToken(state)
})

export default connect(
  mapStateToProps,
  null
)(JabaScreen)
