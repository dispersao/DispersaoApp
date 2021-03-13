export const CREATE_APPUSER = 'CREATE_APPUSER'
export const CREATE_APPUSER_SUCCESS = 'CREATE_APPUSER_SUCCESS'
export const CREATE_APPUSER_ERROR = 'CREATE_APPUSER_ERROR'

export const FIND_APPUSER = 'FIND_APPUSER'
export const FIND_APPUSER_SUCCESS = 'FIND_APPUSER_SUCCESS'
export const FIND_APPUSER_ERROR = 'FIND_APPUSER_ERROR'

export const UPDATE_APPUSER = 'UPDATE_APPUSER'
export const UPDATE_APPUSER_SUCCESS = 'UPDATE_APPUSER_SUCCESS'
export const UPDATE_APPUSER_ERROR = 'UPDATE_APPUSER_ERROR'

export const findAppUser = (search) => ({
  type: FIND_APPUSER,
  payload: {
    ...search
  }
})

export const createAppUser = ({expotoken, locale}) => ({
  type: CREATE_APPUSER,
  payload: {
    expotoken,
    locale
  }
})

export const createAppuserSuccess = (appuser) => ({
  type: CREATE_APPUSER_SUCCESS,
  payload: {
    appuser
  }
})

export const createAppuserError = (error) => ({
  type: CREATE_APPUSER_ERROR,
  payload: {
    error
  }
})


export const findAppuserSuccess = (appuser) => ({
  type: FIND_APPUSER_SUCCESS,
  payload: {
    appuser
  }
})

export const findAppuserError = (error) => ({
  type: FIND_APPUSER_ERROR,
  payload: {
    error
  }
})

export const updateAppuser = (appuser) => ({
  type: UPDATE_APPUSER,
  payload: {
    appuser
  }
})

export const updateAppuserSuccess = (appuser) => ({
  type: UPDATE_APPUSER_SUCCESS,
  payload: {
    appuser
  }
})


export const updateAppuserError = (error) => ({
  type: UPDATE_APPUSER_ERROR,
  payload: {
    error
  }
})
