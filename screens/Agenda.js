import { Text, ScrollView, StyleSheet } from 'react-native'
import { useState } from 'react'
import { Timeline, CalendarList, LocaleConfig } from 'react-native-calendars'

export default function Subject() {
  const [selected, setSelected] = useState('')

  return (
    <ScrollView style={styles.container}>
      <Text>WIP</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
