import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getScript as getAppuserScript } from '../../modules/appuser/selector'
import { getAvailableScripts } from '../../modules/script/selector'
import { toJS } from '../../utils/immutableToJs.jsx'

import {
  pollFetchAvailableScripts,
  stopFetchAvailableScripts
} from '../../modules/script/actions'

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
  userScript,
  availableScript,
  pollAvailableScripts,
  haveAvailableScripts,
  navigation,
}) => {
  

  useEffect(()=> {
    if (userScript) {
      navigation.navigate('App')
    }
  }, [])

  useEffect(() => {
    console.log('in useEffect', availableScript.amount)
    if (availableScript.amount) {
      haveAvailableScripts()
    } else {
      pollAvailableScripts()
    }
    return haveAvailableScripts
  }, [availableScript])
  

  const socialMedia = ['facebook', 'instagram', 'twitter']

  return (
    <Container >
      <Content contentContainerStyle={styles.contentStyles}>
        {(!userScript || userScript.state === 'finished') && 
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
            {availableScript.amount > 0 &&
              <Row size={1} style={styles.paddingRow}>
                <InitButton 
                  navigation={navigation} />
              </Row>
            }
          </Grid>
        }
      </Content>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  userScript: getAppuserScript(state),
  availableScript: getAvailableScripts(state)
})

const mapDispatchToProps = (dispatch) => ({
  haveAvailableScripts: () => dispatch(stopFetchAvailableScripts()),
  pollAvailableScripts: () => dispatch(pollFetchAvailableScripts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(JabaScreen))
