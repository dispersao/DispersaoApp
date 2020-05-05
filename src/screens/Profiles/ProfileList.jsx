import React from 'react'
import { connect } from 'react-redux'

import { 
  Container, 
  Content, 
  List, 
  ListItem
} from 'native-base'
import { StyleSheet } from 'react-native'
 
import { getSessioncontentListByType } from '../../modules/sessioncontent/selector'

import WithLoadedElement from '../../HOC/WithLoadedData.jsx'
import { toJS } from '../../utils/immutableToJs.jsx'
import ProfileItem from './components/ProfileItem.jsx'

const styles = StyleSheet.create({
  container: {
    paddingTop: Expo.Constants.statusBarHeight
  }
})
const ProfileList = ({
  navigation,
  profiles
}) => {
  const handleProfileItemClick = (profile) => {
    console.log(profile)
  }

  return(
    <Container style={styles.container}>
      <Content >
        <List>
          {profiles.map((profile, index) => (
            <ListItem key={index}>
              <ProfileItem 
                {...profile} 
                onPress={handleProfileItemClick}/>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => ({
  profiles : getSessioncontentListByType(state, {types: ['profile']})
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoadedElement(toJS(ProfileList), {
  types: ['profile'],
  noEmptyList: true
}))
