import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'

import { toJS } from '../../../utils/immutableToJs'
import { getContentcreatorByContentcreatorId } from '../../../modules/contentcreator/selector'

import {
  Thumbnail,
  Text
} from 'native-base'

const styles = StyleSheet.create({
  thumb: {
    width: 40,
    height: 40,
    marginRight: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

const ProfileInfo = ({
  contentcreatorElement,
  id
}) => {
  return (
    <>
      <Thumbnail
        style={styles.thumb}
        source={{uri: (contentcreatorElement?.icon?.url || '')}}  />
      <Text style={styles.title}>
        {contentcreatorElement.name}
      </Text>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  contentcreatorElement: getContentcreatorByContentcreatorId(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(ProfileInfo))
