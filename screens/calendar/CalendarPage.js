import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, MD3Colors, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { CalendarProvider, CalendarList } from 'react-native-calendars'
import { onSnapshot, Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import _ from "lodash";

import { getAssignmentsCollection } from "services/firestore";
import { parseAppointmentsToMarkedDates } from "services/calendar";

export default function CalendarPage({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const goToDate = date => navigation.navigate('CalendarDetails')

  const user = useSelector(state => state.user.user)
  const [assignments, setAssignments] = useState([])
  const getAssignment = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const { title, description, dueDate } = res.data()
      data.push({ key: res.id, title, description, dueDate })
    })

    const now = new Date()
    const unfinishedData = data.filter(
      item =>
        now <
        new Timestamp(item.dueDate.seconds, item.dueDate.nanoseconds).toDate()
    )
    const sortedData = _.sortBy(unfinishedData, item => item.dueDate.seconds)
    setAssignments(sortedData)
    console.log('Assignment fetched.')
  }

  const assignmentsQuery = getAssignmentsCollection(user ? user.uid : '')
  useEffect(() => {
    const unsub = onSnapshot(assignmentsQuery, { next: getAssignment })
    return () => unsub()
  }, [])

  const today = dayjs().format('YYYY-MM-DD')
  const [groupedAssignments, markedAssignments] = parseAppointmentsToMarkedDates(assignments)
  const markedDates = {
    [today]: { selectedColor: MD3Colors.primary50, selected: true },
    ...markedAssignments,
  }

  return (
    <CalendarList
      // (months) example: {"year":2024,"month":3,"day":18,"timestamp":1710720000000,"dateString":"2024-03-18"}
      // onVisibleMonthsChange={months => console.log('CalendarPage: rendering ' + months.dateString)}
      pastScrollRange={12}
      futureScrollRange={12}
      showScrollIndicator={true}
      onDayPress={day =>
        navigation.navigate('CalendarDetails', {
          date: day.dateString,
          assignments: groupedAssignments[day.dateString] ?? null,
        })
      }
      current={dayjs().format('YYYY-MM-DD')}
      renderHeader={renderCustomHeader}
      markingType="custom"
      markedDates={markedDates}
    />
  )
}

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy')
  const [month, year] = header.split(' ')
  const textStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: MD3Colors.primary50,
    paddingRight: 5,
  }

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  month: {
    marginLeft: 5
  },
  year: {
    marginRight: 5
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
})
