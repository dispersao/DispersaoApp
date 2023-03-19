import AsyncStorage from '@react-native-async-storage/async-storage';

const storeName = '@DispersaoApp'

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${storeName}:${key}`, value)
  } catch (error) {
    // console.log('couldnt store the data', error)
  }
}

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`${storeName}:${key}`)
    if (value !== null) {
      return value
    }
  } catch (error) {
    // console.log('error retrieving data', error)
  }
}

export const removeData = async(key) => {
  try {
    const value = await AsyncStorage.removeItem(`${storeName}:${key}`)
    if (value !== null) {
      return value
    }
  } catch (error) {
    // console.log('error removing data', error)
  }
}
