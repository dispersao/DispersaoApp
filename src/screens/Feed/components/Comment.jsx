import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { CardItem } from 'native-base'

import { getSessioncontentByContentId } from '../../../modules/sessioncontent/selector'

import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import { Row, Grid } from 'react-native-easy-grid'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { sessioncontentViewed } from '../../../modules/sessioncontent/actions'

import AnimatedOrangeBackground from './AnimatedOrangeBackground'

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(255, 2550, 255, 0)'
  },
  itemContainer:{
    backgroundColor: 'white'
  }
})

const Comment = ({
  contentcreator,
  sessioncontent: { id, viewed, updated_at },
  content,
  footer,
  onLayout,
  markContentAsViewed,
  animateOnMount
}) => {
  useEffect(() => {
    if (!viewed) {
      markContentAsViewed(id)
    }
  }, [viewed])
  const { navigate } = useNavigation()

  const handleHeaderClick = contentcreator => {
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator }
    })
  }

  return (
    <View
      onLayout={event => {
        onLayout(id, event.nativeEvent.layout.y)
      }}
      style={styles.itemContainer}
    >
      <CardItem style={styles.item} footer={footer}>
        <Grid>
          <Row style={{ paddingBottom: 10 }}>
            <PostHeader
              contentcreator={contentcreator}
              time={updated_at}
              style="small"
              onClick={handleHeaderClick}
            />
          </Row>
          <Row>
            <PostBody content={content} />
          </Row>
        </Grid>
      </CardItem>
      {animateOnMount && <AnimatedOrangeBackground id={id}/>}
    </View>
  )
}

const mapStateToProps = (state, ownProps) => ({
  sessioncontent: getSessioncontentByContentId(state, {
    ...ownProps,
    type: 'comment'
  })
})

const mapDispatchToPorps = (dispatch, ownProps) => ({
  markContentAsViewed: id => dispatch(sessioncontentViewed(id))
})

export default connect(mapStateToProps, mapDispatchToPorps)(toJS(Comment))
