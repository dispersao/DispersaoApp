import React from 'react'
import { connect } from 'react-redux'

import { View, StyleSheet, Text } from 'react-native'
import { toJS } from '../../../utils/immutableToJs'

import ProfilePost from './ProfilePost.jsx'

import { getPostsByContentcreatorId } from '../../../modules/post/selector'

import i18n from '../../../translations/i18n'

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    marginHorizontal: 10
  },
  listTitle: {
    fontSize: 18,
    marginHorizontal: 5
  },
  emptyText: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  emptyTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

const ProfilePostList = ({
  id,
  postList
}) => {
  return (
    <View style={styles.container}>
      { (postList.length || null) &&
        <>
          <Text style={styles.listTitle}>
            {i18n.translate('profiles.lastPosts')}
          </Text>
          <View>
            {postList.length && postList.map((post, index) => {
              return <ProfilePost 
                key={index} 
                post={post} 
                currentProfile={id} />
            })}
          </View>
        </>
      }
      {(!postList.length || null) && 
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>
            {i18n.translate('general.noposts')}
          </Text>
        </View>
      }
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    postList: getPostsByContentcreatorId(state, ownProps)
  }
}

export default connect(
  mapStateToProps,
  null
)(toJS(ProfilePostList))
