import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import NotificationContext from '../../HOC/UserManager/NotificationManager/context'

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
    marginTop: Constants.statusBarHeight
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

const Feed = ({ posts, loading, fetch, navigation: { navigate }, route }) => {
  const { t } = useTranslation()

  const notificationContext = useContext(NotificationContext)

  const interactedContent = route?.params?.interacted?.sessioncontent

  const [contentYs, setContentYs] = useState({})
  const [scrollTo, setScrollTo] = useState({})
  const contentRef = useRef(null)

  useEffect(() => {
    if (interactedContent && contentYs.hasOwnProperty(interactedContent)) {
      setScrollTo(contentYs[interactedContent])
    }
  }, [interactedContent, contentYs])

  useEffect(() => {
    if (scrollTo && contentRef?.current?._root) {
      contentRef.current._root.scrollToPosition(0, scrollTo, false)
      notificationContext.lastInteracted.clear()
    }
  }, [scrollTo, contentRef])

  const onRefresh = useCallback(() => {
    fetch && fetch()
  }, [loading])

  const handleHeaderClick = (contentcreator) => {
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator }
    })
  }

  const onLayoutEvent = (sessioncontent, y) => {
    setContentYs({
      ...contentYs,
      [sessioncontent]: y
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
        ref={contentRef}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['#999']}
          />
        }
      >
        {(interactedContent && (
          <Text>{JSON.stringify(interactedContent)}</Text>
        )) ||
          null}
        {text && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{t(text)}</Text>
          </View>
        )}
        {(posts &&
          posts.length &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                headerClick={handleHeaderClick}
                onLayout={onLayoutEvent}
                {...post}
              />
            )
          })) ||
          null}
      </Content>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  posts: getSessioncontentListByType(state, { types: ['post'] })
})

export default connect(
  mapStateToProps,
  null
)(
  WithLoadedElement(toJS(Feed), {
    types: ['post', 'comment', 'profile']
  })
)
