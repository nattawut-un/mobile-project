import { View, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  ActivityIndicator,
  Appbar,
  MD3Colors,
  Chip
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import RewardHome from './Reward/RewardHome'
import RewardHistory from './Reward/RewardHistory'
import QrCode from './Reward/Qrcode'
import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { getUserInfo } from 'services/firestore'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

export default function Reward() {
  return (
    <Stack.Navigator initialRouteName="RewardHome">
      <Stack.Screen
        name="RewardHome"
        component={RewardHome}
        options={{ header: RewardHomeHeader }}
      />
      <Stack.Screen
        name="RewardHistory"
        component={RewardHistory}
        options={{ header: RewardHistoryHeader }}
      />
      <Stack.Screen
        name="RewardQRCode"
        component={QrCode}
        options={{ header: RewardQRCodeHeader }}
      />
    </Stack.Navigator>
  )
}

function RewardHomeHeader({ navigation }) {
  const user = useSelector(state => state.user.user)

  const [userInfo, setUserInfo] = useState({})
  const userRef = getUserInfo(user ? user.uid : '0')
  useEffect(() => {
    const unsub = onSnapshot(userRef, {
      next: snap => {
        setUserInfo(snap.data())
      },
    })
    return () => unsub()
  }, [])

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50, }}
    >
      <Appbar.Action icon="tag-multiple" color={MD3Colors.primary90} />
      <Appbar.Content title="Rewards" color="white" />
      <Chip mode='flat'>{userInfo ? userInfo.point : '?'} : $</Chip>
      <Appbar.Action
        icon="bookmark-multiple"
        color={MD3Colors.primary90}
        onPress={() => navigation.navigate('RewardHistory')}
      />
    </Appbar.Header>
  )
}

function RewardHistoryHeader({ navigation }) {
  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50, }}
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} color={MD3Colors.primary90} />
      <Appbar.Content title="History" color="white" />
    </Appbar.Header>
  )
}

function RewardQRCodeHeader({ navigation }) {
  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50, }}
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} color={MD3Colors.primary90} />
      <Appbar.Content title="Redeem" color="white" />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
})