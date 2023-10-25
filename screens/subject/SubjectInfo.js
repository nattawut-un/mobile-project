import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { Text, MD3Colors, Chip, Divider } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { DAYS } from 'constants'
import { useSelector } from 'react-redux'

import ListCard from 'components/ListCard'
import { getAssignmentsCollection, getSubjectDocument } from 'services/firestore'
import { Timestamp, onSnapshot } from 'firebase/firestore'
import _ from 'lodash'
import { ConfirmFinishAssignmentModal } from 'components/modal'
import dayjs from 'dayjs'

const Tab = createMaterialTopTabNavigator()

export default function SubjectInfo({ navigation, route }) {
  const { subject } = route.params

  return (
    <Tab.Navigator
      initialRouteName="SubjectInfoTab"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: MD3Colors.primary50,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: MD3Colors.primary80,
        tabBarIndicatorStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Tab.Screen
        name="SubjectInfoTab"
        component={SubjectInfoTab}
        options={{ title: 'Info' }}
        initialParams={{ subject }}
      />
      <Tab.Screen
        name="SubjectInfoHomework"
        component={SubjectInfoHomework}
        options={{ title: 'Homework' }}
        initialParams={{ subject }}
      />
    </Tab.Navigator>
  )
}

function SubjectInfoTab({ navigation, route }) {
  const [subject, setSubject] = useState({})
  const subjectDoc = getSubjectDocument(route.params.subject.key)
  useEffect(() => {
    onSnapshot(subjectDoc, snap => {
      setSubject({ key: snap.id, ...snap.data() })
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      {subject.image ? (
        <Image
          src={subject.image}
          style={{
            height: 200,
            borderWidth: 2,
            borderColor: '#eee',
            borderRadius: 15,
            marginBottom: 4,
          }}
        />
      ) : null}
      <ListCard
        title="Teacher"
        description={subject.teacher}
        icon={<FontAwesome name="user" size={40} color={MD3Colors.primary50} />}
      />
      <ListCard
        title="Description"
        description={subject.description}
        icon={
          <MaterialIcons name="info" size={40} color={MD3Colors.primary50} />
        }
      />
      <ListCard
        title="Timetable"
        icon={
          <MaterialIcons name="today" size={40} color={MD3Colors.primary50} />
        }
        onPress={() => navigation.navigate('Timetable')}
      >
        {subject.timetable ? (
          subject.timetable.map((item, index) => (
            <Chip
              key={index}
              icon="information"
              onPress={() => console.log('Pressed')}
              style={styles.chip}
            >
              {DAYS[item.day].short}, {item.h}:{item.m}-{item.hEnd}:{item.mEnd}
            </Chip>
          ))
        ) : (
          <Text style={{ fontStyle: 'italic' }}>None</Text>
        )}
      </ListCard>
      <View style={{ marginVertical: 16 }} />
    </ScrollView>
  )
}

function SubjectInfoHomework({ navigation, route }) {
  const { subject } = route.params

  const user = useSelector(state => state.user.user)

  const [assignments, setAssignments] = useState([])
  const getAssignment = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const assignmentData = res.data()
      data.push({ key: res.id, ...assignmentData })
    })

    const sortedData = _.sortBy(data, item => item.dueDate.seconds)
    const filteredData = sortedData.filter(
      item => item.subjectId == subject.key
    )
    setAssignments(filteredData)
  }

  const assignmentsQuery = getAssignmentsCollection(user ? user.uid : '')
  useEffect(() => {
    const unsub = onSnapshot(assignmentsQuery, { next: getAssignment })
    return () => unsub()
  }, [])

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [assignmentId, setAssignmentId] = useState(null)
  const [assignmentPoint, setAssignmentPoint] = useState(null)
  const [userId, setUserId] = useState(null)
  const [date, setDate] = useState(null)

  return (
    <>
      <ScrollView style={styles.container}>
        {assignments
          ? assignments.map(
              ({ key, title, description, dueDate, points, finished }) => (
                <>
                  <ListCard
                    key={key}
                    title={title}
                    icon={
                      <MaterialIcons
                        name="info"
                        size={40}
                        color={MD3Colors.primary50}
                      />
                    }
                  >
                    <Text variant="bodySmall">
                      {dayjs(new Timestamp(dueDate.seconds, 0).toDate()).format(
                        'HH:mm - MMMM DD, YYYY'
                      )}
                    </Text>
                    <Text variant="bodySmall">{points} points</Text>
                    <Divider style={{ marginVertical: 8 }} />
                    <Text variant="labelMedium">Description</Text>
                    <Text style={{ marginBottom: 8 }}>{description}</Text>
                    {finished ? (
                      <ChipFinished />
                    ) : (
                      <ChipUnfinished
                        onPress={() => {
                          setAssignmentId(key)
                          setAssignmentPoint(points)
                          setUserId(user ? user.uid : '')
                          setDate(dueDate)
                          setShowConfirmModal(true)
                        }}
                      />
                    )}
                  </ListCard>
                </>
              )
            )
          : null}
      </ScrollView>
      <ConfirmFinishAssignmentModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onOK={() => setShowConfirmModal(false)}
        assignmentId={assignmentId}
        point={isOnTime(date) ? assignmentPoint : 0}
        userId={userId}
      />
    </>
  )
}

const ChipFinished = () => (
  <Chip icon="check" style={styles.chip}>
    Finish
  </Chip>
)

const ChipUnfinished = ({ onPress }) => (
  <Chip icon="close" onPress={onPress} style={styles.chip}>
    Unfinished
  </Chip>
)

function isOnTime(dueTime) {
  if (!dueTime) return false
  if (!('seconds' in dueTime)) return false
  const due = dayjs(new Timestamp(dueTime.seconds, 0).toDate()).unix()
  const now = dayjs().unix()

  return due > now
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  chip: {
    marginTop: 4,
    // backgroundColor: 'hsla(0, 0%, 0%, 0.07)',
  },
})
