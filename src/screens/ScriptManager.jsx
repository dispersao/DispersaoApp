import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { Alert } from 'react-native' 

import { toJS } from '../utils/immutableToJs'
import {
  pollFetchScriptState,
  stopFetchScriptState,
  fetchAvailableScripts
} from '../modules/script/actions'

import { getCurrentUserScript as getAppuserScript } from '../modules/appuser/selector'

const ScriptManager = ({
  script: { state },
  children,
  pollScriptState,
  stopFetchScriptState,
  fetchAvailableScripts
}) => {

  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const goToJaba = () => {
    navigate('Jaba')
  }

  useEffect(() => {
    if (state === 'finished') {
      stopFetchScriptState()
      fetchAvailableScripts()
      Alert.alert(
        t('general.theEnd.title'), 
        t('general.theEnd.body'),
        [{
          text: 'OK',
          onPress: goToJaba
        }])
    } else {
      pollScriptState()
    }
    return stopFetchScriptState
  }, [state])

  return children
}

ScriptManager.propTypes = {
  script: PropTypes.shape({
    token: PropTypes.string,
    state: PropTypes.string
  }),
  pollScriptState: PropTypes.func,
  stopFetchScriptState: PropTypes.func,
  fetchAvailableScripts: PropTypes.func,
  children: PropTypes.node,
}

const mapStateToProps = state => ({
  script: getAppuserScript(state)
})

const mapDispatchToProps = dispatch => ({
  pollScriptState: () => dispatch(pollFetchScriptState()),
  stopFetchScriptState: () => dispatch(stopFetchScriptState()),
  fetchAvailableScripts: () => dispatch(fetchAvailableScripts())
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ScriptManager))
