import React from 'react'
import { connect } from 'react-redux'
import { Ionicons } from "@expo/vector-icons"
import { toJS } from '../../../utils/immutableToJs'

import { 
  StyleSheet, 
  View,
  Content
} from 'react-native'

import { 
  Text, 
  Thumbnail,
  Card
} from 'native-base'

import { getContentcreatorByContentcreatorId } from '../../../modules/contentcreator/selector'
import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
   
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  thumb: {
    width: 90,
    height: 90,
    borderRadius: 150 / 2
   },
   rightBlock: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    height:'100%',
    justifyContent:'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    fontWeight: 'bold'
  },
  forbiddenText: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  }
})

const ContentcreatorProfile = ({
  contentcreatorElement: {
    icon,
    name
  }
}) => {
  const { t } = useTranslation()

  return(
    <View style={styles.container}>
      <Card style={styles.headerContainer}>
        <Thumbnail
          big
          style={styles.thumb}
          source={{uri: icon?.url}}  />
        <View style={styles.rightBlock}>
          <Text style={styles.title}>
            {name}
          </Text>
        </View>
      </Card>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Ionicons
            name="ios-lock"
            color="#999999"
            size={30}/>
          <Text style={styles.forbiddenText}>
            {t('profiles.forbiddenProfile')}
          </Text>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state, ownProps) => ({
  contentcreatorElement: getContentcreatorByContentcreatorId(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(ContentcreatorProfile))
