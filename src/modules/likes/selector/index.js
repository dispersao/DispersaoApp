import createCachedSelector from "re-reselect"

import { getId } from '../../appuser/selector'

const getState = (state) => state.likes
const getLikesIds = (state, props) => props.likes 
const getLikeIdsJSON = (state, props) => JSON.stringify(props.likes.sort())

export const getLikesByLikeIds = createCachedSelector(
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
)(getLikeIdsJSON)
