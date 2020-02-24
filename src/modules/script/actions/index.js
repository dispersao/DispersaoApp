export const FETCH_CONFIG = 'FETCH_CONFIG'
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS'
export const FETCH_CONFIG_FAILURE = 'FETCH_CONFIG_FAILURE'

export const FETCH_SCRIPT = 'FETCH_SCRIPT'
export const FETCH_SCRIPT_SUCCESS = 'FETCH_SCRIPT_SUCCESS'
export const FETCH_SCRIPT_FAILURE = 'FETCH_SCRIPT_FAILURE'

export const fetchConfig = () => ({
  type: FETCH_CONFIG,
  payload: {}
})

export const fetchConfigSuccess = (config) => ({
  type: FETCH_CONFIG_SUCCESS,
  payload: {
    config
  }
})

export const fetchConfigFailure = (error) => ({
  type: FETCH_CONFIG_FAILURE,
  payload: {
    error
  }
})

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
