import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSessioncontentListByType } from '../modules/sessioncontent/selector'
import { Text } from 'native-base'

import { sessioncontentsFetch } from '../modules/sessioncontent/actions'

const WithLoadedData = (WrappedComponent, externalProps) => {

  const LoadedData = (props) => {
    const { fetch, sessioncontents } = props

    useEffect(() => {
      if (!sessioncontents) {
        fetch()
      }
    }, [sessioncontents])

    return (
      <>
        {sessioncontents &&
          <WrappedComponent {...props} />
        }
        {!sessioncontents && 
          <Text>
            {'loading'}
          </Text>
        }
      </>
    )
  }

  const mapStateToProps = (state, ownProps) => ({
    sessioncontents: getSessioncontentListByType(state, {
      ...ownProps,
      ...externalProps
    })
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
