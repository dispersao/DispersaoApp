import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { getSessionContentViewed } from '../../../modules/sessioncontent/selector'
import {
  getBadgeCount,
  getLastInteractedNotification
} from '../../../modules/notification/selector'
import { clearInteractedNotification } from '../../../modules/notification/actions'


const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: '#d96235',
    opacity: 1,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }
})

const AnimatedOrangeBackground = ({
  viewed,
  id,
  badgeCount,
  interactedContent,
  clearNotification
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  
  const onClose = ()=> {
    if (interactedContent && interactedContent === id) {
      clearNotification()
    }
  }

  useEffect(() => {
    if (!viewed) {
      if (interactedContent === id || (!interactedContent && badgeCount)) {
        fadeAnim.setValue(1)
    
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }).start(onClose)
      }
    }
  }, [viewed, interactedContent, badgeCount])


  return <Animated.View style={[
    styles.view,
    {
      opacity: fadeAnim
    }
  ]}/>
}

const mapStateToProps = (state, ownProps) => ({
  viewed: getSessionContentViewed(state, ownProps),
  badgeCount: getBadgeCount(state),
  interactedContent: getLastInteractedNotification(state)?.get('sessioncontent')
})

const mapDispatchToProps = (dispatch) => ({
  clearNotification: ()=> dispatch(clearInteractedNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedOrangeBackground)
