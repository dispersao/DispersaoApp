
export const FETCH_SCRIPT = 'FETCH_SCRIPT'
export const FETCH_SCRIPT_SUCCESS = 'FETCH_SCRIPT_SUCCESS'
export const FETCH_SCRIPT_FAILURE = 'FETCH_SCRIPT_FAILURE'

export const POLL_FETCH_AVAILABLE_SCRIPTS = 'POLL_FETCH_AVAILABLE_SCRIPTS'

export const FETCH_AVAILABLE_SCRIPTS = 'FETCH_AVAILABLE_SCRIPTS'
export const FETCH_AVAILABLE_SCRIPTS_SUCCESS = 'FETCH_AVAILABLE_SCRIPTS_SUCCESS'
export const FETCH_AVAILABLE_SCRIPTS_ERROR = 'FETCH_AVAILABLE_SCRIPTS_ERROR'

export const STOP_FETCH_AVAILABLE_SCRIPT = 'STOP_FETCH_AVAILABLE_SCRIPT'

export const POLL_FETCH_SCRIPT_STATE = 'POLL_FETCH_SCRIPT_STATE'

export const FFETCH_SCRIPT_STATE_SUCCESS = 'FETCH_SCRIPT_STATE_SUCCESS'
export const FETCH_SCRIPT_STATE_ERROR = 'FETCH_SCRIPT_STATE_ERROR'

export const STOP_FETCH_SCRIPT_STATE = 'STOP_FETCH_SCRIPT_STATE'

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

export const pollFetchAvailableScripts = () => ({
  type: POLL_FETCH_AVAILABLE_SCRIPTS,
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

export const pollFetchScriptState = () => ({
  type: POLL_FETCH_SCRIPT_STATE,
  payload: { }
})

export const fetchScriptStateSuccess = (scripts) => ({
  type: FFETCH_SCRIPT_STATE_SUCCESS,
  payload: {
    scripts
  }
})

export const fetchScriptStateError = (error) => ({
  type: FETCH_SCRIPT_STATE_ERROR,
  payload: {
    error
  }
})

export const stopFetchScriptState = () => ({
  type: STOP_FETCH_SCRIPT_STATE,
  payload: {}
})
