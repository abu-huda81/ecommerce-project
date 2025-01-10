import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

    const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
}
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.keyBoardView}>
          <Text style={styles.loginText}>
            <Text style={{ color: 'orange' }}>Login</Text> To Your Account
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <MaterialIcons
              name='email'
              size={24}
              color='orange'
              style={{ marginLeft: 10 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder='Email'
              placeholderTextColor='gray'
              style={[styles.input, { fontSize: email ? 16 : 16 }]}
              keyboardType='email-address'
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputView}>
            <Entypo
              name='key'
              size={24}
              color='orange'
              style={{ marginLeft: 10 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder='Password'
              placeholderTextColor='gray'
              style={[styles.input, { fontSize: password ? 16 : 16 }]}
              secureTextEntry
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Keep me logged in</Text>
          <Pressable>
            <Text style={{ color: '#007FFF', fontWeight: '500' }}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 60 }} />
        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: 'orange',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
            Don't have an account? <Text style={{ color: 'orange', fontWeight: 'bold' }}>Sign Up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 200,
  },
  keyBoardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 50,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  input: {
    color: 'blue',
    marginVertical: 10,
    width: 300,
  },
})
