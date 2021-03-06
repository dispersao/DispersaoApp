import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { getProfileByProfileId } from '../../../modules/profile/selector'

import { toJS } from '../../../utils/immutableToJs'
import { Text, Left, Right} from 'native-base'

import ProfileInfo from './ProfileItemInfo.jsx'

import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  linkText: {
    color: '#d96235'
  }
})

const ProfileItem = ({
  element,
  onPress
}) => {
  const { t } = useTranslation()

  return(
    <>
      <Left>
        <ProfileInfo {...element}/>
      </Left>
      <Right>
        <Text 
          style={styles.linkText} 
          onPress={() => onPress && onPress(element.id)}>
            {t('profiles.seeProfile')}
        </Text>
      </Right>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  element: getProfileByProfileId(state, ownProps)
})

export default connect (
  mapStateToProps,
  null
)(toJS(ProfileItem))
