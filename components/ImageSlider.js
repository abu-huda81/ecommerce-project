import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'

const { width } = Dimensions.get('window')

const ImageSlider = ({images}) => {
//   const images = [
//     'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
//     'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
//     'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
//   ]

  const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length // Loop back to 0 after the last image
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        })
        return nextIndex
      })
    }, 3000) // Auto-slide every 3 seconds

    return () => clearInterval(interval) // Clean up the interval on unmount
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={styles.scrollView}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
            resizeMode='cover'
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          })
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth }]}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // paddingHorizontal: 10,
  },
  scrollView: {
    width: width,
    height: 200,
  },
  image: {
    width: width,
    height: 200,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#13274F',
    marginHorizontal: 4,
  },
})

export default ImageSlider
