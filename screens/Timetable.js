import { Text, ScrollView, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import { Timeline, CalendarList, LocaleConfig } from 'react-native-calendars'
import TimeTable from '@mikezzb/react-native-timetable'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnimatedFAB, Appbar, MD3Colors } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { getSubjectsCollection } from 'services/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { AddTimetableModal, DeleteTimetableModel } from 'components/modal'

const Stack = createNativeStackNavigator()

export default function Timetable({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="TimetableHome">
      <Stack.Screen
        name="TimetableHome"
        component={TimetablePage}
        options={{
          header: TimetableHeader,
        }}
      />
    </Stack.Navigator>
  )
}

function TimetablePage() {
  const [subjects, setSubjects] = useState([])
  const getSubject = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const fields = res.data()
      data.push({ key: res.id, ...fields })
    })
    setSubjects(data)
  }

  const user = useSelector(state => state.user.user)
  const subjectsQuery = getSubjectsCollection(user ? user.uid : '')
  useEffect(() => {
    const unsub = onSnapshot(subjectsQuery, { next: getSubject })
    return () => unsub()
  }, [])

  const [timetableList, setTimetableList] = useState([])
  useEffect(() => {
    var list = []
    subjects.forEach(item => {
      if (item.timetable) {
        item.timetable.forEach(table => {
          list.push({
            courseId: item.title,
            title: item.key,
            day: table.day,
            startTime: `${table.h}:${table.m}`,
            endTime: `${table.hEnd}:${table.mEnd}`,
            section: `${table.h}:${table.m} - ${table.hEnd}:${table.mEnd}`,
          })
        })
      }
    })
    setTimetableList(list)
  }, [subjects])

  const [showAddTimetableModal, setShowAddTimetableModal] = useState(false)

  const [showDeleteTimetableModal, setShowDeleteTimetableModal] = useState(false)
  const [selectedTimetable, setSelectedTimetable] = useState(null)

  return (
    <>
      <TimeTable
        events={timetableList}
        eventOnPress={event => {
          console.log(event)
          const data = {
            key: event.title,
            day: event.day,
            startTime: event.startTime,
            endTime: event.endTime
          }
          setSelectedTimetable(data)
          setShowDeleteTimetableModal(true)
        }}
        headerStyle={{
          backgroundColor: MD3Colors.primary30,
        }}
        configs={{
          startHour: 0,
          endHour: 24,
        }}
      />
      <AnimatedFAB
        icon="plus"
        label="Add"
        extended={true}
        onPress={() => setShowAddTimetableModal(true)}
        style={[styles.fabStyle, { animateFrom: 16 }]}
      />
      <AddTimetableModal
        visible={showAddTimetableModal}
        onCancel={() => setShowAddTimetableModal(false)}
        onOK={() => setShowAddTimetableModal(false)}
        subjectList={subjects}
        timetableList={timetableList}
      />
      <DeleteTimetableModel
        visible={showDeleteTimetableModal}
        onCancel={() => setShowDeleteTimetableModal(false)}
        onOK={() => setShowDeleteTimetableModal(false)}
        data={selectedTimetable}
      />
    </>
  )
}

function TimetableHeader() {
  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
    >
      <Appbar.Action icon="timetable" color={MD3Colors.primary90} />
      <Appbar.Content title="Timetable" color="white" />
      {/* <Appbar.Action
        icon="cog"
        color={MD3Colors.primary90}
        onPress={toSettings}
      /> */}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
})
