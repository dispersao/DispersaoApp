import React from 'react'
import { connect } from 'react-redux'

import { View, StyleSheet, Text } from 'react-native'
import { toJS } from '../../../utils/immutableToJs'

import ProfilePost from './ProfilePost.jsx'

import { getPostsByContentcreatorId } from '../../../modules/post/selector'

import { useTranslation } from 'react-i18next'

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  }
})

const ProfilePostList = ({
  contentcreator,
  postList
}) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      {(postList?.length || null) &&
        <>
          <Text style={styles.listTitle}>
            {t('profiles.lastPosts')}
          </Text>
          <View>
            {postList?.length && postList.map((post, index) => {
              return <ProfilePost 
                key={index} 
                post={post} 
                currentContentcreator={contentcreator} />
            })}
          </View>
        </>
      }
      {(!postList?.length || null) && 
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>
            {t('general.noposts')}
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
