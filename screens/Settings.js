import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text, Appbar, MD3Colors } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import SettingsHome from './settings/SettingsHome'
import AdminMain from './AdminPage/AdminMain'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName="SettingsHome">
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{
          header: SettingsHeader,
        }}
      />
      <Stack.Screen
        name="AdminPage"
        component={AdminMain}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
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
