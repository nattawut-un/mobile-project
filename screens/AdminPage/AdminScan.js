import { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Alert } from 'react-native'
import { Text, Button, ActivityIndicator, MD3Colors } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Base64 } from 'js-base64'

import Box from '../../assets/box.png'
import AdminRedeem from './AdminRedeem'
import AdminSuccess from './AdminSuccess'

const Stack = createNativeStackNavigator()

export default function AdminScan({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="AdminScanQR"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AdminScanQR" component={AdminScanQR} />
      <Stack.Screen name="AdminRedeem" component={AdminRedeem} />
      <Stack.Screen name="AdminSuccess" component={AdminSuccess} />
    </Stack.Navigator>
  )
}

function AdminScanQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    console.log(`Bar code type: ${type}\nData: ${data}`)
    try {
      const decoded = JSON.parse(Base64.decode(data))
      if (!('key' in decoded && 'rewardId' in decoded && 'userId' in decoded)) {
        return Alert.alert('Error', 'This QR code is invalid.')
      }

      navigation.navigate('AdminRedeem', { item: decoded })
    } catch (err) {
      console.log(err)
      return Alert.alert('Error', 'This QR code is invalid.')
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="camera-off" size={48} color={MD3Colors.primary50} />
        <Text>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        type='back'
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button mode='contained' onPress={() => setScanned(false)} icon='restart' style={{ position: 'absolute', bottom: 16, right: 16 }}>
          Tap to scan again
        </Button>
      )}
      <Image source={Box} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MD3Colors.primary50,
  },
  image: {
    width: '70%',
    objectFit: 'contain',
    opacity: 0.5
  }
})
