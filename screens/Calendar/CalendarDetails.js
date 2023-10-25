import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { MD3Colors, Text } from 'react-native-paper'
import React from 'react'
import ListCard from 'components/ListCard'
import TestImage from '../../assets/JastKherZ.png'
import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AssigmentDetailModal } from 'components/modal'
import { useState } from 'react'

// Date example
// {"dateString": "2023-10-22", "day": 22, "month": 10, "timestamp": 1697932800000, "year": 2023}

const CalendarDetails = ({ navigation, route }) => {
  const date = dayjs(route.params.date)
  const { assignments } = route.params

  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={{ width: '100%', paddingVertical: 16 }}>
          <Text variant="headlineMedium">{date.format('dddd, MMMM DD')}</Text>
          <Text variant="labelLarge">
            {assignments ? assignments.length : '0'} homework
            {assignments ? (assignments.length >= 2 ? 's' : '') : ''}
          </Text>
        </View>
        <View>
          {assignments ? (
            <FlatList
              data={assignments}
              renderItem={({ item }) => (
                <ListCard
                  key={item.key}
                  title={item.title}
                  description={item.description}
                  date={item.dueDate.seconds}
                  showTime={true}
                  icon={
                    <MaterialCommunityIcons
                      name="calendar"
                      size={36}
                      color={MD3Colors.primary50}
                    />
                  }
                  onPress={() => {
                    setSelectedAssignment(item)
                    setShowDetailModal(true)
                  }}
                />
              )}
            />
          ) : (
            <View>
              <Text variant="bodyMedium">Nothing here... 💤</Text>
              <Text variant="bodySmall">You can add something.</Text>
            </View>
          )}
        </View>
      </View>
      <AssigmentDetailModal
        visible={showDetailModal}
        onDismiss={() => setShowDetailModal(false)}
        data={selectedAssignment}
      />
    </>
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
