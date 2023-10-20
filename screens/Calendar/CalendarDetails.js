import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import ListCard from 'components/ListCard'
import TestImage from '../../assets/JastKherZ.png'
import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

// Date example
// {"dateString": "2023-10-22", "day": 22, "month": 10, "timestamp": 1697932800000, "year": 2023}

const CalendarDetails = ({ navigation, route }) => {
  const date = dayjs(route.params.date)
  const { assignments } = route.params

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: '100%', paddingVertical: 16 }}>
        <Text variant="headlineMedium">{date.format('dddd, MMMM DD')}</Text>
        <Text variant="labelLarge">
          {assignments ? assignments.length : '0'} homework
          {assignments ? (assignments.length >= 2 ? 's' : '') : ''}
        </Text>
      </View>
      <View>
        {assignments ? (
          assignments.map((item, index) => (
            <ListCard
              key={index}
              title={item.title}
              description={item.description}
              date={item.dueDate.seconds}
              showTime={true}
              image={TestImage}
            />
          ))
        ) : (
          <View>
            <Text variant="bodyMedium">Nothing here... 💤</Text>
            <Text variant="bodySmall">You can add something.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default CalendarDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header_text: {
    fontSize: 20,
  },
  imagesize: {
    height: 300,
    width: 300,
    objectFit: 'contain',
  },
})
