import React from 'react'
import { connect } from 'react-redux'

import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import {  
  Content
} from 'native-base'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'


const Feed = ({comments, posts}) => {
  return (
    <Content padder style={{paddingTop: 30}}>
      {posts && posts.length && 
        posts.map((post, index) => {
          return <Post key={index} {...post} />
        })
      }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  posts: getSessioncontentListByType(state, {types: ['post']}),
})

export default connect(
  mapStateToProps,
  null
  )(WithLoadedElement(toJS(Feed), {
  types: ['post', 'comment']
}))

