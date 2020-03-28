
export const FETCH_SCRIPT = 'FETCH_SCRIPT'
export const FETCH_SCRIPT_SUCCESS = 'FETCH_SCRIPT_SUCCESS'
export const FETCH_SCRIPT_FAILURE = 'FETCH_SCRIPT_FAILURE'

export const FETCH_AVAILABLE_SCRIPTS = 'FETCH_AVAILABLE_SCRIPTS'
export const FETCH_AVAILABLE_SCRIPTS_SUCCESS = 'FETCH_AVAILABLE_SCRIPTS_SUCCESS'
export const FETCH_AVAILABLE_SCRIPTS_ERROR = 'FETCH_AVAILABLE_SCRIPTS_ERROR'

export const STOP_FETCH_AVAILABLE_SCRIPT = 'STOP_FETCH_AVAILABLE_SCRIPT'

export const fetchScript = () => ({
  type: FETCH_SCRIPT,
  payload: {}
})

export const fetchScriptSuccess = (scripts) => ({
  type: FETCH_SCRIPT_SUCCESS,
  payload: {
    scripts
  }
})

export const fetchScriptFailure = (error) => ({
  type: FETCH_SCRIPT_FAILURE,
  payload: {
    error
  }
})

export const fetchAvailableScripts = () => ({
  type: FETCH_AVAILABLE_SCRIPTS,
  payload: {}
})


export const fetchAvailableScriptsSuccess = (amount) => ({
  type: FETCH_AVAILABLE_SCRIPTS_SUCCESS,
  payload: {
    amount
  }
})

export const fetchAvailableScriptsError = (error) => ({
  type: FETCH_AVAILABLE_SCRIPTS_ERROR,
  payload: {
    error
  }
})

export const stopFetchAvailableScripts = () => ({
  type: STOP_FETCH_AVAILABLE_SCRIPT,
  payload: {}
})
