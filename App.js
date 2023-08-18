import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { View, Text, StyleSheet } from 'react-native'

import Main from './screens/Main'
import { ActivityIndicator } from 'react-native-paper'

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }

export default function App() {
  const [loaded] = useFonts({
    NotoSansThai: require('./assets/fonts/NotoSansThai.ttf')
  })

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', fontFamily: 'NotoSansThai' }}>
      <NavigationContainer>
        <Main />
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaView>
  )
}
