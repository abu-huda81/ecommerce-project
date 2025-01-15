import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import ProfileScreen from '../screens/ProfileScreen'
import CartScreen from '../screens/CartScreen'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: '#008E97',
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name='home' size={24} color='#008E97' />
            ) : (
              <AntDesign name='home' size={24} color='black' />
            ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: '#008E97',
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='person' size={24} color='#008E97' />
            ) : (
              <Ionicons name='person-outline' size={24} color='black' />
            ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: {
            color: '#008E97',
          },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name='shoppingcart' size={24} color='black' />
            ) : (
              <AntDesign name='shoppingcart' size={24} color='#008E97' />
            ),
        }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
