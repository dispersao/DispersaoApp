export const PROFILES_FETCH_SUCCESS = 'PROFILES_FETCH_SUCCESS'

export const profilesFetchSuccess = (profiles) => ({
  type: PROFILES_FETCH_SUCCESS,
  payload: {
    profiles
  }
})
