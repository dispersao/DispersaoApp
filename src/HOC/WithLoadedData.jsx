import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSessioncontentListByType,
  getLoading
} from '../modules/sessioncontent/selector'

import { sessioncontentsFetch } from '../modules/sessioncontent/actions'

const WithLoadedData = (WrappedComponent, externalProps) => {

  const LoadedData = (props) => {
    const { 
      fetch, 
      sessioncontents,
      dataloading
    } = props

    const { noEmptyList } = externalProps

    useEffect(() => {
      if (!sessioncontents || (!sessioncontents.size && noEmptyList)) {
        fetch()
      }
    }, [sessioncontents])

    return <WrappedComponent {...props} loading={dataloading} />
  }

  const mapStateToProps = (state, ownProps) => ({
    sessioncontents: getSessioncontentListByType(state, {
      ...ownProps,
      ...externalProps
    }),
    dataloading: getLoading(state)
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: () => dispatch(sessioncontentsFetch({
      ...ownProps,
      ...externalProps
    }))
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoadedData)
}

export default WithLoadedData
