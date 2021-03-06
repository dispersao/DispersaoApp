import createCachedSelector from 're-reselect'

export const getState = (state) => state.sessioncontents.get('data')
const getType = (state, props) => props.type
const getTypes = (state, props) => props.types
const getId = (state, props) => props.id
const getTypesJSON = (state, props) => JSON.stringify(props.types)
const getTypeAndIdJSON = (state, props) => JSON.stringify({ [props.type] : props.id })

export const getLoading = (state) => state.sessioncontents.get('loading')
export const getFetchedAt = (state) => state.sessioncontents.get('fetched_at')

export const getSessioncontentListByType = createCachedSelector(
  [getState, getTypes],
  (sessioncontents, types) => {
    if (!sessioncontents) {
      return
    }
    return sessioncontents
      .filter(sescon => !types || !types.length || types.some(t => sescon.get(t)))
      .valueSeq()
  }
)(getTypesJSON)

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
