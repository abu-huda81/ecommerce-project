import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../UserContext'
import { list, deals, offers, images } from '../data'
import ImageSlider from '../components/ImageSlider'




const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const navigation = useNavigation()
  const [open, setOpen] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [category, setCategory] = useState('jewelery')
  // const { userId, setUserId } = useContext(UserType)
  const [selectedAddress, setSelectedAdress] = useState('')
  console.log(selectedAddress)
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },
  ])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products')
          setProducts(response.data)
        } catch (error) {
          console.log('error message', error)
        }
      }

      fetchData()
    }, [])

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === 'android' ? 40 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: '#00CED1',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: 'white',
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name='search1'
              size={22}
              color='black'
            />
            <TextInput placeholder='Search Khyal Store..' />
          </Pressable>
          <Feather name='mic' size={24} color='black' />
        </View>
        <Pressable
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            padding: 10,
            backgroundColor: '#AFEEEE',
          }}
        >
          <Ionicons name='location-outline' size={24} color='black' />
          <Pressable>
            {selectedAddress ? (
              <Text>
                Deliver to {selectedAddress?.name} - {selectedAddress?.street}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: '500' }}>
                Add a Address
              </Text>
            )}
          </Pressable>

          <MaterialIcons name='keyboard-arrow-down' size={24} color='black' />
        </Pressable>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 5,
                }}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ImageSlider images={images} />
        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Trending Deals of the week
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {deals.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Info', {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 180, height: 180, resizeMode: 'contain' }}
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Today's Deals
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
