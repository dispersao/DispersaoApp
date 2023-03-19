import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSessioncontentListByType,
  getLoading as getSessioncontentsLoading
} from '../modules/sessioncontent/selector'
import { getLoading as getLikesLoading } from '../modules/likes/selector'

import { getState as getLikes } from '../modules/likes/selector'
import { sessioncontentsFetch } from '../modules/sessioncontent/actions'
import { appuserLikesFetch } from '../modules/appuser/actions'

import useDeepCompareEffect from 'use-deep-compare-effect'

const WithLoadedData = (WrappedComponent, externalProps) => {

  const LoadedData = React.memo((props) => {
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
      if (!likes) {
        fetchAppuserLikes()
      }
    }, [likes])

    return <WrappedComponent {...props} loading={dataloading} fetch={fetchSessioncontent} />
  })

  const mapStateToProps = (state, ownProps) => ({
    sessioncontents: getSessioncontentListByType(state, {
      ...ownProps,
      ...externalProps
    }),
    likes: getLikes(state),
    dataloading: getSessioncontentsLoading(state) && getLikesLoading(state)
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
