export const COMMENTS_FETCH_SUCCESS = 'COMMENTS_FETCH_SUCCESS'

export const commentsFetchSuccess = (comments) => ({
  type: COMMENTS_FETCH_SUCCESS,
  payload: {
    comments
  }
})
