import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { ActivityIndicator, MD3Colors, PaperProvider } from 'react-native-paper'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'

import Main from './screens/Main'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  async function loadFont() {
    await Font.loadAsync({
      'font-thai': require('./assets/fonts/NotoSansThai.ttf'),
    })
    console.log('font loaded')
    setLoaded(true)
  }

  useEffect(() => {
    loadFont()
  }, [])

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer>
        <PaperProvider>
          <Main />
          <StatusBar style='light' backgroundColor={MD3Colors.primary40} />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}
