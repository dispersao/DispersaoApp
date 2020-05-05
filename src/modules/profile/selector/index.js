import createCachedSelector from 're-reselect'

const getState = (state) => state.profiles
const getProfileId = (state, props) => props.profile

export const getProfileByProfileId = createCachedSelector(
  [getState, getProfileId],
  (profiles, id) => {
    if (!profiles || !profiles.size || !id) {
      return
    }
    return profiles.get(id.toString())
  }
)(getProfileId)
