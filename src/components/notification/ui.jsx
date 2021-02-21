import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Animated } from 'react-native'
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

const animationTiming = 300

const ForegroundNotification = ({ img, title, description, delay = 1500, onClose }) => {
  const animatedEl = useRef()
  let fadeAnim = useRef(new Animated.Value(0)).current
  let offsetAnim = useRef(new Animated.Value(0)).current


  useEffect(() => {
    if (animatedEl?.current) {
      animatedEl.current.measure((x, y, width, height) => {
        const startPoint = -height
        offsetAnim.setValue(startPoint)

        Animated.sequence([
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
          Animated.parallel([
            Animated.timing(offsetAnim, {
              toValue: startPoint,
              duration: animationTiming,
              useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: animationTiming / 2,
              useNativeDriver: true
            })
          ])
        ]).start(onClose)
      })
    }
  }, [animatedEl, fadeAnim, offsetAnim])

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
      ref={animatedEl}
    >
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
    </Animated.View>
  )
}

export default ForegroundNotification
