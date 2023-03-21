import React, { useState, useEffect, useCallback } from 'react'
import { toJS } from '../../utils/immutableToJs.jsx'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen'

import SplashScreen from '../../screens/Splash/index.jsx'
const TIMEOUT_SPLASH = 500

import { getAvailableScripts } from '../../modules/script/selector'
import { fetchAvailableScripts } from '../../modules/script/actions'

import NotificationManager from './NotificationManager.jsx'
import UserCreator from './UserCreator.jsx'
preventAutoHideAsync()

const UserManager = ({ children, availableScript, getAvailableScripts }) => {
  const [timeUp, setTimeUp] = useState(false)
  const [expotoken, setExpotoken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!availableScript) {
      getAvailableScripts()
    }

    const timer = setTimeout(() => {
      setTimeUp(true)
    }, TIMEOUT_SPLASH)

    return () => {
      //console.log('clear timer')
      clearTimeout(timer)
    }
  }, [])

  const tokenFetched = useCallback(token => {
    setExpotoken(token)
  })

  const userFetched = useCallback((user, error) => {
    if (user) {
      // console.log('setting the user')
      setUserId(user)
    } else {
      // console.log('userFetched', error, user)
    }
  })

  useEffect(() => {
    if (timeUp && availableScript && userId) {
      setReady(true)
      hideAsync()
    }
  }, [timeUp, availableScript, userId])

  return (
    <>
      <NotificationManager expotoken={expotoken} onToken={tokenFetched}>
        {expotoken !== null && (
          <UserCreator expotoken={expotoken} onUser={userFetched} />
        )}
        {(ready && children) || null}
        {/*(!ready && 
      )|| null*/}
      </NotificationManager>
    </>
  )
}

UserManager.propTypes = {
  availableScript: PropTypes.object,
  getAvailableScripts: PropTypes.func
}

const mapStateToProps = state => ({
  availableScript: getAvailableScripts(state)
})

const mapDispatchToProps = dispatch => ({
  getAvailableScripts: () => dispatch(fetchAvailableScripts())
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(UserManager))
