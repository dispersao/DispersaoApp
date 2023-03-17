import createCachedSelector from 're-reselect'
import { ensureState } from 'redux-optimistic-ui'

export const getState = state => ensureState(state.likes).get('data')
const getSessioncontentId = (state, props) => props.id
const getId = (state, props) => props.id

export const getLoading = state => ensureState(state.likes).get('loading')

export const getLikesBySessioncontentId = createCachedSelector(
  [getState, getSessioncontentId],
  (likes, id) => {
    if (!likes || !id) {
      return
    }
    return likes.filter(l => l.get('sessioncontent') === id).valueSeq()
  }
)(getSessioncontentId)

export const getLikeByLikeId = createCachedSelector(
  [getState, getId],
  (likes, id) => {
    if (!likes || !id) {
      return
    }
    return likes.get(id.toString())
  }
)(getId)
