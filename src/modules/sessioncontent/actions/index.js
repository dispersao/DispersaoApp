export const SESSIONCONTENTS_FETCH = 'SESSIONCONTENT_FETCH'
export const SESSIONCONTENTS_FETCH_SUCCESS = 'SESSIONCONTENT_FETCH_SUCCESS'
export const SESSIONCONTENTS_FETCH_ERROR = 'SESSIONCONTENT_FETCH_ERROR'
export const SESSIONCONTENT_VIEWED = 'SESSIONCONTENT_VIEWED'

export const SESSIONCONTENT_LIKES_FETCH = 'SESSIONCONTENTS_LIKES_FETCH'
export const SESSIONCONTENT_LIKES_FETCH_SUCCESS = 'SESSIONCONTENTS_LIKES_FETCH_SUCCESS'
export const SESSIONCONTENT_LIKES_FETCH_ERROR = 'SESSIONCONTENTS_LIKES_FETCH_ERROR'

export const sessioncontentsFetch = ({types}) => ({
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


export const sessioncontentLikesFetch = (sessioncontent) => {
  return {
  type: SESSIONCONTENT_LIKES_FETCH,
  payload: {
    sessioncontent
  }
}
}

export const sessioncontentLikesFetchSuccess = (sessioncontent) => ({
  type: SESSIONCONTENT_LIKES_FETCH_SUCCESS,
  payload: {
    sessioncontent
  }
})

export const sessioncontentLikesFetchError = (error) => ({
  type: SESSIONCONTENT_LIKES_FETCH_ERROR,
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
