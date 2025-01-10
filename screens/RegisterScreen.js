import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigation = useNavigation()
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.keyBoardView}>
          <Text style={styles.loginText}>
            <Text style={{ color: 'orange' }}>Register</Text> To Your Account
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <MaterialIcons
              name='person'
              size={24}
              color='orange'
              style={{ marginLeft: 10 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                ...styles.input,
                fontSize: name ? 16 : 16,
              }}
              placeholder='your name'
            />
          </View>
          <View style={styles.inputView}>
            <MaterialIcons
              name='email'
              size={24}
              color='orange'
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder='Email'
              placeholderTextColor='gray'
              style={[styles.input, { fontSize: email ? 16 : 16 }]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
            />
          </View>
          <View style={styles.inputView}>
            <MaterialIcons
              name='lock'
              size={24}
              color='orange'
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder='Password'
              placeholderTextColor='gray'
              secureTextEntry
              style={[styles.input, { fontSize: password ? 16 : 16 }]}
              value={password}
              onChangeText={(text) => setPassword(text)}
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

          <Text style={{ color: '#007FFF', fontWeight: '500' }}>
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 60 }} />
        <Pressable
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
            Already have an account?{' '}
            <Text style={{ color: 'orange', fontWeight: 'bold' }}>Sign In</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
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
    marginTop: 12,
  },
  inputContainer: {
    marginTop: 40,
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
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },
})
