import React, { useState } from 'react'
import { connect } from 'react-redux'
import { 
  StyleSheet,
  Text
} from 'react-native'

import { 
  Input, 
  Item,
  Button
} from 'native-base'

import { Row } from 'react-native-easy-grid'

import { updateAppuser } from '../../../modules/appuser/actions/'
import { getError } from '../../../modules/appuser/selector'

import { toJS } from '../../../utils/immutableToJs.jsx'

import i18n from '../../../translations/i18n'

const styles = StyleSheet.create({
  paddingRow: {
    paddingHorizontal: 10
  },
  grid: {
    alignItems: 'center'
  },
  textRow: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 15, 
    color: '#D96235', 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  margin5: {
    marginVertical: 5
  },
  itemInput: { 
    width: '90%', 
    justifyContent: 'center', 
    color: 'white'
  },
  input: { 
    textTransform: 'uppercase', 
    justifyContent: 'center', 
    color: 'white', 
    borderColor: 'gray'
  },
  button: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgb(217, 98, 53)' 
  },
  buttonText: {
    fontSize: 15, 
    color: 'white', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

const TokenCheck = ({
  associateToken,
  tokenError
}) => {
  let [inputValue, setInputValue] = useState(null)

  return (
    <>
      <Row 
        size={1} 
        style={styles.textRow}>
        { tokenError && tokenError.message &&
          <Text style={styles.text}>
            {i18n.translate(`token.error.${tokenError.message}`)}
          </Text>
        }
      </Row>
      <Row 
        size={1} 
        style={styles.margin5}>
        <Item 
          regular 
          style={styles.itemInput}>
          <Input 
            keyboardType='number-pad'
            placeholder={i18n.translate('token.placeholder')} 
            autoCapitalize="characters" 
            style={styles.input}
            onChangeText={(val)=> setInputValue(val)} />
        </Item>
      </Row>
      <Row 
        size={1} 
        style={styles.paddingHorizontal}>
        <Button 
          rounded
          disabled={!inputValue}
          style={styles.button}
          onPress={() => associateToken(inputValue)}>
          <Text 
            style={styles.buttonText}>
              {i18n.translate('token.send')}
            </Text>
        </Button>
      </Row>
   </>
  )
}

const mapStateToProps = (state) => ({
  tokenError: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  associateToken: (token) => dispatch(updateAppuser({ script:token }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(TokenCheck))
