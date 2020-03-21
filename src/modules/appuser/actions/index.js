export const CREATE_APPUSER = 'CREATE_APPUSER'
export const CREATE_APPUSER_SUCCESS = 'CREATE_APPUSER_SUCCESS'
export const CREATE_APPUSER_ERROR = 'CREATE_APPUSER_ERROR'

export const createAppuser = ({expotoken}) => ({
  type: CREATE_APPUSER,
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
