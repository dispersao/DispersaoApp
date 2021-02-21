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
  navigation: { navigate, dispatch },
  route,
  clearNotification
}) => {
  const { t } = useTranslation()

  const notification = route?.params?.interacted
  const interactedContent = notification?.sessioncontent
  const received_at = notification?.received_at

  const [contentYs, setContentYs] = useState({})
  const [scrollTo, setScrollTo] = useState({})

  const contentRef = useRef(null)

  useEffect(() => {
    if (interactedContent) {
      if (contentYs.hasOwnProperty(interactedContent)) {
        setScrollTo(contentYs[interactedContent])
      } else if (fetchedAt < received_at && !loading) {
        fetch && fetch()
      }
    }
  }, [interactedContent, contentYs, fetchedAt, fetch, received_at])

  useEffect(() => {
    if (!Number.isNaN(scrollTo) && contentRef?.current?._root) {
      contentRef.current._root.scrollToPosition(0, scrollTo, false)
      clearNotification()
    }
  }, [scrollTo, contentRef])

  const onRefresh = useCallback(() => {
    fetch && fetch()
    dispatch(CommonActions.setParams({ interacted: null }))
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
    <>
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
      <ForegroundNotification />
    </>
  )
}

const mapStateToProps = (state) => ({
  posts: getSessioncontentListByType(state, { types: ['post'] }),
  fetchedAt: getFetchedAt(state)
})

const mapDispatchToProps = (dispatch) => ({
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
