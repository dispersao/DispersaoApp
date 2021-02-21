import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../utils/immutableToJs'
import UI from './ui'
import { getLastForegroundNotification } from '../../modules/notification/selector'
import { clearForegroundNotification, setNotificationViewed } from '../../modules/notification/actions'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { timeDifference } from '../../utils/stringUtils'

const NotificationDrawer = ({ notification, clearNotification, setViewedNotification }) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()


  let { thumb, published_at, type, author, refName } = notification || {}

  const [description, setDescription] = useState('')
  const [titileList, setTitleList] = useState([])

  const delay = 1500

  const onNotificationClosed = () => {
    clearNotification()
  }

  const navigateToNotification = () => {
    setViewedNotification(notification.id)
    navigate('Feed', {
      interacted: notification
    })
  }

  useEffect(()=>{
    if(published_at){
      const timeDiff = timeDifference(new Date(), new Date(published_at))
      const translationPath = `feed.time.${timeDiff.unity}.${timeDiff.amount === 1 ? 'one' : 'other'}`
      setDescription(t(translationPath, timeDiff))
    }
  }, [published_at])

  useEffect(()=>{
    if(type && author){
      const values = [
        {txt: author, type: 'bold'},
        {txt: t(`notifications.${type}`)}
      ]
      if (refName){
        values.push({txt: refName, type: 'bold'})
      }
      setTitleList(values)
    }
  },[type, author, refName])

  return (
    <>
      {(notification &&
        <UI 
          img={thumb}
          title={titileList}
          delay={delay}
          description={description}
          onClose={onNotificationClosed}
          onClick={navigateToNotification}
          />
      )|| null}
    </>
  )
}

const mapStateToProps = (state) => ({
  notification: getLastForegroundNotification(state)
})

const mapDispatchToProps = (dispatch) => ({
  clearNotification: ()=> dispatch(clearForegroundNotification()),
  setViewedNotification: (id)=> dispatch(setNotificationViewed(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )
  (toJS(NotificationDrawer))
