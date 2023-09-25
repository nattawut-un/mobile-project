import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import SettingsHome from './settings/SettingsHome'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName='SettingsHome'>
      <Stack.Screen name='SettingsHome' component={SettingsHome} options={{
        title: 'Settings',
        headerLeft: () => <Ionicons name="settings" size={24} color="black" style={{ marginRight: 12 }} />,
        headerShown: false
      }} />
      <Stack.Screen name='SettingsA' component={Placeholder} options={{
        title: 'First Page',
      }} />
    </Stack.Navigator>
  )
}

function Placeholder() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} size="large" />
      <View style={{ marginVertical: 4 }} />
      <Text variant="bodyMedium">WIP</Text>
    </View>
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
