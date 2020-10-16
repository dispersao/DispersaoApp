import React, {
  useCallback
} from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import { 
  SafeAreaView, 
  StyleSheet,
  RefreshControl,
  View,
  Text
} from 'react-native'

import { Content } from 'native-base'

import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'

import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150
  }
})

const Feed = ({ 
  posts,
  loading,
  fetch,
  navigation: { navigate }
}) => {

  
  const { t } = useTranslation()

  const onRefresh = useCallback(() => {
    fetch && fetch()
  }, [loading])

  const handleHeaderClick = (contentcreator) => {
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator }
    })
  }

  let text
  if (loading) {
    text = 'general.loading'
  } else if (!posts || !posts.length) {
    text = 'general.noposts'
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
        {text &&
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {t(text)}
            </Text>
          </View>
        }
        {(posts && posts.length && 
          posts.map((post, index) => {
            return <Post 
              key={index}
              headerClick={handleHeaderClick}
              {...post} 
            />
          })
        ) || null}
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

