import createCachedSelector from 're-reselect'
import config from '../../../../config.json'


const getState = (state) => state.contentcreators
const getContentcreatorId = (state, props) => props.contentcreator

export const getContentcreatorByContentcreatorId = createCachedSelector(
  [getState, getContentcreatorId],
  (contentcreators, id) => {
    if (!contentcreators || !contentcreators.size || !id) {
      return
    }
    return formatContentCreator(contentcreators.get(id.toString()))
  }
)(getContentcreatorId)

const formatContentCreator = (contentcreator) => {
  if (contentcreator.get('icon')) {
    const imageUrl = contentcreator.getIn(['icon', 'url'])
    return contentcreator.setIn(['icon', 'url'], `${config.api.url}${imageUrl}`)
  }
}
