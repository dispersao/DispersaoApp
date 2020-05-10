import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import { 
  SafeAreaView, 
  StyleSheet,
  Image,
  View
} from 'react-native'

import { 
  Content, 
  Card, 
  CardItem, 
  Text, 
  Body, 
  Left, 
  Right, 
  Thumbnail
} from 'native-base'

import { getSessioncontentByContentId } from '../../modules/sessioncontent/selector'
import { getProfileByProfileId } from '../../modules/profile/selector'

import { toJS } from '../../utils/immutableToJs.jsx'

import ProfileInfo from './components/ProfileInfo.jsx'
import ProfilePostList from './components/ProfilePostList.jsx'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    padding:5,
    paddingLeft: 15
  }
})

const Profile = ({
  navigation,
  sessioncontent,
  profile
}) => {
  const onHandleClick = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Content style={styles.content}>
        <Ionicons.Button
          style={styles.button}
          name="ios-arrow-back"
          color="#999999"
          backgroundColor="rgba(255,255,255,0)"
          size={25}
          onPress={onHandleClick}/>
        <ProfileInfo 
          profile={profile} 
          sessioncontent={sessioncontent}/>
        <ProfilePostList {...profile} />
      </Content>
    </SafeAreaView>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { route: { params : { id } } } = ownProps
  return {
    sessioncontent: getSessioncontentByContentId(state, {id , type: 'profile'}),
    profile: getProfileByProfileId(state, { profile: id })
  }
}

export default connect(
  mapStateToProps,
  null
  )(toJS(Profile))
