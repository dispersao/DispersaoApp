export const FIND_OR_CREATE_APPUSER = 'FIND_OR_CREATE_APPUSER'
export const CREATE_APPUSER_SUCCESS = 'CREATE_APPUSER_SUCCESS'
export const CREATE_APPUSER_ERROR = 'CREATE_APPUSER_ERROR'
export const FIND_APPUSER_SUCCESS = 'FIND_APPUSER_SUCCESS'
export const FIND_APPUSER_ERROR = 'FIND_APPUSER_ERROR'

export const findOrCreateAppUser = ({expotoken}) => ({
  type: FIND_OR_CREATE_APPUSER,
  payload: {
    expotoken
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
