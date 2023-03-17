import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import { toJS } from '../../../utils/immutableToJs'

import { 
  Text, 
  Thumbnail
} from 'native-base'

import LikesBox from '../../../components/feedbacks/LikesBox.jsx'

import { getContentcreatorByContentcreatorId } from '../../../modules/contentcreator/selector'
import { getLikesBySessioncontentId } from '../../../modules/likes/selector'


const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15
  },
  thumb: {
    width: 90,
    height: 90,
    borderRadius: 150 / 2
   },
   rightBlock: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },
  title: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: 'gray'
  },
  
})

const ProfileHeader = (props) => {
  const {
    sessioncontent,
    contentcreatorElement : { name },
    description,
    photo,
    myLike
  } = props


  return (
      <View style={styles.content}>
        <Thumbnail
          big
          style={styles.thumb}
          source={{uri: photo?.url}} />
        <View style={styles.rightBlock}>
          <Text style={styles.title}>
            {name}
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <LikesBox
            likes={sessioncontent.likes}
            dislikes={sessioncontent.dislikes}
            myLike={myLike && myLike.length && myLike[0]}
            sessioncontentId={sessioncontent.id}/>
        </View>
      </View>
  )
}

const mapStateToProps = (state, ownProps) => ({
  contentcreatorElement: getContentcreatorByContentcreatorId(state, ownProps),
  myLike: getLikesBySessioncontentId(state, {id: ownProps.sessioncontent.id})
})

export default connect(
  mapStateToProps,
  null
)(toJS(ProfileHeader))

