import React, {
  useState,
  useCallback
} from 'react'

import { connect } from 'react-redux'

import { 
  SafeAreaView, 
  StyleSheet,
  RefreshControl
} from 'react-native'

import Constants from 'expo-constants'

import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import {  
  Content
} from 'native-base'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
})

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

const Feed = ({ 
  posts,
  loading,
  fetch,
  navigation
}) => {
  const onRefresh = useCallback(() => {
    fetch && fetch()
  }, [loading])

  return (
    <SafeAreaView style={styles.container}>
      <Content 
        padder
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={onRefresh}
            colors={['#999']}
            />
        }>
        {posts && posts.length && 
          posts.map((post, index) => {
            return <Post key={index} {...post} />
          })
        }
      </Content>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  posts: getSessioncontentListByType(state, {types: ['post']}),
})


export default connect(
  mapStateToProps,
  null
  )(WithLoadedElement(toJS(Feed), {
  types: ['post', 'comment', 'profile']
}))

