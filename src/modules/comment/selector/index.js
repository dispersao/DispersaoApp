import createCachedSelector from "re-reselect"
import { createArraySelector } from "../../../utils/selectorsUtils"

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
)({
  selectorCreator: createArraySelector,
  keySelector: getPostId
})
