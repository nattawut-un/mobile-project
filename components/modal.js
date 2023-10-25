import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View, ScrollView } from "react-native";
import { Text, Dialog, Button, Portal, TextInput, MD3Colors, Modal, Chip } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

import { uploadFileToStorage } from "services/fb_storage";
import { addItemDocument, addTimetable, deleteAssignmentDocument, deleteItemDocument, deleteSubjectDocument, deleteTimetable, markAssignmentAsFinished, saveAssignmentDocument, updateItemDocument, updateSubjectDocument } from "services/firestore";
import { DAYS } from "constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function LogoutModal({ visible, onCancel, onOK }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Icon icon="alert" size={48} />
        <Dialog.Title>Do you want to logout?</Dialog.Title>
        <Dialog.Content>
          {/* <Text variant="bodyMedium">Do you want to logout?</Text> */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button
            onPress={onOK}
            mode="contained"
            buttonColor="red"
            textColor="white"
            rippleColor={'hsl(0, 50%, 80%)'}
          >
            Logout
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function AddAssignmentModal({ visible, onCancel, onOK, list }) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('')

  const isTextBlank = () => title.length <= 0

  const pressCancel = () => {
    clearInput()
    onCancel()
  }

  const pressOK = () => {
    if (isTextBlank()) return

    var document = {
      title,
      description,
      dueDate: new Timestamp(Math.floor(new Date(date).getTime() / 1000), 0),
      subjectId: list && selectedSubject.length == 0 ? list[0].key : selectedSubject,
      finished: false,
      points: parseInt(points) ?? '0'
    }
    onOK(document)

    clearInput()
  }

  const clearInput = () => {
    setTitle('')
    setDescription('')
    setDate(new Date())
    setPoints('')
  }

  const [selectedSubject, setSelectedSubject] = useState("")

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Title onPress={() => console.log({ title, description, date, selectedSubject })}>Add assignment</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              mode="outlined"
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            {/* <HelperText type='error' visible={isTextBlank()}>
              Title cannot be blank
            </HelperText> */}
            <TextInput
              label="Description"
              mode="outlined"
              style={{ ...styles.textInput, height: null }}
              multiline={true}
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              label="Points"
              mode="outlined"
              style={styles.textInput}
              value={points}
              onChangeText={setPoints}
            />
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              Subject
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedSubject}
                onValueChange={setSelectedSubject}
                mode="dialog"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                {list.map(({ title, key }) => (
                  <Picker.Item label={title} value={key} key={key} />
                ))}
              </Picker>
            </View>
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              Date & Time
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Button
                style={{
                  marginVertical: 4,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  width: '65%',
                }}
                icon="calendar"
                mode="contained"
                onPress={() => {
                  setMode('date')
                  setShow(true)
                }}
              >
                {dayjs(date).format('ddd, DD MMM, YYYY')}
              </Button>
              <Button
                style={{
                  marginVertical: 4,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  width: '35%',
                }}
                icon="clock"
                mode="contained"
                onPress={() => {
                  setMode('time')
                  setShow(true)
                }}
              >
                {dayjs(date).format('HH:mm')}
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={pressCancel}>Cancel</Button>
            <Button onPress={pressOK} mode="contained">
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {show ? (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onDateChange}
        />
      ) : null}
    </>
  )
}

