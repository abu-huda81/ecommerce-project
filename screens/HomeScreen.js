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

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [category, setCategory] = useState('jewelery')
      const [selectedAddress, setSelectedAdress] = useState('')
        console.log(selectedAddress)
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})