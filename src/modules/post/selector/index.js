import createCachedSelector from 're-reselect'

const getState = (state) => state.posts
const getPostId = (state, props) => props.post

export const getPostByPostId = createCachedSelector(
  [getState, getPostId],
  (posts, id) => {
    if (!posts || !posts.size || !id) {
      return
    }
    return posts.get(id.toString())
  }
)(getPostId)
