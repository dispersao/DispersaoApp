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
  Text,
  Dimensions
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
  badgeCount
}) => {
  const { t } = useTranslation()

  const { navigate, dispatch } = navigation

  const notification = route?.params?.interacted
  const interactedContent = notification?.sessioncontent
  const received_at = notification?.received_at

  const [contentYs, setContentYs] = useState({})
  const [scrollTo, setScrollTo] = useState(0)

  const contentUIRef = useRef(null)

  const tabPress = useCallback(() => {
    fetch && fetch()
    dispatch(CommonActions.setParams({ interacted: null }))
  })

  useEffect(() => {
    if (navigation && badgeCount) {
      navigation.addListener('tabPress', tabPress)
    }
    return () => navigation.removeListener('tabPress', tabPress)
  }, [navigation, badgeCount, fetch])

  useEffect(() => {
    if (interactedContent) {
      if (contentYs.hasOwnProperty(interactedContent)) {
        setScrollTo(calculateScrollTo(contentYs[interactedContent]))
      } else if (fetchedAt < received_at && !loading) {
        fetch && fetch()
      }
    }
  }, [interactedContent, contentYs, fetchedAt, fetch, received_at])

  useEffect(() => {
    if (contentUIRef.current) {
      contentUIRef.current._root.scrollToPosition(0, scrollTo, true)
    }
  }, [scrollTo])

  const calculateScrollTo = ({ y, h }) => {
    if (h < Dimensions.get('window').height){
      const margin = (Dimensions.get('window').height - h) / 2
      return Math.max(0, y - margin)
    } else {
      return y
    }
  }

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

  const onLayoutEvent = (contentId, y, h) => {
    setContentYs({
      ...contentYs,
      [contentId]: {
        y,
        h
      }
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
          {(posts &&
            !loading &&
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

export default connect(
  mapStateToProps,
  null
)(
  WithLoadedElement(toJS(Feed), {
    types: ['post', 'comment', 'profile']
  })
)
