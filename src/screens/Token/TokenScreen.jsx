import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'

import {
  Container,
  Content,
} from 'native-base'

import {
  Row,
  Grid
} from 'react-native-easy-grid'

import { toJS } from '../../utils/immutableToJs.jsx'

import Logo from '../../components/logo'
import TokenCheck from './components/TokenCheck.jsx'
import { getScript as getAppuserScript } from '../../modules/appuser/selector'

const TokenScreen = ({
  navigation,
  script
}) => {

  useEffect(() => {
    if (script) {
      navigation.navigate('App')
    }
  }, [script])

  return (
    <Container >
      <Content contentContainerStyle={styles.contentStyles}>
        <Grid style={styles.grid} >
          <Row size={1} />
          <Row size={5}>
            <Logo />
          </Row>
          <TokenCheck />
        </Grid>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  contentStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: '100%'
  },
  paddingRow: {
    paddingHorizontal: 10
  },
  grid: {
    alignItems: 'center'
  },
  textRow: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 15, 
    color: '#D96235', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})


const mapStateToProps = (state) => ({
  script: getAppuserScript(state)
})

export default connect(
  mapStateToProps,
  null
)(toJS(TokenScreen))
