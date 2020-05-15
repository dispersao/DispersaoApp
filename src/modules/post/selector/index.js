import createCachedSelector from 're-reselect'

const getState = (state) => state.posts
const getPostId = (state, props) => props.post
const getContentcreatorId = (state, props) => props.contentcreator

export const getPostByPostId = createCachedSelector(
  [getState, getPostId],
  (posts, id) => {
    if (!posts || !posts.size || !id) {
      return
    }
    return posts.get(id.toString())
  }
)(getPostId)

export const getPostsByContentcreatorId = createCachedSelector(
  [getState, getContentcreatorId],
  (posts, contentcreator) => {
    if (!posts || !posts.size || !contentcreator) {
      return
    }
    return posts
      .filter(post => post.get('contentcreator') === contentcreator)
      .valueSeq()
  }
)(getContentcreatorId)
