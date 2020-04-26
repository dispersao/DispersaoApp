import React from 'react'
import { connect } from 'react-redux'
import { timeDifference } from '../../../utils/stringUtils'

import { 
  Text, 
  Body, 
  Thumbnail,
  Left
} from 'native-base'

import { StyleSheet } from 'react-native'
import { toJS } from '../../../utils/immutableToJs'

import i18n from '../../../translations/i18n'

import { getContentcreatorByContentcreatorId } from '../../../modules/contentcreator/selector'

const styles = StyleSheet.create({
  titile: {
    fontWeight: 'bold'
  },
  description: {
    color: 'gray'
  }
})

const PostHeader = ({
  contentcreator,
  time,
  onClick
}) => {
  const timeDiff = timeDifference(new Date(), new Date(time))
  const translationPath = `feed.time.${timeDiff.unity}.${timeDiff.amount === 1 ? 'one' : 'other'}`

  const handleClick = ()=> {
    onClick && onClick()
  }
  return (
    <>
    { contentcreator && 
      <Left onClick={handleClick}>
        { contentcreator.icon && 
        <Thumbnail 
          source={{uri: contentcreator.icon.url}}  />
        }
        <Body>
          <Text 
            style={styles.title}>
              {contentcreator.name}
            </Text>
          <Text 
            style={styles.description}>
              {i18n.translate(translationPath, timeDiff)}
          </Text>
        </Body>
      </Left>
    }
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  contentcreator: getContentcreatorByContentcreatorId(state, ownProps)
})


export default connect(
  mapStateToProps,
  null
)(toJS(PostHeader))
  
