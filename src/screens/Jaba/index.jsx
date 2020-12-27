import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { StackActions } from '@react-navigation/native'

import { StatusBar } from 'expo-status-bar';

import Constants from 'expo-constants'

import { 
  removeData,
  retrieveData
} from '../../modules/asyncStorage'

import {
  Container,
  Content,
} from 'native-base'

import {
  Row,
  Grid
} from 'react-native-easy-grid'

import { 
  getCurrentUserScript as getAppuserScript,
  getId
 } from '../../modules/appuser/selector'
import { getAvailableScripts } from '../../modules/script/selector'
import { toJS } from '../../utils/immutableToJs.jsx'

import {
  pollFetchAvailableScripts,
  stopFetchAvailableScripts
} from '../../modules/script/actions'

import Logo from '../../components/logo'
import ButtonRow from '../../components/socialMedia/ButtonRow.jsx'
import Informative from './components/Informative.jsx'
import SiteLink from '../../components/socialMedia/site'
import InitButton from './components/InitButton.jsx'

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'white'
  },
  paddingRow: {
    paddingHorizontal: 10
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkContainer: {
    color: 'white'
  }
})

const JabaScreen = ({
  userScript,
  userId,
  availableScript,
  pollAvailableScripts,
  haveAvailableScripts,
  navigation,
}) => {

  const deleteUser = async () => {
    await removeData("appid")
    let id = await retrieveData('appid')
    console.log('is id deleted? ', id)
  }

  const { t } = useTranslation()
  const acceptedState = ['started', 'paused','playing']
  const playingScript = userScript && acceptedState.includes(userScript.state)
  const finishedScript = userScript && userScript.state === 'finished'

  useEffect(()=> {
    if (playingScript) {
      navigation.dispatch(
        StackActions.replace('App')
      )
    }
  }, [])

  useEffect(() => {
    if (availableScript.amount) {
      haveAvailableScripts()
    } else {
      pollAvailableScripts()
    }
    return haveAvailableScripts
  }, [availableScript])
  

  const socialMedia = ['facebook', 'instagram', 'twitter']

  const navigateToApp = () => {
    navigation.navigate('Token')
  }

  const initButtonText =  finishedScript ? t('jaba.restartText') : t('jaba.startText')

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        {(!userScript || userScript.state === 'finished') && 
          <Grid style={styles.grid}>
            <Row size={5}>
              <Logo />
            </Row>
           <Row size={1}>
              <InitButton 
                enabled={true}
                text={'delete user'}
                onPress={deleteUser}/>
            </Row>
            {/* <Row size={1}>
              <Informative 
                text={t('jaba.infoText')} />
            </Row>
            <Row size={1}>
              <ButtonRow socialMedias={socialMedia} />
            </Row>
            <Row size={1}>
              <Text style={styles.linkContainer}>
                <SiteLink 
                  text={t('jaba.siteLink')} />
              </Text>
            </Row> */}
            <Row size={1}>
              <InitButton 
                enabled={availableScript.amount && userId}
                text={initButtonText}
                onPress={navigateToApp}/>
            </Row>
          </Grid>
        }
      </Content>
      <StatusBar style="light" />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  userId: getId(state),
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
