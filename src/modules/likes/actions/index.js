import { v4 as uuidv4 } from 'uuid'
import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui'

export const LIKES_FETCH_SUCCESS = 'LIKES_FETCH_SUCCESS'

export const LIKE_CREATE = 'LIKE_CREATE'
export const LIKE_CREATE_SUCCESS = 'LIKE_CREATE_SUCCESS'
export const LIKE_CREATE_ERROR = 'LIKE_CREATE_ERROR'

export const LIKE_DELETE = 'LIKE_DELETE'
export const LIKE_DELETE_SUCCESS = 'LIKE_DELETE_SUCCESS'
export const LIKE_DELETE_ERROR = 'LIKE_DELETE_ERROR'

export const LIKE_UPDATE = 'LIKE_UPDATE'
export const LIKE_UPDATE_SUCCESS = 'LIKE_UPDATE_SUCCESS'
export const LIKE_UPDATE_ERROR = 'LIKE_UPDATE_ERROR'

const inhanceOptimistic = (action, transaction) => ({
  ...action,
  meta: { optimistic: { type: transaction.type, id: transaction.id } }
})

export const likesFetchSuccess = likes => ({
  type: LIKES_FETCH_SUCCESS,
  payload: {
    likes
  }
})

export const likeCreate = like =>
  inhanceOptimistic(
    {
      type: LIKE_CREATE,
      payload: {
          ...like,
          id: uuidv4()
      }
    },
    { id: uuidv4(), type: BEGIN }
  )

export const likeCreateSuccess = (like, transaction) =>
  inhanceOptimistic(
    {
      type: LIKE_CREATE_SUCCESS,
      payload:  like
    },
    { id: transaction, type: COMMIT }
  )

export const likeCreateError = (error, transaction) =>
  inhanceOptimistic(
    {
      type: LIKE_CREATE_ERROR,
      payload: {
        error
      }
    },
    { id: transaction, type: REVERT }
  )

export const likeDelete = like =>
  inhanceOptimistic(
    {
      type: LIKE_DELETE,
      payload: like
    },
    { id: uuidv4(), type: BEGIN }
  )

export const likeDeleteSuccess = (like, transaction) => (
  {
    type: LIKE_DELETE_SUCCESS,
    payload: like
  },
  { id: transaction, type: COMMIT }
)

export const likeDeleteError = (error, transaction) =>
  inhanceOptimistic(
    {
      type: LIKE_DELETE_ERROR,
      payload: {
        error
      }
    },
    { id: transaction, type: REVERT }
  )

export const likeUpdate = like =>
  inhanceOptimistic(
    {
      type: LIKE_UPDATE,
      payload: like
    },
    { id: uuidv4(), type: BEGIN }
  )

export const likeUpdatedSuccess = (like, transaction) =>
  inhanceOptimistic(
    {
      type: LIKE_UPDATE_SUCCESS,
      payload: like
    },
    { id: transaction, type: COMMIT }
  )

  export const likeUpdatedError = (error, transaction) =>
  inhanceOptimistic(
    {
      type: LIKE_UPDATE_ERROR,
      payload: {
        error
      }
    },
    { id: transaction, type: REVERT }
  )
