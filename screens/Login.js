import { useState } from "react";
import { StyleSheet, Image, View, Button, Alert } from "react-native";
import { Text, TextInput } from 'react-native-paper'
import { ActivityIndicator, MD3Colors } from "react-native-paper";
import { FIREBASE_AUTH } from "config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'

import { saveUser } from 'config/redux'

import Icon from '../assets/icon.png'

export default function Login() {
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
      Alert.alert('Error', 'Please check your email and password, and try again.')
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
      Alert.alert('Error', 'Please check your email and password, and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
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
        <ActivityIndicator size="large" color={MD3Colors.primary50} style={{ margin: 16 }} />
      ) : (
        <>
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={signIn}
              color={MD3Colors.primary50}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Register"
              onPress={signUp}
              color={MD3Colors.primary50}
              disabled={true}
          />
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
