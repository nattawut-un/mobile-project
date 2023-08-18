import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font'
import { FAB, Portal, PaperProvider } from 'react-native-paper'
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc'

import HomeFAB from '../components/HomeFAB';

const Stack = createNativeStackNavigator()

export default function App() {
  dayjs.extend(UTC)

  const [date, setDate] = useState(dayjs())
  const clockInterval = () => {
    setDate(dayjs())
  }

  useEffect(() => {
    setInterval(clockInterval, 1000)
    return () => clearInterval(clockInterval)
  }, [])

  const [state, setState] = useState({ open: false })
  const onStateChange = ({ open }) => setState({ open })
  const { open } = state

  return (
    <PaperProvider>
      <Portal>
        <ScrollView style={styles.container}>
          <View style={styles.timeElement}>
            <Text style={{ ...styles.time, fontSize: 60 }}>
              {date.format('hh:mm:ss')}
            </Text>
            <Text style={{ ...styles.time, fontSize: 24 }}>
              {date.format('dddd, MMMM D, YYYY')}
            </Text>
          </View>
        </ScrollView>
        <HomeFAB />
      </Portal>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  timeElement: {
    paddingVertical: 16
  },
  time: {
    fontWeight: 'bold',
  },
})
