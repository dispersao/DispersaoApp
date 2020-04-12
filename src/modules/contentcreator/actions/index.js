export const CONTENTCREATORS_FETCH_SUCCESS = 'CONTENTCREATORS_FETCH_SUCCESS'

export const contentcreatorsFetchSuccess = (contentcreators) => ({
  type: CONTENTCREATORS_FETCH_SUCCESS,
  payload: {
    contentcreators
  }
})
