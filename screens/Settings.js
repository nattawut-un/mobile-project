import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SettingsHome from './settings/SettingsHome'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName='SettingsHome'>
      <Stack.Screen name='SettingsHome' component={SettingsHome} options={{
        title: 'Settings'
      }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
