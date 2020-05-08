import createCachedSelector from 're-reselect'

const getState = (state) => state.profiles
const getProfileId = (state, props) => props.profile
const getContentcreatorId = (state, props) => props.contentcreator

export const getProfileByProfileId = createCachedSelector(
  [getState, getProfileId],
  (profiles, id) => {
    if (!profiles || !profiles.size || !id) {
      return
    }
    return profiles.get(id.toString())
  }
)(getProfileId)

export const getProfileByContentcreatorId = createCachedSelector(
  [getState, getContentcreatorId],
  (profiles, contentcreator) => {
    if (!profiles || !profiles.size || !contentcreator) {
      return
    }
    console.log(profiles)
    return profiles.find(profile => profile.get('contentcreator') === contentcreator)
  }
)(getContentcreatorId)
