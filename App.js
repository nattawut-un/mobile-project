import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { ActivityIndicator, MD3Colors, PaperProvider } from 'react-native-paper'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import userReducer from 'config/redux'

import Main from './screens/Main'

import AppTheme from 'config/theme'

const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(rootReducer)

export default function App() {
  // const [loaded, setLoaded] = useState(false)

  // async function loadFont() {
  //   await Font.loadAsync({
  //     'font-thai': require('./assets/fonts/NotoSansThai.ttf'),
  //   })
  //   console.log('font loaded')
  //   setLoaded(true)
  // }

  // useEffect(() => {
  //   loadFont()
  // }, [])

  // if (!loaded) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator animating={true} size="large" />
  //     </View>
  //   )
  // }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
