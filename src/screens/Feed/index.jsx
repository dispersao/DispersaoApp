import React, { useCallback, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import { CommonActions } from '@react-navigation/native'
import ForegroundNotification from '../../components/notification'

import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  View,
  Text
} from 'react-native'

import { Content } from 'native-base'

import {
  getFetchedAt,
  getSessioncontentListByType
} from '../../modules/sessioncontent/selector'

import Post from './components/Post.jsx'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'

import { useTranslation } from 'react-i18next'
import { clearInteractedNotification } from '../../modules/notification/actions'
import { getBadgeCount } from '../../modules/notification/selector'

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

const Feed = ({
  posts,
  loading,
  fetchedAt,
  fetch,
  navigation,
  route,
  clearNotification,
  badgeCount
}) => {
  const { t } = useTranslation()

  const { navigate, dispatch } = navigation

  const notification = route?.params?.interacted
  const interactedContent = notification?.sessioncontent
  const received_at = notification?.received_at

  const [contentYs, setContentYs] = useState({})
  const [scrollTo, setScrollTo] = useState({})

  const contentUIRef = useRef(null)

  useEffect(() => {
    const tabPress = e => fetch && fetch()
    if (navigation && badgeCount) {
      navigation.addListener('tabPress', tabPress)
    }
    return () => navigation.removeListener('tabPress', tabPress)
  }, [navigation, badgeCount, fetch])

  useEffect(() => {
    if (interactedContent) {
      if (contentYs.hasOwnProperty(interactedContent)) {
        contentUIRef.current._root.scrollToPosition(0, contentYs[interactedContent], true)
        //setScrollTo(contentYs[interactedContent])
      } else if (fetchedAt < received_at && !loading) {
        fetch && fetch()
      }
    }
  }, [interactedContent, contentYs, fetchedAt, fetch, received_at])

  useEffect(() => {
    if (!Number.isNaN(scrollTo) && contentUIRef?.current?._root) {
      contentUIRef.current._root.scrollToPosition(0, scrollTo, false)
      //clearNotification()
    }
  }, [scrollTo, contentUIRef])

  const onRefresh = useCallback(() => {
    fetch && fetch()
    dispatch(CommonActions.setParams({ interacted: null }))
  }, [loading])

  const handleHeaderClick = contentcreator => {
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator }
    })
  }

  const onLayoutEvent = (contentId, y) => {
    setContentYs({
      ...contentYs,
      [contentId]: y
    })
  }

  let text
  if (loading) {
    text = 'general.loading'
  } else if (!posts || !posts.length) {
    text = 'general.noposts'
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Content
          padder
          ref={contentUIRef}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={['#999']}
            />
          }
        >
          {text && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{t(text)}</Text>
            </View>
          )}
          {(posts && !loading &&
            posts.length &&
            posts.map((post, index) => {
              return (
                <Post
                  key={index}
                  headerClick={handleHeaderClick}
                  onLayout={onLayoutEvent}
                  animateOnMount={true}
                  {...post}
                />
              )
            })) ||
            null}
        </Content>
      </SafeAreaView>
      <ForegroundNotification />
    </>
  )
}

const mapStateToProps = state => ({
  posts: getSessioncontentListByType(state, { types: ['post'] }),
  comments: getSessioncontentListByType(state, { types: ['comments'] }),
  fetchedAt: getFetchedAt(state),
  badgeCount: getBadgeCount(state)
})

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(clearInteractedNotification())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  WithLoadedElement(toJS(Feed), {
    types: ['post', 'comment', 'profile']
  })
)
