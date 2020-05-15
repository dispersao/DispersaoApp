import createCachedSelector from 're-reselect'
import config from '../../../../config.json'

const getState = (state) => state.profiles
const getProfileId = (state, props) => props.profile
const getContentcreatorId = (state, props) => props.contentcreator

export const getProfileByProfileId = createCachedSelector(
  [getState, getProfileId],
  (profiles, id) => {
    if (!profiles || !profiles.size || !id) {
      return
    }
    return formatProfile(profiles.get(id.toString()))
  }
)(getProfileId)

export const getProfileByContentcreatorId = createCachedSelector(
  [getState, getContentcreatorId],
  (profiles, contentcreator) => {
    if (!profiles || !profiles.size || !contentcreator) {
      return
    }
    return profiles.find(profile => profile.get('contentcreator') === contentcreator)
  }
)(getContentcreatorId)

const formatProfile = (profile) => {
  if (profile.get('photo')) {
    const imageUrl = profile.getIn(['photo', 'url'])
    return profile.setIn(['photo', 'url'], `${config.api.url}${imageUrl}`)
  } else {
    return profile
  }
}
