import { View, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  ActivityIndicator,
  Appbar,
  MD3Colors
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import SubjectHome from './subject/SubjectHome'
import SubjectInfo from './subject/SubjectInfo'
import { DeleteSubjectMobal, EditSubjectModel } from 'components/modal'
import { useState } from 'react'

const Stack = createNativeStackNavigator()

export default function Subject() {
  return (
    <Stack.Navigator initialRouteName="SubjectHome">
      <Stack.Screen
        name="SubjectHome"
        component={SubjectHome}
        options={{
          title: 'Subjects',
          header: SubjectHomeHeader,
        }}
      />
      <Stack.Screen
        name="SubjectInfo"
        component={SubjectInfo}
        options={{
          title: 'Subjects Info',
          header: SubjectInfoHeader
        }}
      />
    </Stack.Navigator>
  )
}

function SubjectHomeHeader() {
  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50 }}
    >
      <Appbar.Action
        icon="bookmark-multiple"
        color={MD3Colors.primary90}
      />
      <Appbar.Content title="Subjects" color="white" />
      {/* <Appbar.Action
        icon="dots-vertical"
        color={MD3Colors.primary90}
        // onPress={_handleMore}
      /> */}
    </Appbar.Header>
  )
}

function SubjectInfoHeader({ navigation, route }) {
  const { subject } = route.params

  const [showDeleteSubjectModal, setShowDeleteSubjectModal] = useState(false)
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState({})

  const deleteSubject = () => {
    navigation.navigate('SubjectHome')
    setShowDeleteSubjectModal(false)
  }

  return (
    <>
      <Appbar.Header
        mode="medium"
        style={{
          backgroundColor: MD3Colors.primary50,
        }}
      >
        <Appbar.BackAction
          color={MD3Colors.primary90}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={subject.title} color="white" />
        <Appbar.Action
          icon="pencil"
          color={MD3Colors.primary90}
          onPress={() => {
            setSelectedSubject(subject)
            setShowEditSubjectModal(true)
          }}
        />
        <Appbar.Action
          icon="delete"
          color={MD3Colors.primary90}
          onPress={() => setShowDeleteSubjectModal(true)}
        />
      </Appbar.Header>
      <DeleteSubjectMobal
        visible={showDeleteSubjectModal}
        onCancel={() => setShowDeleteSubjectModal(false)}
        onOK={deleteSubject}
        subjectId={subject.key}
      />
      <EditSubjectModel
        visible={showEditSubjectModal}
        onCancel={() => setShowEditSubjectModal(false)}
        onOK={() => setShowEditSubjectModal(false)}
        data={selectedSubject}
      />
    </>
  )
}

const styles = StyleSheet.create({
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