export function AddSubjectModal({ visible, onCancel, onOK }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [teacher, setTeacher] = useState('')
  const [file, setFile] = useState(null)

  const isTextBlank = () => title.length <= 0

  const pressCancel = () => {
    clearInput()
    onCancel()
  }

  const pressOK = async () => {
    var data = { title, teacher, description }

    if (file) {
      const splittedPath = file.uri.split('/')
      const fileName = splittedPath[splittedPath.length - 1]
      const extension = fileName.split('.')[1]

      const filePath = file.uri
      const uploadPath = '/subjects/' + new Date().getTime() + '.' + extension

      const imageUri = await uploadFileToStorage(filePath, uploadPath)
      console.log(imageUri)

      data['image'] = imageUri
    }

    onOK(data)

    clearInput()
  }

  const clearInput = () => {
    setTitle('')
    setDescription('')
    setTeacher('')
    setFile(null)
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={pressCancel}>
        <Dialog.Title>Add Subject</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <TextInput
              label="Title"
              mode="outlined"
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            {/* <HelperText type="error" visible={isTextBlank()}>
              Title cannot be blank
            </HelperText> */}
            <TextInput
              label="Teacher"
              mode="outlined"
              style={styles.textInput}
              value={teacher}
              onChangeText={setTeacher}
            />
            <TextInput
              label="Description"
              mode="outlined"
              style={{ ...styles.textInput, height: null }}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
            <Button
              style={{ marginVertical: 8 }}
              icon={file ? 'file' : 'file-outline'}
              mode="contained"
              onPress={async () => {
                const res = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 1,
                })
                console.log(res)
                if (!res.canceled) setFile(res.assets[0])
              }}
            >
              {file ? 'Image added' : 'Select File'}
            </Button>
            {file ? (
              <Image
                source={{ uri: file.uri }}
                style={{ width: '100%', height: 150, borderRadius: 15 }}
              />
            ) : null}
            {file ? (
              <Button
                icon="delete"
                textColor="red"
                style={{ marginTop: 8 }}
                onPress={() => setFile(null)}
              >
                Remove
              </Button>
            ) : null}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={pressCancel}>Cancel</Button>
          <Button onPress={pressOK} mode="contained">
            Add
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function EditSubjectModel({ visible, onCancel, onOK, data }) {
  const [mainData, setMainData] = useState({})
  useEffect(() => setMainData(data), [data])
  useEffect(() => resetInput(), [mainData])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [teacher, setTeacher] = useState('')
  const [file, setFile] = useState(null)

  const pressCancel = () => {
    onCancel()
  }

  const pressOK = async () => {
    if (!title || !description || !teacher) {
      return Alert.alert('Error', 'Data is invalid.')
    }

    var newData = { title, description, teacher }

    if (file) {
      newData['image'] = await uploadFile(file)
    }

    updateSubjectDocument(data.key, newData)
    onOK()
  }

  const resetInput = () => {
    setTitle(mainData.title)
    setDescription(mainData.description)
    setTeacher(mainData.teacher)
    setFile(null)
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={pressCancel}>
        <Dialog.Title>Edit Subject</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <TextInput
              label="Title"
              mode="outlined"
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            {/* <HelperText type="error" visible={isTextBlank()}>
              Title cannot be blank
            </HelperText> */}
            <TextInput
              label="Teacher"
              mode="outlined"
              style={styles.textInput}
              value={teacher}
              onChangeText={setTeacher}
            />
            <TextInput
              label="Description"
              mode="outlined"
              style={{ ...styles.textInput, height: null }}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
            <Button
              style={{ marginVertical: 8 }}
              icon={file ? 'file' : 'file-outline'}
              mode="contained"
              onPress={async () => {
                const res = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 1,
                })
                console.log(res)
                if (!res.canceled) setFile(res.assets[0])
              }}
            >
              {file ? 'Image added' : 'Select File'}
            </Button>
            <Image
              source={{ uri: file ? file.uri : mainData.image }}
              style={{ width: '100%', height: 150, borderRadius: 15 }}
            />
            {file ? (
              <Button
                icon="delete"
                textColor="red"
                style={{ marginTop: 8 }}
                onPress={() => setFile(null)}
              >
                Remove
              </Button>
            ) : null}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={pressCancel}>Cancel</Button>
          <Button onPress={pressOK} mode="contained">
            Add
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function DeleteSubjectMobal({ visible, onCancel, onOK, subjectId }) {
  const confirm = () => {
    deleteSubjectDocument(subjectId)
    onOK()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Icon icon="delete" size={48} />
        <Dialog.Title>Do you want to delete this subject?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">key: {subjectId}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button
            onPress={confirm}
            mode="contained"
            buttonColor="red"
            textColor="white"
            rippleColor={'hsl(0, 50%, 80%)'}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function AddTimetableModal({ visible, onCancel, onOK, subjectList, timetableList }) {
  const [subject, setSubject] = useState('')
  const [selectedDay, setSelectedDay] = useState(1)
  const [startHour, setStartHour] = useState('00')
  const [startMin, setStartMin] = useState('00')
  const [endHour, setEndHour] = useState('00')
  const [endMin, setEndMin] = useState('00')

  useEffect(() => {
    if (subjectList.length > 0) {
      resetInput()
    }
  }, [subjectList])

  const pressCancel = () => {
    resetInput()
    onCancel()
  }

  const pressOK = () => {
    const startTime = `${startHour == '0' ? '00' : startHour}:${startMin == '0' ? '00' : startMin}`
    const endTime = `${endHour == '0' ? '00' : endHour}:${endMin == '0' ? '00' : endMin}`

    if (startTime >= endTime) {
      return Alert.alert('Error', 'End time must be after start time.')
    }

    for (i=0; i<timetableList.length; i++) {
      if (
        areTimeDurationsOverlapping(
          startTime,
          endTime,
          timetableList[i].startTime,
          timetableList[i].endTime
        ) && timetableList[i].day == selectedDay
      ) {
        console.log(timetableList[i])
        return Alert.alert(
          'Error',
          'Time is overlapped with other timetable.\nPlease select the other time.'
        )
      }
    }

    console.log(subject, selectedDay, startTime, endTime)
    addTimetable(subject, selectedDay, startTime, endTime)

    resetInput()
    onOK()
  }

  const resetInput = () => {
    setSubject(subjectList[0].key)
    setSelectedDay(1)
    setStartHour('0')
    setEndHour('0')
    setStartMin('0')
    setEndMin('0')
  }

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Title>Add Timetable</Dialog.Title>
          <Dialog.Content>
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              Subject
            </Text>
            <Picker
              mode="dropdown"
              selectedValue={subject}
              onValueChange={setSubject}
            >
              {subjectList
                ? subjectList.map(({ key, title }) => (
                    <Picker.Item key={key} label={title} value={key} />
                  ))
                : null}
            </Picker>
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              Day
            </Text>
            <Picker
              mode="dropdown"
              selectedValue={selectedDay}
              onValueChange={setSelectedDay}
            >
              <Picker.Item label="Monday" value={1} />
              <Picker.Item label="Tuesday" value={2} />
              <Picker.Item label="Wednesday" value={3} />
              <Picker.Item label="Thursday" value={4} />
              <Picker.Item label="Friday" value={5} />
              <Picker.Item label="Saturday" value={6} />
              <Picker.Item label="Sunday" value={7} />
            </Picker>
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              Start Time
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Picker
                style={{ width: '50%' }}
                selectedValue={startHour}
                onValueChange={setStartHour}
                mode="dropdown"
              >
                {Array.from({ length: 24 }, (_, index) => {
                  const label = index < 10 ? `0${index}` : `${index}`
                  return <Picker.Item key={label} label={label} value={label} />
                })}
              </Picker>
              <Picker
                style={{ width: '50%' }}
                selectedValue={startMin}
                onValueChange={setStartMin}
                mode="dropdown"
              >
                {Array.from({ length: 60 }, (_, index) => {
                  const label = index < 10 ? `0${index}` : `${index}`
                  return <Picker.Item key={label} label={label} value={label} />
                })}
              </Picker>
            </View>
            <Text variant="labelMedium" style={{ marginTop: 8 }}>
              End Time
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Picker
                style={{ width: '50%' }}
                selectedValue={endHour}
                onValueChange={setEndHour}
                mode="dropdown"
              >
                {Array.from({ length: 24 }, (_, index) => {
                  const label = index < 10 ? `0${index}` : `${index}`
                  return <Picker.Item key={label} label={label} value={label} />
                })}
              </Picker>
              <Picker
                style={{ width: '50%' }}
                selectedValue={endMin}
                onValueChange={setEndMin}
                mode="dropdown"
              >
                {Array.from({ length: 60 }, (_, index) => {
                  const label = index < 10 ? `0${index}` : `${index}`
                  return <Picker.Item key={label} label={label} value={label} />
                })}
              </Picker>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={pressCancel}>Cancel</Button>
            <Button onPress={pressOK} mode="contained">
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

export function DeleteTimetableModel({ visible, onCancel, onOK, data }) {
  const confirm = () => {
    console.log(data)
    deleteTimetable(data.key, data)
    onOK()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Icon icon="delete" size={48} />
        <Dialog.Title>Do you want to delete this timetable?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Day: {data ? DAYS[data.day].long : ''}</Text>
          <Text variant="bodyMedium">Start time: {data ? data.startTime : ''}</Text>
          <Text variant="bodyMedium">End time: {data ? data.endTime : ''}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button
            onPress={confirm}
            mode="contained"
            buttonColor="red"
            textColor="white"
            rippleColor={'hsl(0, 50%, 80%)'}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function AssignmentDetailModal({ visible, onDismiss, data }) {
  if (!data) return <View />

  const [mainData, setMainData] = useState({})
  useEffect(() => setMainData(data), [data])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [editing, setEditing] = useState(false)

  const startEdit = () => {
    resetInput()
    setEditing(true)
  }

  const cancelEdit = () => {
    resetInput()
    setEditing(false)
  }

  const saveChanges = () => {
    const seconds = Math.floor(date.getTime() / 1000)
    const editedDoc = {
      title,
      description,
      dueDate: new Timestamp(seconds, 0),
    }
    saveAssignmentDocument(data.key, editedDoc)
    setMainData(editedDoc)

    resetInput()
    setEditing(false)
  }

  const exitModal = () => {
    cancelEdit()
    onDismiss()
  }

  const deleteAssignment = () => {
    deleteAssignmentDocument(data.key)
    clearInput()
    onDismiss()
  }

  const resetInput = () => {
    setTitle(mainData.title)
    setDescription(mainData.description)
    setDate(new Date(mainData.dueDate.seconds * 1000))
  }

  const clearInput = () => {
    setTitle('')
    setDescription('')
    setDate(new Date())
  }

  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  return (
    <Portal>
      <>
        {editing ? (
          <Modal
            visible={visible}
            onDismiss={exitModal}
            contentContainerStyle={{ shadowColor: '#0000' }}
          >
            <View
              style={{
                ...styles.modalContainer,
                ...styles.top,
                backgroundColor: MD3Colors.primary50,
              }}
            >
              <TextInput
                mode="flat"
                style={{ ...styles.textInput, height: null }}
                label="Title"
                value={title}
                onChangeText={setTitle}
              />
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Button
                  style={{
                    marginVertical: 4,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    width: '65%',
                  }}
                  icon="calendar"
                  mode="contained"
                  onPress={() => {
                    setMode('date')
                    setShow(true)
                  }}
                >
                  {dayjs(date).format('ddd, DD MMM, YYYY')}
                </Button>
                <Button
                  style={{
                    marginVertical: 4,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: '35%',
                  }}
                  icon="clock"
                  mode="contained"
                  onPress={() => {
                    setMode('time')
                    setShow(true)
                  }}
                >
                  {dayjs(date).format('HH:mm')}
                </Button>
              </View>
            </View>
            <View style={{ ...styles.modalContainer, ...styles.bottom }}>
              <TextInput
                mode="outlined"
                style={{
                  ...styles.textInput,
                  height: null,
                  backgroundColor: 'white',
                }}
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
              />
              <Button
                icon="content-save"
                mode="contained"
                onPress={saveChanges}
                style={{ marginTop: 16 }}
              >
                Save
              </Button>
              <Button
                icon="cancel"
                mode="outlined"
                textColor="red"
                onPress={cancelEdit}
                style={{ marginTop: 8 }}
              >
                Cancel
              </Button>
            </View>
            {show ? (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onDateChange}
              />
            ) : null}
          </Modal>
        ) : (
          <Modal
            visible={visible}
            onDismiss={exitModal}
            contentContainerStyle={{ shadowColor: '#0000' }}
          >
            <View
              style={{
                ...styles.modalContainer,
                ...styles.top,
                backgroundColor: MD3Colors.primary50,
              }}
            >
              <Text variant="titleLarge" style={{ color: 'white' }}>
                {mainData ? mainData.title : ''}
              </Text>
              {mainData.dueDate ? (
                <Text
                  variant="titleMedium"
                  style={{ color: 'white', marginBottom: 8 }}
                >
                  {dayjs
                    .unix(mainData.dueDate.seconds)
                    .format('MMMM DD, YYYY - HH:mm')}
                </Text>
              ) : null}
              {mainData.subject ? <Text variant="titleSmall" style={{ color: 'white' }}>
                <MaterialCommunityIcons name="bookmark" /> {mainData ? mainData.subject : ''}
              </Text> : null}
            </View>
            <View style={{ ...styles.modalContainer, ...styles.bottom }}>
              <Text variant="labelSmall">Description</Text>
              <Text variant="bodyMedium">{mainData.description}</Text>
              <View style={{ marginVertical: 8 }} />
              {mainData.finished ? (
                <Chip icon="check">Finished</Chip>
              ) : (
                <Chip icon="cancel" onPress={() => setShowConfirmModal(true)}>Unfinished</Chip>
              )}
              <Button
                icon="pencil"
                mode="contained"
                onPress={startEdit}
                style={{ marginTop: 16 }}
              >
                Edit
              </Button>
              <Button
                icon="delete"
                mode="outlined"
                textColor="red"
                onPress={deleteAssignment}
                style={{ marginTop: 8 }}
              >
                Delete
              </Button>
            </View>
          </Modal>
        )}
      </>
      <ConfirmFinishAssignmentModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onOK={() => {
          setShowConfirmModal(false)
          onDismiss()
        }}
        assignmentId={mainData.key}
        point={mainData.points}
        userId={mainData.ownerUID}
      />
    </Portal>
  )
}

export function ConfirmFinishAssignmentModal({ visible, onCancel, onOK, assignmentId, point, userId }) {
  const onConfirm = () => {
    markAssignmentAsFinished(assignmentId, userId, point)
    onOK()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Icon icon="check" size={48} />
        <Dialog.Title>Mark as finished</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Do you want to mark this assignment as finished?
          </Text>
          <Text variant="bodyMedium">key: {assignmentId}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={onConfirm} mode="contained">
            Mark as finished
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function AddRewardModal({ visible, onCancel, onOK, userId }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [point, setPoint] = useState('')
  const [remaining, setRemaining] = useState('')
  const [file, setFile] = useState(null)

  const confirm = async () => {
    if (!title || !description || !point || isNaN(point) || !remaining || isNaN(remaining) || !file) {
      return Alert.alert('Error', 'Data is invalid.')
    }

    const imageUri = await uploadFile(file)
    console.log(imageUri)

    const data = {
      title,
      description,
      point: parseFloat(point),
      remaining: parseInt(remaining),
      image: imageUri,
      ownerUID: userId
    }

    addItemDocument(data)
    onOK()
  }

  const clearAllFields = () => {
    setTitle('')
    setDescription('')
    setPoint('')
    setRemaining('')
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Add item...</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <TextInput
              label="Title"
              mode="outlined"
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
            />
            <TextInput
              label="Description"
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              style={{ ...styles.textInput, height: null }}
              multiline
              numberOfLines={3}
            />
            <TextInput
              label="Price"
              mode="outlined"
              value={point}
              onChangeText={setPoint}
              style={styles.textInput}
            />
            <TextInput
              label="Remaining"
              mode="outlined"
              value={remaining}
              onChangeText={setRemaining}
              style={styles.textInput}
            />
            <Button
              style={{ marginVertical: 8 }}
              // icon={'file-outline'}
              icon={file ? 'file' : 'file-outline'}
              mode="contained"
              onPress={async () => {
                const res = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 1,
                })
                console.log(res)
                if (!res.canceled) setFile(res.assets[0])
              }}
            >
              {file ? 'Image added' : 'Select File'}
            </Button>
            {file ? (
              <Image
                source={{ uri: file.uri }}
                style={{ width: '100%', height: 150, borderRadius: 15 }}
              />
            ) : null}
            {file ? (
              <Button
                icon="delete"
                textColor="red"
                style={{ marginTop: 8 }}
                onPress={() => setFile(null)}
              >
                Remove
              </Button>
            ) : null}
          </ScrollView>
        </Dialog.ScrollArea>

        <View style={{ marginVertical: 8 }} />
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            style={{ marginVertical: 4 }}
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            style={{ marginVertical: 4 }}
            onPress={confirm}
          >
            Add
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export function EditRewardModal({ visible, onCancel, onOK, item }) {
  const [mainData, setMainData] = useState({})
  useEffect(() => setMainData(item), [item])
  useEffect(() => resetInput(), [mainData])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [point, setPoint] = useState('')
  const [remaining, setRemaining] = useState('')
  const [file, setFile] = useState(null)

  const confirm = async () => {
    if (!title || !description || !point || isNaN(point) || !remaining || isNaN(remaining)) {
      return Alert.alert('Error', 'Data is invalid.')
    }

    var data = {
      title,
      description,
      point: parseFloat(point),
      remaining: parseInt(remaining),
    }

    if (file) {
      data['image'] = await uploadFile(file)
    }

    updateItemDocument(item.key, data)
    onOK()
  }

  const resetInput = () => {
    setTitle(mainData.title)
    setDescription(mainData.description)
    setPoint(mainData.point + '')
    setRemaining(mainData.remaining + '')
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Edit item...</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <TextInput
              label="Title"
              mode="outlined"
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
            />
            <TextInput
              label="Description"
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              style={{ ...styles.textInput, height: null }}
              multiline
              numberOfLines={3}
            />
            <TextInput
              label="Price"
              mode="outlined"
              value={point}
              onChangeText={setPoint}
              style={styles.textInput}
            />
            <TextInput
              label="Remaining"
              mode="outlined"
              value={remaining}
              onChangeText={setRemaining}
              style={styles.textInput}
            />
            <Button
              style={{ marginVertical: 8 }}
              // icon={'file-outline'}
              icon={file ? 'file' : 'file-outline'}
              mode="contained"
              onPress={async () => {
                const res = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 1,
                })
                console.log(res)
                if (!res.canceled) setFile(res.assets[0])
              }}
            >
              {file ? 'Image added' : 'Select File'}
            </Button>
            <Image
              source={{ uri: file ? file.uri : mainData.image }}
              style={{ width: '100%', height: 150, borderRadius: 15 }}
            />
            {file ? (
              <Button
                icon="delete"
                textColor="red"
                style={{ marginTop: 8 }}
                onPress={() => setFile(null)}
              >
                Remove
              </Button>
            ) : null}
          </ScrollView>
        </Dialog.ScrollArea>

        <View style={{ marginVertical: 8 }} />
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            style={{ marginVertical: 4, backgroundColor: 'red' }}
            textColor="white"
            onPress={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
          <Button
            mode="contained-tonal"
            style={{ marginVertical: 4 }}
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            style={{ marginVertical: 4 }}
            onPress={confirm}
          >
            Update
          </Button>
        </Dialog.Actions>
      </Dialog>
      <ConfirmDeleteRewardModal
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOK={() => {
          setShowDeleteModal(false)
          onOK()
        }}
        itemId={mainData ? mainData.key : ''}
      />
    </Portal>
  )
}

export function ConfirmDeleteRewardModal({ visible, onCancel, onOK, itemId }) {
  const confirm = () => {
    deleteItemDocument(itemId)
    onOK()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Icon icon="delete" size={48} />
        <Dialog.Title>Delete this item</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Do you want to delete this item?
          </Text>
          <Text variant="bodyMedium">key: {itemId}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={confirm} mode="contained" textColor="white" style={{ backgroundColor: 'red' }}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

//? Utils

function areTimeDurationsOverlapping(
  startTimeA,
  endTimeA,
  startTimeB,
  endTimeB
) {
  // Parse time strings to create Date objects
  const parseTime = timeStr => {
    const [hours, minutes] = timeStr.split(':')
    return new Date(0, 0, 0, hours, minutes)
  }

  const startA = parseTime(startTimeA)
  const endA = parseTime(endTimeA)
  const startB = parseTime(startTimeB)
  const endB = parseTime(endTimeB)

  // Check for overlap
  return startA < endB && startB < endA
}

async function uploadFile(file) {
  const splittedPath = file.uri.split('/')
  const fileName = splittedPath[splittedPath.length - 1]
  const extension = fileName.split('.')[1]

  const filePath = file.uri
  const uploadPath = '/subjects/' + new Date().getTime() + '.' + extension

  return await uploadFileToStorage(filePath, uploadPath)
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#eee8f4',
    height: 40,
    marginVertical: 4,
  },
  modalContainer: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    width: 'calc(100% - 16px)',
    padding: 16,
  },
  top: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottom: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  picker: {
    width: '100%',
    backgroundColor: MD3Colors.primary40,
    borderRadius: 50,
    marginVertical: 4,
  },
})
