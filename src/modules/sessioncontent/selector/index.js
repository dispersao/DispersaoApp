import createCachedSelector from 're-reselect'
import { createArraySelector } from '../../../utils/selectorsUtils'
import { ensureState } from 'redux-optimistic-ui'

export const getState = state => ensureState(state.sessioncontents).get('data')
const getType = (state, props) => props.type
const getTypes = (state, props) => props.types
const getId = (state, props) => props.id
const getTypesJSON = (state, props) => JSON.stringify(props.types)
const getTypeAndIdJSON = (state, props) =>
  JSON.stringify({ [props.type]: props.id })

export const getLoading = state =>
  ensureState(state.sessioncontents).get('loading')
export const getFetchedAt = state =>
  ensureState(state.sessioncontents).get('fetched_at')

export const getSessioncontentListByType = createCachedSelector(
  [getState, getTypes],
  (sessioncontents, types) => {
    if (!sessioncontents) {
      return
    }
    return sessioncontents
      .filter(
        sescon => !types || !types.length || types.some(t => sescon.get(t))
      )
      .sort(
        (a, b) => new Date(b.get('updated_at')) - new Date(a.get('updated_at'))
      ).valueSeq()
  }
)({
  selectorCreator: createArraySelector,
  keySelector: getTypesJSON
})

export const getSessioncontentByContentId = createCachedSelector(
  [getState, getType, getId],
  (sessioncontents, type, contentId) => {
    if (!sessioncontents) {
      return
    }
    return sessioncontents.find(sescon => sescon.get(type) === contentId)
  }
)(getTypeAndIdJSON)

export const getSessionContentViewed = createCachedSelector(
  [getState, getId],
  (sessioncontents, id) => {
    if (!sessioncontents || !id) {
      return
    }
    return sessioncontents.get(id.toString()).get('viewed')
  }
)(getId)
