import { useEffect, useState, useRef } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { Text, Dialog, Button, Portal, PaperProvider, TextInput, MD3Colors, HelperText, Modal } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import DropDown from 'react-native-paper-dropdown'
import { Picker } from '@react-native-picker/picker'

import { uploadFileToStorage } from "services/fb_storage";
import { deleteAssignmentDocument, deleteSubjectDocument, getSubjectsCollectionData, markAssignmentAsFinished, saveAssignmentDocument } from "services/firestore";

/**
 * @param {object} props
 * @param {boolean} props.visible
 * @param {() => void} props.onCancel
 * @param {() => void} props.onOK
 */
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

/**
 * @param {object} props
 * @param {boolean} props.visible
 * @param {() => void} props.onCancel
 * @param {() => void} props.onOK
 */
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
      // dueDate: { seconds: Math.floor(new Date(date).getTime() / 1000) },
      dueDate: new Timestamp(Math.floor(new Date(date).getTime() / 1000), 0),
      subjectId: selectedSubject,
    }
    onOK(document)

    clearInput()
  }

  const clearInput = () => {
    setTitle('')
    setDescription('')
    setDate(new Date())
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

export function AddSubjectModal(props) {
  const { visible, onCancel, onOK } = props

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
    <>
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
    </>
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

export function AddTimetableModal(props) {
  const { visible, onCancel, onOK } = props

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
      dueDate: { seconds: Math.floor(new Date(date).getTime() / 1000) },
    }
    onOK(document)

    clearInput()
  }

  const clearInput = () => {
    setTitle('')
    setDescription('')
    setDate(new Date())
  }

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Title>Add Timetable</Dialog.Title>
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

/**
 * @param {object} props
 * @param {boolean} props.visible
 * @param {() => void} props.onDismiss
 * @param {object} props.data
 */
export function AssigmentDetailModal({ visible, onDismiss, data }) {
  if (!data) return <View />

  const [mainData, setMainData] = useState({})
  useEffect(() => setMainData(data), [data])
  useEffect(() => console.log(data), [data])

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
      title, description, dueDate: new Timestamp(seconds, 0),
      ownerUID: data.ownerUID, subjectID: ''
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

  return (
    <Portal>
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
              {mainData.title}
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
          </View>
          <View style={{ ...styles.modalContainer, ...styles.bottom }}>
            <Text variant="labelSmall">Description</Text>
            <Text variant="bodyMedium">{mainData.description}</Text>
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
    </Portal>
  )
}

export function ConfirmFinishAssignmentModal({ visible, onCancel, onOK, assignmentId }) {
  const onConfirm = () => {
    markAssignmentAsFinished(assignmentId)
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
