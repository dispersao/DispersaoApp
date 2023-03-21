import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'

import { CommonActions } from '@react-navigation/native'

import { Container, Content } from 'native-base'

import { Row, Grid } from 'react-native-easy-grid'

import { toJS } from '../../utils/immutableToJs.jsx'

import SmallLogo from '../../components/smallLogo'
import TokenCheck from './components/TokenCheck.jsx'
import { getCurrentUserScript as getAppuserScript } from '../../modules/appuser/selector'
import BackButton from '../../components/ui/BackButton.jsx'

const TokenScreen = ({ navigation, userScript }) => {
  const acceptedState = ['started', 'paused', 'playing']
  const playingScript = userScript && acceptedState.includes(userScript.state)

  useEffect(() => {
    if (playingScript) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'App'
            }
          ]
        })
      )
    }
  }, [userScript])

  return (
    <Container style={styles.container}>
      <BackButton onPress={navigation.goBack} darkMode={true} />
      <Content contentContainerStyle={styles.contentStyles}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <Grid style={styles.grid}>
            <Row size={1} />
            <Row size={4}>
              <SmallLogo />
            </Row>
            <TokenCheck />
            <Row size={1} />
          </Grid>
        </KeyboardAvoidingView>
      </Content>
      <StatusBar style="light" />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    paddingHorizontal: 10
  },
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

const mapStateToProps = state => ({
  userScript: getAppuserScript(state)
})

export default connect(mapStateToProps, null)(toJS(TokenScreen))
