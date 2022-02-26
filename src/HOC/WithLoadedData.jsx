import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSessioncontentListByType,
  getLoading as getSessioncontentsLoading
} from '../modules/sessioncontent/selector'
import { getLoading as getAppuserLoading } from '../modules/appuser/selector'

import { getState as getLikes } from '../modules/likes/selector'
import { sessioncontentsFetch } from '../modules/sessioncontent/actions'
import { appuserLikesFetch } from '../modules/appuser/actions'
import { useCallback } from 'react'

const WithLoadedData = (WrappedComponent, externalProps) => {

  const LoadedData = (props) => {
    const { 
      fetchSessioncontent,
      fetchAppuserLikes, 
      sessioncontents,
      dataloading,
      likes
    } = props

    const { noEmptyList } = externalProps

    useEffect(() => {
      if (!sessioncontents || (!sessioncontents.size && noEmptyList)) {
        fetchSessioncontent()
      }
    }, [sessioncontents])

    useEffect(() => {
      if (!likes || !Array.isArray(likes)) {
        fetchAppuserLikes()
      }
    }, [likes])

    const fetch = useCallback(()=>{
      fetchAppuserLikes()
      fetchSessioncontent()
    })

    return <WrappedComponent {...props} loading={dataloading} fetch={fetch} />
  }

  const mapStateToProps = (state, ownProps) => ({
    sessioncontents: getSessioncontentListByType(state, {
      ...ownProps,
      ...externalProps
    }),
    likes: getLikes(state),
    dataloading: getSessioncontentsLoading(state) && getAppuserLoading(state)
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSessioncontent: () => dispatch(sessioncontentsFetch({
      ...ownProps,
      ...externalProps
    })),
    fetchAppuserLikes: () => dispatch(appuserLikesFetch())
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoadedData)
}

export default WithLoadedData
