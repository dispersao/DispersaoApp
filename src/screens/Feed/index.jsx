import React, {
  useCallback
} from 'react'

import { connect } from 'react-redux'

import { 
  SafeAreaView, 
  StyleSheet,
  RefreshControl,
} from 'react-native'

import { Content } from 'native-base'

import Constants from 'expo-constants'

import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
})

const Feed = ({ 
  posts,
  loading,
  fetch,
  navigation: { navigate }
}) => {
  const onRefresh = useCallback(() => {
    fetch && fetch()
  }, [loading])

  const handleHeaderClick = (contentcreator) => {
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator },
    })
  }

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
            return <Post 
              key={index}
              headerClick={handleHeaderClick}
              {...post} 
            />
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

