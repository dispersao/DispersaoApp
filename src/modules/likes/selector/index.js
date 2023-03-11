import createCachedSelector from "re-reselect"

// import { getId } from '../../appuser/selector'

export const getState = (state) => state.likes.get('data')
// const getLikesIds = (state, props) => props.likes 
// const getLikeIdsJSON = (state, props) => JSON.stringify(props.likes.sort())
const getSessioncontentId = (state, props) => props.id

export const getLoading = (state) => state.likes.get('loading')

export const getLikesBySessioncontentId = createCachedSelector(
  [getState, getSessioncontentId],
  (likes, id) => {
    if (!likes || !id) {
      return
    }
    return likes
      .filter(l => l.get('sessioncontent') === id)
      .valueSeq()
  }
)(getSessioncontentId)

/*export const getLikesByLikeIds = createCachedSelector(
[getState, getLikesIds, getId],
(likes, likeIds, appuserId) => {
  if (!likes || !likeIds) {
    return
  }
  return likes
    .filter(l => likeIds.includes(l.get('id')))
    .map(l => l.get('appuser') === appuserId ? l : l.set('appuser', null))
    .valueSeq()
}
)(getLikeIdsJSON)*/
