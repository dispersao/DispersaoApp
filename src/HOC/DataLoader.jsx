import React, { 
  useEffect,
  useState
} from 'react'

import { 
  storeData, 
  retrieveData,
  removeData
} from '../modules/asyncStorage'

import PropTypes from 'prop-types'
import { toJS } from '../utils/immutableToJs.jsx'

import { connect } from 'react-redux'
import { Notifications } from 'expo'
import { Alert } from "react-native"

import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

import { 
  findAppUser, 
  createAppUser,
  FIND_APPUSER_ERROR,
  CREATE_APPUSER_ERROR
} from '../modules/appuser/actions'

import { 
  getId, 
  getExpotoken,
  getError as getAppuserError 
} from '../modules/appuser/selector'

import { getAvailableScripts } from '../modules/script/selector'
import { fetchAvailableScripts } from '../modules/script/actions'

import SplashScreen from '../screens/Splash/index.jsx'
import { useTranslation } from 'react-i18next'

const TIMEOUT_SPLASH = 1000

const DataLoader = ({ 
  children, 
  findUser,
  createUser,
  userError,
  userId,
  userToken,
  availableScript,
  getAvailableScripts
}) => {

  const { t } = useTranslation()

  const [timeUp, setTimeUp] = useState(false)
  const [expotoken, setExpotoken] = useState(null)
  const [storedId, setStoredId] = useState(null)
  const [creationError, setCraetionerror] = useState(false)

  const getStoredUser = async () => {
    let id = await retrieveData('appid')
    id = id && parseInt(id)
    setStoredId(id || false)
  }

  const setStoredUser = async () => {
    await storeData('appid', userId.toString())
    if(userToken ) {
      Notifications.addListener(
        notification => console.log(notification)
      )
    }
    await getStoredUser()
  }

  const fetchUser = () => {
    if (Number.isInteger(storedId)) {
      findUser({id: storedId})
    } else if (expotoken) {
      findUser({expotoken})
    } else {
      createUser({expotoken: null})
    }
  }

  const clearDataAndCreateUser = async () => {
    await removeData('appid')
    const data = {
      expotoken: (expotoken || null)
    }
    createUser(data)
  }

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
        Alert.alert(t('splash.permission'),
          t('splash.notGranted'), 
          [{
            text: 'OK',
            onPress: () => setExpotoken(false)
          }]
        )
      } else {
        let token = await Notifications.getExpoPushTokenAsync()
        setExpotoken(token)
      }
    } else {
      Alert.alert(
        t('splash.permission'),
        t('splash.notDevice'), 
        [{
          text: 'OK',
          onPress: () => setExpotoken(false)
        }]
      )
    }
  }

  useEffect(() => {
    if (!availableScript) {
      getAvailableScripts()
    }

    getStoredUser()
    registerForPushNotificationsAsync()

    const timer = setTimeout(() => {
      setTimeUp(true)
    }, TIMEOUT_SPLASH)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!userId && expotoken!== null && storedId!== null) {
      fetchUser()
    }
  }, [expotoken, storedId])

  useEffect(() => {
    if(userError?.type === FIND_APPUSER_ERROR) {
      clearDataAndCreateUser()
    } else if (userError?.type === CREATE_APPUSER_ERROR) {
      Alert.alert(
        t('general.error.title'),
        t('general.error.userCreation'), 
        [{
          text: 'OK',
          onPress: () => setCraetionerror(true)
        }]
      )
    }
  }, [userError])

  useEffect(() => {
    if (userId && userId !== storedId) {
      setStoredUser()
    }
  }, [userId])

  const userStored = (userId && storedId && userId === storedId) || creationError

  if (timeUp && availableScript && userStored) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return  <SplashScreen />
  }
}

DataLoader.propTypes = {
  children: PropTypes.node,
  findUser: PropTypes.func,
  createUser: PropTypes.func,
  userId: PropTypes.number,
  userToken: PropTypes.string,
  userError: PropTypes.object
}

const mapStateToProps = (state) => ({
  userId: getId(state),
  userToken : getExpotoken(state),
  availableScript: getAvailableScripts(state),
  userError: getAppuserError(state)
})

const mapDispatchToProps = (dispatch) => ({
  findUser: (search) => dispatch(findAppUser(search)),
  createUser: (data) => dispatch(createAppUser(data)),
  getAvailableScripts: () => dispatch(fetchAvailableScripts()),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DataLoader))
