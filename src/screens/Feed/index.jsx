import React from 'react'
import { connect } from 'react-redux'

import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import { 
  Container, 
  Content, 
  Card, 
  CardItem,
  Text
} from 'native-base'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'


const Feed = ({comments, posts}) => {
  return (
    <Content padder>
      {posts && posts.length && 
        posts.map((post, index) => {
          return <Post key={index} {...post} />
        })
      }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  posts: getSessioncontentListByType(state, {type: ['post']}),
})

export default connect(
  mapStateToProps,
  null
  )(WithLoadedElement(toJS(Feed), {
  type: ['post', 'comment']
}))

