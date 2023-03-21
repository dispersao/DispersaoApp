import React, { 
  useEffect,
  useState
} from 'react'

import { 
  storeData, 
  retrieveData,
  removeData
} from '../../modules/asyncStorage'

import PropTypes from 'prop-types'
import { toJS } from '../../utils/immutableToJs.jsx'

import { connect } from 'react-redux'

import { Alert, BackHandler } from "react-native"

import { getCurrentLanguage } from '../../translations/i18next'

import { 
  findAppUser, 
  createAppUser,
  FIND_APPUSER_ERROR,
  CREATE_APPUSER_ERROR
} from '../../modules/appuser/actions'

import { 
  getId,
  getError as getAppuserError 
} from '../../modules/appuser/selector'

import { useTranslation } from 'react-i18next'

const UserCreator = ({ 
  children, 
  findUser,
  createUser,
  userError,
  userId,
  expotoken,
  onUser
}) => {

  const { t } = useTranslation()

  const [storedId, setStoredId] = useState(null)
  const [creationError, setCraetionerror] = useState(false)

  const getStoredUser = async () => {
    let id = await retrieveData('appid')
    id = id && parseInt(id)
    setStoredId(id || false)
  }

  const setStoredUser = async () => {
    await storeData('appid', userId.toString())
    await getStoredUser()
  }

  const fetchUser = async () => {
    if (Number.isInteger(storedId)) {
      findUser({id: storedId})
    } else if (expotoken) {
      findUser({expotoken})
    } else {
      const locale = getCurrentLanguage()
      createUser({ expotoken: null, locale })
    }
  }

  const clearDataAndCreateUser = async () => {
    await removeData('appid')
    const locale = getCurrentLanguage()
    const data = {
      expotoken: (expotoken || null),
      locale
    }
    createUser(data)
  }

  useEffect(() => {
    getStoredUser()
  }, [])

  useEffect(() => {
    if (!userId && storedId!== null) {
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
          onPress: () => {
            setCraetionerror(true)
            BackHandler.exitApp()
          }
        }]
      )
    }
  }, [userError])

  useEffect(() => {
    if (userId && userId !== storedId) {
      setStoredUser()
    }
  }, [userId])

  useEffect(() => {
    if(userId && storedId && userId === storedId){
      onUser(userId)
    } else if(creationError) {
      onUser(null, creationError)
    }
  }, [userId, storedId, creationError])

  return (<>{children}</>)
}

UserCreator.propTypes = {
  children: PropTypes.node,
  findUser: PropTypes.func,
  createUser: PropTypes.func,
  userId: PropTypes.number,
  userError: PropTypes.object,
  expotoken: PropTypes.string,
  onUser: PropTypes.func
}

const mapStateToProps = (state) => ({
  userId: getId(state),
  userError: getAppuserError(state)
})

const mapDispatchToProps = (dispatch) => ({
  findUser: (search) => dispatch(findAppUser(search)),
  createUser: (data) => dispatch(createAppUser(data)),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(UserCreator))
