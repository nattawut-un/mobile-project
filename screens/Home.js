import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import { Portal, PaperProvider, Text, Appbar, MD3Colors, FAB } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import { useSelector, useDispatch } from 'react-redux'
import { Timestamp, getDocs, onSnapshot } from 'firebase/firestore';
import _ from 'lodash';

import { addAssignmentDocument, addSubjectDocument, checkAdmin, getAssignmentsCollection, getSubjectsCollection, getSubjectsCollectionData, saveAssignmentDocument } from 'services/firestore';

import ListCard from 'components/ListCard';
import TestImage from 'assets/icon.png'
import Settings from './Settings';
import { AddAssignmentModal, AddSubjectModal, AddTimetableModal, AssigmentDetailModal } from 'components/modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()

function Homepage({ navigation }) {
  const user = useSelector(state => state.user.user)

  dayjs.extend(UTC)

  const [assignments, setAssignments] = useState([])
  const getAssignment = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const assignmentData = res.data()
      data.push({ key: res.id, ...assignmentData })
    })

    const now = new Date()
    const unfinishedData = data.filter(
      item => !item.finished
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

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false)
  const addSubject = subject => {
    if (!subject) return

    subject['ownerUID'] = user.uid
    console.log('Adding subject: ' + JSON.stringify(subject))
    addSubjectDocument(subject)

    setShowAddSubjectModal(false)
  }

  const [showAddTimetableModal, setShowAddTimetableModal] = useState(false)

  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false)
  const addAssignment = assignment => {
    if (!user) return

    assignment['ownerUID'] = user.uid
    console.log('Adding assignment: ' + JSON.stringify(assignment))
    addAssignmentDocument(assignment)

    setShowAddAssignmentModal(false)
  }

  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false)
  const [assignmentData, setAssignmentData] = useState({})
  const showModal = data => {
    setAssignmentData(data)
    setShowAssignmentDetails(true)
  }

  const [subjects, setSubjects] = useState([])
  const getSubject = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const fields = res.data()
      data.push({ key: res.id, ...fields })
    })
    setSubjects(data)
  }

  const subjectsQuery = getSubjectsCollection(user ? user.uid : '')
  useEffect(() => {
    const unsub = onSnapshot(subjectsQuery, { next: getSubject })
    return () => unsub()
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Clock />
        <View style={{ marginVertical: 8 }}>
          <FlatList
            data={assignments}
            renderItem={({ item }) => (
              <ListCard
                key={item}
                title={item.title}
                description={getSubjectName(subjects, item.subjectId)}
                date={item.dueDate.seconds ?? null}
                icon={
                  <MaterialCommunityIcons
                    name="calendar"
                    size={36}
                    color={MD3Colors.primary50}
                  />
                }
                onPress={() => showModal(item)}
              />
            )}
          />
        </View>
      </View>
      <HomeFAB
        assignmentFunction={setShowAddAssignmentModal}
        timetableFunction={setShowAddTimetableModal}
        subjectFunction={setShowAddSubjectModal}
      />
      <AddSubjectModal
        visible={showAddSubjectModal}
        onCancel={() => setShowAddSubjectModal(false)}
        onOK={addSubject}
      />
      <AddAssignmentModal
        visible={showAddAssignmentModal}
        onCancel={() => setShowAddAssignmentModal(false)}
        onOK={addAssignment}
        list={subjects}
      />
      <AssigmentDetailModal
        data={{
          ...assignmentData,
          subject: getSubjectName(subjects, assignmentData.subjectId)
        }}
        visible={showAssignmentDetails}
        onDismiss={() => setShowAssignmentDetails(false)}
      />
    </>
  )
}

export default function Home({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='Homepage' screenOptions={{
      header: HomeHeader
    }}>
      <Stack.Screen name='Homepage' component={Homepage} />
      <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function HomeHeader({ navigation }) {
  const toSettings = () => navigation.navigate('Settings')

  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
    >
      <Appbar.Action icon="home" color={MD3Colors.primary90} />
      <Appbar.Content title="Home" color="white" />
      <Appbar.Action
        icon="cog"
        color={MD3Colors.primary90}
        onPress={toSettings}
      />
    </Appbar.Header>
  )
}

function Clock() {
  const [date, setDate] = useState(dayjs())
  const clockInterval = () => {
    setDate(dayjs())
  }

  useEffect(() => {
    const interval = setInterval(clockInterval, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.timeElement}>
      <Text variant="displayLarge" style={styles.time}>
        {date.format('H:mm:ss')}
      </Text>
      <Text variant="titleLarge" style={styles.time}>
        {date.format('dddd, MMMM D, YYYY')}
      </Text>
    </View>
  )
}

function HomeFAB(props) {
  const [open, setOpen] = useState(false)
  const onStateChange = () => setOpen(!open)

  const { assignmentFunction, timetableFunction, subjectFunction } = props

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? 'arrow-down' : 'plus'}
      actions={[
        {
          icon: 'bookmark',
          label: 'Subject',
          onPress: () => subjectFunction(true),
        },
        // {
        //   icon: 'table',
        //   label: 'Timetable',
        //   onPress: () => timetableFunction(true),
        // },
        {
          icon: 'book',
          label: 'Assignment',
          onPress: () => assignmentFunction(true),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  )
}

function getSubjectName(subject, id) {
  if (!subject) return '...'

  const subjectItem = subject.find(subj => subj.key == id)
  if (!subjectItem) return '...'
  if (!('title' in subjectItem)) return '...'
  return subjectItem.title
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  timeElement: {
    paddingTop: 32,
    paddingBottom: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    fontWeight: '700',
  },
  text: {
    fontFamily: 'font-thai',
    fontSize: 99
  },
})
