export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS'

export const postsFetchSuccess = (posts) => ({
  type: POSTS_FETCH_SUCCESS,
  payload: {
    posts
  }
})
