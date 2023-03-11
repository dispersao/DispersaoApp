export const LIKES_FETCH_SUCCESS = 'LIKES_FETCH_SUCCESS'
export const LIKE_CREATE = 'LIKE_CREATE'
export const LIKE_CREATED_SUCCESS = 'LIKE_CREATED_SUCCESS'
export const LIKE_DELETE = 'LIKE_DELETE'
export const LIKE_DELETED_SUCCESS = 'LIKE_DELETED_SUCCESS'
export const LIKE_UPDATE = 'LIKE_UPDATE'
export const LIKE_UPDATED_SUCCESS = 'LIKE_UPDATED_SUCCESS'

export const likesFetchSuccess = (likes) => ({
  type: LIKES_FETCH_SUCCESS,
  payload: {
    likes
  }
})

export const likeCreate = (like) => ({
  type: LIKE_CREATE,
  payload: {
    like
  }
})

export const likeCreatedSuccess = (like) => ({
  type: LIKE_CREATED_SUCCESS,
  payload: {
    like
  }
})

export const likeDelete = (like) => ({
  type: LIKE_DELETE,
  payload: {
    like
  }
})

export const likeDeletedSuccess = (like) => ({
  type: LIKE_DELETED_SUCCESS,
  payload: {
    like
  }
})

export const likeUpdate = (like) => ({
  type: LIKE_UPDATE,
  payload: {
    like
  }
})

export const likeUpdatedSuccess = (like) => ({
  type: LIKE_UPDATED_SUCCESS,
  payload: {
    like
  }
})


