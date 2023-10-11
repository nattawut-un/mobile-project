import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text, Appbar, MD3Colors } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import SettingsHome from './settings/SettingsHome'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName='SettingsHome' screenOptions={{
      header: SettingsHeader
    }}>
      <Stack.Screen name='SettingsHome' component={SettingsHome} options={{
        title: 'Settings',
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

function SettingsHeader({ navigation }) {
  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
    >
      <Appbar.BackAction
        color={MD3Colors.primary90}
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content title="Settings" color="white" />
    </Appbar.Header>
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
