import createCachedSelector from 're-reselect'

const getState = (state) => state.sessioncontents
const getType = (state, props) => props.type
const getTypeJSON = (state, props) => JSON.stringify(props.type)

export const getSessioncontentListByType = createCachedSelector(
  [getState, getType],
  (sessioncontents, type) => {
    if (!sessioncontents) {
      return
    }
    return sessioncontents
      .filter(sescon => !type || !type.length || type.some(t => sescon.get(t)))
      .valueSeq()
  }
)(getTypeJSON)
