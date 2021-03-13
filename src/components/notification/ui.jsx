import React, { useRef } from 'react'
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import { Card, CardItem, Text, Thumbnail } from 'native-base'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute'
  },
  card: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#F8F8F8'
  },
  text: {
    fontSize: 12
  },
  body: {
    marginLeft: 12
  },
  bold: {
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12,
    color: 'grey'
  }
})

const animationTiming = 500

const ForegroundNotification = ({
  img,
  title,
  description,
  delay = 1500,
  onClose,
  onClick
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const offsetAnim = useRef(new Animated.Value(0)).current

  let animationRef
  let animationOutRef

  const onPress = ()=> {
    animationRef.stop()
    animationOutRef.start()
    onClick && onClick()
  }

  const onViewLayout = (event) => {
    const startPoint = -event.nativeEvent.layout.height
    offsetAnim.setValue(startPoint)

    animationOutRef = Animated.parallel([
      Animated.timing(offsetAnim, {
        toValue: startPoint,
        duration: animationTiming,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationTiming * 2,
        useNativeDriver: true
      })
    ])
    
    animationRef = Animated.sequence([
      Animated.parallel([
        Animated.timing(offsetAnim, {
          toValue: 0,
          duration: animationTiming,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationTiming / 2,
          useNativeDriver: true
        })
      ]),
      Animated.delay(delay),
      animationOutRef
    ])

    animationRef.start(onClose)
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: offsetAnim
            }
          ]
        }
      ]}
      onLayout={onViewLayout}
    >
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.card}>
          <CardItem header style={styles.item}>
            <Thumbnail small source={{ uri: img }} />
            <View style={styles.body}>
              <Text style={styles.text}>
                {title.map(({ txt, type }, idx) => {
                  if (type && styles[type]) {
                    return (
                      <Text key={idx} style={styles[type]}>
                        {txt}
                      </Text>
                    )
                  } else {
                    return <Text key={idx}>{txt}</Text>
                  }
                })}
              </Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ForegroundNotification
