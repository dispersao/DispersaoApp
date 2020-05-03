import React from 'react'
import { connect } from 'react-redux'

import {
  getSessioncontentByContentId
} from '../../../modules/sessioncontent/selector'

import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import { Row, Grid } from 'react-native-easy-grid'
import { toJS } from '../../../utils/immutableToJs.jsx'

const Comment = ({
  contentcreator,
  sessioncontent,
  content
}) => {
  return (
    <Grid>
      <Row style={{paddingBottom: 10}}>
        <PostHeader 
          contentcreator={contentcreator}
          time={sessioncontent.updated_at}
          style='small'
        />
      </Row>
      <Row>
        <PostBody
          content={content}
        />
      </Row>
    </Grid>
  )
}

const mapStateToProps = (state, ownProps) => ({
  sessioncontent: getSessioncontentByContentId(state, {... ownProps, type: 'comment'})
})

export default connect(
  mapStateToProps,
  null
)(toJS(Comment))
