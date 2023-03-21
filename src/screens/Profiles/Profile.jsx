import React, { useRef } from 'react'

import Constants from 'expo-constants'
import { connect } from 'react-redux'

import ScrollUpContext from './context'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView as Content
} from 'react-native'

import { getSessioncontentByContentId } from '../../modules/sessioncontent/selector'
import { getProfileByProfileId } from '../../modules/profile/selector'
import { getProfileByContentcreatorId } from '../../modules/profile/selector'

import { toJS } from '../../utils/immutableToJs.jsx'

import ProfileInfo from './components/ProfileInfo.jsx'
import ProfilePostList from './components/ProfilePostList.jsx'
import ContentcreatorProfile from './components/ContentcreatorProfile.jsx'
import BackButton from '../../components/ui/BackButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    margin: 10
  }
})

const Profile = ({ navigation, sessioncontent, profile, contentcreator }) => {
  const scrollerRef = useRef(null)

  return (
    <ScrollUpContext.Provider
      value={{
        scrollUp: () => {
          scrollerRef.current.scrollTo({ x: 0, y: 0, animation: true })
        }
      }}
    >
      <SafeAreaView style={styles.container}>
        <Content style={styles.content} ref={scrollerRef}>
         <BackButton onPress={navigation.goBack}/>
          {(profile || null) && (
            <>
              <ProfileInfo profile={profile} sessioncontent={sessioncontent} />
              <ProfilePostList {...profile} />
            </>
          )}
          {(!profile || null) && (
            <ContentcreatorProfile contentcreator={contentcreator} />
          )}
        </Content>
      </SafeAreaView>
    </ScrollUpContext.Provider>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {
    route: {
      params: { contentcreator, id }
    }
  } = ownProps
  let profile = id
    ? getProfileByProfileId(state, { profile: id })
    : getProfileByContentcreatorId(state, { contentcreator })
  return {
    sessioncontent: getSessioncontentByContentId(state, {
      id: profile?.get('id'),
      type: 'profile'
    }),
    profile,
    contentcreator
  }
}

export default connect(mapStateToProps, null)(toJS(Profile))
