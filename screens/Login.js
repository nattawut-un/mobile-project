import { useState } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper'
import { ActivityIndicator, MD3Colors } from "react-native-paper";
import { FIREBASE_AUTH } from "config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'

import { saveUser } from 'config/redux'

import Icon from '../assets/icon.png'

export default function Login() {
  const [register, setRegister] = useState(false)

  const [email, setEmail] = useState('baszaa1234@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH

  const dispatch = useDispatch()

  const signIn = async () => {
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful:', res)
    } catch (err) {
      console.log(err)
      Alert.alert('Error', printError(err.code) + '\nPlease try again later.')
    } finally {
      setLoading(false)
    }
  }

  const signUp = async () => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
    } catch (err) {
      console.log(err)
      Alert.alert('Error', printError(err.code) + '\nPlease try again later.')
    } finally {
      setLoading(false)
    }
  }

  const printError = code => {
    switch (code) {
      case 'auth/invalid-login-credentials':
        return 'Email and/or password is wrong.'
      case 'auth/invalid-password':
        return 'Email and/or password is wrong.'
      case 'auth/invalid-email':
        return 'Email and/or password is wrong.'
      case 'auth/email-already-exists':
        return 'This email is already in use.'
      case 'auth/email-already-in-use':
        return 'This email is already in use.'
      case 'auth/weak-password':
        return 'This password is weak.'
      default:
        return code
    }
  }

  return register ? (
    <View style={styles.container}>
      <Image source={Icon} style={styles.icon} />
      <Text variant="displayMedium" style={{ fontWeight: 'bold' }}>
        Hello.
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        mode="outlined"
        label="Password"
        style={styles.input}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={MD3Colors.primary50}
          style={{ margin: 16 }}
        />
      ) : (
        <>
          <View style={styles.button}>
            <Button onPress={signIn} mode="contained">
              Login
            </Button>
          </View>
          <View style={styles.button}>
            <Button onPress={signUp} mode="contained-tonal">
              Register
            </Button>
          </View>
        </>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      <Image source={Icon} style={styles.icon} />
      <Text variant="displayMedium" style={{ fontWeight: 'bold' }}>
        Hello.
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        mode="outlined"
        label="Password"
        style={styles.input}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={MD3Colors.primary50}
          style={{ margin: 16 }}
        />
      ) : (
        <>
          <View style={styles.button}>
            <Button onPress={signIn} mode="contained">
              Login
            </Button>
          </View>
          <View style={styles.button}>
            <Button onPress={signUp} mode="contained-tonal">
              Register
            </Button>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 150,
    height: 150,
    objectFit: 'contain',
    borderRadius: 20,
    margin: 16
  },
  input: {
    margin: 4,
    width: '75%',
    height: 40
  },
  button: {
    margin: 4,
    width: '75%'
  }
})
