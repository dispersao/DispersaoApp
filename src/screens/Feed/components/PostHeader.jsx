import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { timeDifference } from '../../../utils/stringUtils'

import { useTranslation } from 'react-i18next'

import { 
  Text, 
  Body, 
  Thumbnail,
  Left
} from 'native-base'

import { toJS } from '../../../utils/immutableToJs'

import { getContentcreatorByContentcreatorId } from '../../../modules/contentcreator/selector'
import { getProfileByContentcreatorId } from '../../../modules/profile/selector'

const generalStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold'
  },
  description: {
    color: 'gray'
  },
  container: {
   flexDirection: 'row',
   flex: 1
  }
})

const bigStyles = StyleSheet.create({
  thumb: {
    width: 40,
    height: 40
  },
  title: {
    fontSize: 14
  },
  description: {
    fontSize: 12
  }
})

const smallStyles = StyleSheet.create({
  thumb: {
    width: 32,
    height: 32
  }, 
  title: {
    fontSize: 12
  },
  description: {
    fontSize: 10
  }
})

const styles = {
  general: generalStyles,
  big: bigStyles,
  small: smallStyles
}
  

const PostHeader = ({
  contentcreatorElement,
  profile,
  time,
  onClick,
  style = 'big'
}) => {
  const { t } = useTranslation()

  const timeDiff = timeDifference(new Date(), new Date(time))
  const translationPath = `feed.time.${timeDiff.unity}.${timeDiff.amount === 1 ? 'one' : 'other'}`

  const handleClick = ()=> {
    onClick && profile && onClick(profile.id)
  }

  const combineStyle = (field) => {
    return StyleSheet.compose(styles.general[field], styles[style][field])
  }

  return (
    <>
    { contentcreatorElement && 
        <Left>
          <TouchableOpacity 
            style={generalStyles.container}
            onPress={handleClick}
            >
            { contentcreatorElement.icon && 
              <Thumbnail
                style= {styles[style].thumb}
                source={{uri: contentcreatorElement.icon.url}}  />
            }
            <Body>
              <Text 
                style={combineStyle('title')}>
                  {contentcreatorElement.name}
              </Text>
              <Text 
                style={combineStyle('description')}>
                  {t(translationPath, timeDiff )}
              </Text>
            </Body>
          </TouchableOpacity>
        </Left>
    }
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  contentcreatorElement: getContentcreatorByContentcreatorId(state, ownProps),
  profile: getProfileByContentcreatorId(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(PostHeader))
  
