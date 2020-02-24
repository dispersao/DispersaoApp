import React, { 
  useEffect,
  useState
} from 'react'

import PropTypes from 'prop-types'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { connect } from 'react-redux'
import { fetchScript } from '../actions'

import {
  getLoaded
} from '../selector'

import SplashScreen from './SplashScreen.jsx'

const TIMEOUT_SPLASH = 3000

const DataLoader = ({ 
  children, 
  loaded, 
  fetchScriptData,
}) => {

  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    if (!loaded) {
      fetchScriptData()
    }
  }, [loaded])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeUp(true)
    }, TIMEOUT_SPLASH)
    return () => {
      clearTimeout(timer)
    }
  }, [])


  return (
    <>
      {loaded && timeUp && children} 
      {(!loaded || !timeUp) &&
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
