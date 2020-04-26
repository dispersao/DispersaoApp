import React, { 
  useEffect,
  useState
} from 'react'

import PropTypes from 'prop-types'
import { toJS } from '../utils/immutableToJs.jsx'

import { connect } from 'react-redux'
import { Notifications } from 'expo'

import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

import { findOrCreateAppUser } from '../modules/appuser/actions'
import { getExpotoken } from '../modules/appuser/selector'

import { getAvailableScripts } from '../modules/script/selector'
import { fetchAvailableScripts } from '../modules/script/actions'

import SplashScreen from '../screens/Splash/index.jsx'

import i18n from '../translations/i18n'

const TIMEOUT_SPLASH = 1000

const DataLoader = ({ 
  children, 
  findOrCreateUser,
  userToken,
  availableScript,
  getAvailableScripts,
}) => {

  const [timeUp, setTimeUp] = useState(false)

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        )
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert(i18n.translate('splash.notGranted'))
        return
      }
    } else {
      alert(i18n.translate('splash.notDevice'))
    }
  }

  const setLocale = async () => {
   
  }

  const registerExpoToken = async () => {
    let token = await Notifications.getExpoPushTokenAsync()

    findOrCreateUser(token)
  }

  _handleNotification = notification => {
    // Vibration.vibrate()
    console.log(notification)
  }

  useEffect(() => {
    if (!availableScript) {
      getAvailableScripts()
    }

    registerForPushNotificationsAsync()

    registerExpoToken()
    
    Notifications.addListener(
      _handleNotification
    )

    const timer = setTimeout(() => {
      setTimeUp(true)
    }, TIMEOUT_SPLASH)

    setLocale()

    return () => {
      clearTimeout(timer)
    }
  }, [])


  return (
    <>
      {timeUp && userToken && availableScript &&
        children
      } 
      {(!timeUp || !userToken || !availableScript) &&
        <SplashScreen />
      }
    </>
  )
}

DataLoader.propTypes = {
  children: PropTypes.node,
  findOrCreateUser: PropTypes.func,
  userToken: PropTypes.string
}

const mapStateToProps = (state) => ({
  userToken: getExpotoken(state),
  availableScript: getAvailableScripts(state)
})

const mapDispatchToProps = (dispatch) => ({
  findOrCreateUser: (expotoken) => dispatch(findOrCreateAppUser({expotoken})),
  getAvailableScripts: () => dispatch(fetchAvailableScripts()),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DataLoader))
