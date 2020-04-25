import createCachedSelector from "re-reselect"

const getState = (state) => state.comments
const getPostId = (state, props) => props.post 

export const getCommentsByPostId = createCachedSelector(
[getState, getPostId],
(comments, postId) => {
  if (!comments || !postId) {
    return
  }
  return comments
  .filter(c => c.get('post') === postId)
  .valueSeq()
}
)(getPostId)
