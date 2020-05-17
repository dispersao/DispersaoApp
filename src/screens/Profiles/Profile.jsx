import React, { useRef } from 'react'

import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import ScrollUpContext from './context'

import { 
  SafeAreaView, 
  StyleSheet
} from 'react-native'

import { Content } from 'native-base'

import { getSessioncontentByContentId } from '../../modules/sessioncontent/selector'
import { getProfileByProfileId } from '../../modules/profile/selector'
import { getProfileByContentcreatorId } from '../../modules/profile/selector'

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

  const scrollerRef = useRef(null)

  const onHandleClick = () => {
    navigation.goBack()
  }

  return (
    <ScrollUpContext.Provider value={{
      scrollUp: () => {
        scrollerRef.current._root.scrollToPosition(0, 0,true)
      }
    }}>
      <SafeAreaView style={styles.container}>
        <Content style={styles.content} ref={scrollerRef}>
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
    </ScrollUpContext.Provider>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { route: { params : { contentcreator, id } } } = ownProps
  let profile = id ? getProfileByProfileId(state, { profile: id }) : getProfileByContentcreatorId(state, { contentcreator })
  return {
    sessioncontent: getSessioncontentByContentId(state, {id: profile?.get('id') , type: 'profile'}),
    profile
  }
}

export default connect(
  mapStateToProps,
  null
  )(toJS(Profile))
