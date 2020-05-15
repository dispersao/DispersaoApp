export const SESSIONCONTENTS_FETCH = 'SESSIONCONTENT_FETCH'
export const SESSIONCONTENTS_FETCH_SUCCESS = 'SESSIONCONTENT_FETCH_SUCCESS'
export const SESSIONCONTENTS_FETCH_ERROR = 'SESSIONCONTENT_FETCH_ERROR'

export const sessioncontentsFetch = ({script, types}) => ({
  type: SESSIONCONTENTS_FETCH,
  payload: {
    types
  }
})

export const sessioncontentsFetchSuccess = (sessioncontents) => ({
  type: SESSIONCONTENTS_FETCH_SUCCESS,
  payload: {
    sessioncontents
  }
})

export const sessioncontentsFetchError = (error) => ({
  type: SESSIONCONTENTS_FETCH_ERROR,
  payload: {
    error
  }
}) 
