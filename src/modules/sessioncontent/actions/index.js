export const SESSIONCONTENTS_FETCH = 'SESSIONCONTENT_FETCH'
export const SESSIONCONTENTS_FETCH_SUCCESS = 'SESSIONCONTENT_FETCH_SUCCESS'
export const SESSIONCONTENTS_FETCH_ERROR = 'SESSIONCONTENT_FETCH_ERROR'
export const SESSIONCONTENT_VIEWED = 'SESSIONCONTENT_VIEWED'

export const sessioncontentsFetch = ({script, types}) => ({
  type: SESSIONCONTENTS_FETCH,
  payload: {
    types
  }
})

export const sessioncontentsFetchSuccess = (sessioncontents, { fetched_at }) => ({
  type: SESSIONCONTENTS_FETCH_SUCCESS,
  payload: {
    sessioncontents,
    fetched_at
  }
})

export const sessioncontentsFetchError = (error) => ({
  type: SESSIONCONTENTS_FETCH_ERROR,
  payload: {
    error
  }
})

export const sessioncontentViewed = (sessioncontent) => ({
  type: SESSIONCONTENT_VIEWED,
  payload: {
    sessioncontent
  }
})
