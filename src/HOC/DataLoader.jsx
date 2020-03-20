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

import { fetchScript } from '../modules/script/actions'
import { getLoaded } from '../modules/script/selector'

import SplashScreen from '../screens/Splash/SplashScreen.jsx'


const TIMEOUT_SPLASH = 3000

const DataLoader = ({ 
  children, 
  loaded, 
  fetchScriptData
}) => {

  const [timeUp, setTimeUp] = useState(false)

  const [expoToken, setExpoToken] = useState(null)


  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        )
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return
      }
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  const registerExpoToken = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    setExpoToken(token)
  }

  _handleNotification = notification => {
    // Vibration.vibrate()
    console.log(notification)
  };

  useEffect(() => {
    if (!loaded) {
      fetchScriptData()
    }
  }, [loaded])

  useEffect(() => {
    registerForPushNotificationsAsync()

    registerExpoToken()
    
    Notifications.addListener(
      _handleNotification
    )

    const timer = setTimeout(() => {
      setTimeUp(true)
    }, TIMEOUT_SPLASH)
    return () => {
      clearTimeout(timer)
    }
  }, [])


  return (
    <>
      {loaded && timeUp && expoToken && 
        children
      } 
      {(!loaded || !timeUp || !expoToken) &&
        <SplashScreen />
      }
    </>
  )
}

DataLoader.propTypes = {
  children: PropTypes.object,
  loaded: PropTypes.bool,
  fetchScriptData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    loaded: getLoaded(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchScriptData: () => dispatch(fetchScript()),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DataLoader))
