import createCachedSelector from 're-reselect'
import config from '../../../../config.json'

const getState = (state) => state.posts
const getPostId = (state, props) => props.post
const getContentcreatorId = (state, props) => props.contentcreator

export const getPostByPostId = createCachedSelector(
  [getState, getPostId],
  (posts, id) => {
    if (!posts || !posts.size || !id) {
      return
    }
    return formatPost(posts.get(id.toString()))
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
      .map(post => formatPost(post))
      .valueSeq()
  }
)(getContentcreatorId)

const formatPost = (post) => {
  if (post.get('media')) {
    const imageUrl = post.getIn(['media', 'url'])
    return post.setIn(['media', 'url'], `${config.api.url}${imageUrl}`)
  } else {
    return post
  }
}
