import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card } from 'native-base'

import ProfileDescription from './ProfileDescription.jsx'
import ProfileHeader from './ProfileHeader.jsx'

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20,
    margin: 0
  },
  divider: {
    width: '75%',
    height: 1,
    backgroundColor: '#d9d9d9',
    marginVertical: 15
  }
})

const ProfileInfo = ({
  profile,
  sessioncontent
}) => {
  return (
    <Card style={styles.content}>
      <ProfileHeader 
        {...profile} 
        sessioncontent={sessioncontent} />
      <View 
        style={styles.divider} />
      <ProfileDescription 
        text={profile.content} />
    </Card>
  )
}

export default ProfileInfo
