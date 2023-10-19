import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Dialog, Button, Portal, PaperProvider, TextInput, MD3Colors, HelperText } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from "dayjs";

/**
 * @param {object} props
 * @param {boolean} visible
 * @param {() => void} props.onCancel
 * @param {() => void} props.onOK
 */
export function LogoutModal(props) {
  const { visible, onCancel, onOK } = props

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
 * @param {boolean} visible
 * @param {() => void} props.onCancel
 * @param {() => void} props.onOK
 */
export function AddAssignmentModal(props) {
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
          <Dialog.Title>Add assignment</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              mode="outlined"
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            <HelperText type='error' visible={isTextBlank()}>
              Title cannot be blank
            </HelperText>
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

export function AddSubjectModal(props) {
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
          <Dialog.Title>Add Subject</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              mode="outlined"
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
            />
            <HelperText type='error' visible={isTextBlank()}>
              Title cannot be blank
            </HelperText>
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

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#eee8f4',
    height: 40,
    marginVertical: 4
  },
})
