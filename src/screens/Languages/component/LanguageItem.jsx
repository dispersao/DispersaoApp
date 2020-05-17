import React from 'react'
import { StyleSheet } from 'react-native'
import { 
  ListItem, 
  Text, 
  Radio, 
  Right, 
  Left 
} from 'native-base'

const styles = StyleSheet.create({
  selectedText: {
    color: 'rgb(217, 98, 53)'
  }
})

import { getLanguageName } from '../../../translations/i18next'

const LanguageItem = ({
  language,
  selected,
  onClick
}) => {

  const handleClick= () => {
    onClick && onClick(language)
  }

  return (
    <ListItem 
      selected={selected} 
      onPress={handleClick}>
      <Left>
        <Text style={selected ? styles.selectedText : null}>
          {getLanguageName(language)}
        </Text>
      </Left>
      <Right>
        <Radio
          color={"rgba(0, 0, 0, 0)"}
          selectedColor={"rgb(217, 98, 53)"}
          selected={selected}
        />
      </Right>
    </ListItem>
  )
}

export default LanguageItem
