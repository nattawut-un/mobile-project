import { View, ScrollView, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import {
  AnimatedFAB,
  Dialog,
  Portal, Button,
  Card,
  Text,
  Snackbar,
  Modal,
  TextInput,
  Appbar,
  Menu,
  Divider,
  PaperProvider,
  Searchbar,
  MD3Colors,
  Chip
} from 'react-native-paper'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'

// import storage from 'data/storage'
import TestImage from 'assets/placeholder.png'
import { getSubjectsCollection } from 'services/firestore'
import { onSnapshot } from 'firebase/firestore'

const dummyData = [
  {
    id: 0,
    title: 'Subject Page',
    description: 'Press [+] button to add new subject.',
    createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  },
  {
    id: 1,
    title: 'Test',
    description:
      'Eiusmod sit mollit elit occaecat ipsum commodo elit deserunt aliqua cupidatat proident minim incididunt adipisicing.',
    createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  },
]

export default function SubjectHome({ navigation }) {
  
  // Subject List
  // const [subject, setSubject] = useState([])
  // const [nextId, setNextId] = useState(subject.length)

  // FAB
  const [isExtended, setIsExtended] = useState(true)
  const [offset, setOffset] = useState(0)
  const onScroll = ({ nativeEvent }) => {
    var currentOffset = nativeEvent.contentOffset.y
    setIsExtended(!(currentOffset > offset))
    setOffset(currentOffset)
  }

  // Snackbar
  const [visibleSnackbar, setVisibleSnackbar] = useState(false)
  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar)
  const onDismissSnackBar = () => setVisibleSnackbar(false)

  // Modal: Add subject
  const [visibleModalAddSubject, setVisibleModalAddSubject] = useState(false)
  const showModal = () => setVisibleModalAddSubject(true)
  const hideModal = () => {
    setVisibleModalAddSubject(false)
    clearAllFields()
  }
  const [newSubjectTitle, setNewSubjectTitle] = useState('')
  const [newSubjectDescription, setNewSubjectDescription] = useState('')
  const clearAllFields = () => {
    setNewSubjectTitle('')
    setNewSubjectDescription('')
  }

  // Header
  const [visibleHeaderMenu, setVisibleHeaderMenu] = useState(false)
  const _goBack = () => console.log('Went back')
  const _handleSearch = () => console.log('Searching')
  const _handleMore = () => {
    showMenu()
    console.log('Show menu')
  }
  const showMenu = () => setVisibleHeaderMenu(true)
  const hideMenu = () => setVisibleHeaderMenu(false)

  // Searchbar
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const onChangeSearch = query => setSearchQuery(query)

  const addSubject = () => {
    const newSubject = {
      id: nextId,
      title: newSubjectTitle,
      description: newSubjectDescription,
      createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    }
    setSubject([...subject, newSubject])
    setNextId(nextId + 1)
    hideModal()
    // saveSubjectData()
    console.log('Added new subject: ' + JSON.stringify(newSubject))
  }
  const deleteSubject = id => {
    const newSubjectList = cloneDeep(subject)
    for (let i = 0; i < newSubjectList.length; i++) {
      if (newSubjectList[i].id === id) {
        newSubjectList.splice(i, 1)
        console.log('Deleted subject. id: ' + id)
      }
    }
    setSubject(newSubjectList)
    onToggleSnackBar()
  }
  const deleteAll = () => {
    setSubject([])
    setNextId(0)
    console.log('Deleted all subjects.')
  }

  // Firestore
  const [subjects, setSubjects] = useState([])
  const getSubject = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const { title, description, ownerId, teacher, timetable, image } = res.data()
      data.push({ key: res.id, title, description, ownerId, teacher, timetable, image })
    })
    setSubjects(data)
    console.log('subjects:', data)
  }

  const user = useSelector(state => state.user.user)
  const subjectsQuery = getSubjectsCollection(user ? user.uid : '')
  useEffect(() => {
    onSnapshot(subjectsQuery, { next: getSubject })
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: MD3Colors.primary50,
          }}
        >
          <Searchbar
            placeholder=""
            onChangeText={onChangeSearch}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={searchQuery}
            style={{
              // width: searchFocus || searchQuery ? 300 : 100,
              // width: '100%',
              backgroundColor: MD3Colors.primary90,
            }}
          />
        </View>
        {/* <PaperProvider> */}
        {/* <Menu
          visible={visibleHeaderMenu}
          onDismiss={hideMenu}
          anchor={{ x: 600, y: 60 }}
        >
          <Menu.Item
            onPress={() => {
              hideMenu()
              showModal()
            }}
            title="Add item"
          />
          <Menu.Item
            onPress={() => {
              hideMenu()
              deleteAll()
            }}
            title="Delete all"
          />
        </Menu> */}
        {/* </PaperProvider> */}
        {/* <ScrollView onScroll={onScroll}> */}
        {/* <View style={{ marginVertical: 55 }} /> */}
        {/* <Appbar.Header mode="large">
            <Appbar.Content title="Subjects" />
          </Appbar.Header> */}
        {/* <Button
            mode="contained"
            icon="bookmark"
            buttonColor="purple"
            onPress={readData}
            style={{ margin: 16 }}
          >
            Read Data
          </Button> */}
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                // navigation.navigate('SubjectInfo', {
                //   screen: 'SubjectInfoTab',
                //   params: { subject: item },
                // })
                navigation.navigate('SubjectInfo', { subject: item })
              }
            >
              <Card
                key={item.key}
                style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                  backgroundColor: MD3Colors.primary95,
                  shadowColor: '#0000'
                }}
              >
                <Card.Content>
                  {item.image ? (
                    <Image src={item.image} style={styles.cardImage} />
                  ) : (
                    <Image
                      source={TestImage}
                      style={{ ...styles.cardImage, height: 70 }}
                    />
                  )}
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text variant="bodyMedium">{item.description}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Chip style={{ marginRight: 8 }}>Next: Mon, 9:00</Chip>
                    <Chip style={{ marginRight: 8 }}>__ Homeworks</Chip>
                  </View>
                </Card.Content>
                <Card.Actions>
                  {/* <Button onPress={() => deleteSubject(item.id)}>Delete</Button> */}
                  {/* <Button
                        mode="contained"
                        onPress={() =>
                          // navigation.navigate('SubjectInfo', {
                          //   screen: 'SubjectInfoTab',
                          //   params: { subject: item },
                          // })
                          navigation.navigate('SubjectInfo', { subject: item })
                        }
                      >
                        Show
                      </Button> */}
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          )}
        />
        <View style={{ marginVertical: 128 }} />
        {/* </ScrollView> */}
        <Portal>
          <Modal
            visible={visibleModalAddSubject}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: 'bold', marginVertical: 4 }}
            >
              Add Subject...
            </Text>
            <TextInput
              label="Title"
              mode="outlined"
              value={newSubjectTitle}
              onChangeText={setNewSubjectTitle}
              style={{ marginVertical: 4 }}
            />
            <TextInput
              label="Description"
              mode="outlined"
              value={newSubjectDescription}
              onChangeText={setNewSubjectDescription}
              style={{ marginVertical: 4 }}
            />
            <View style={{ marginVertical: 8 }} />
            <Button
              mode="contained"
              style={{ marginVertical: 4 }}
              onPress={addSubject}
            >
              Add
            </Button>
            <Button
              mode="outlined"
              style={{ marginVertical: 4 }}
              onPress={hideModal}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>
      </SafeAreaView>
      <AnimatedFAB
        icon="plus"
        label="Add"
        extended={isExtended}
        onPress={showModal}
        style={[styles.fabStyle, { animateFrom: 16 }]}
      />
      {/* <Snackbar
        visible={visibleSnackbar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            console.log('Undo')
          },
        }}
      >
        Subject is deleted.
      </Snackbar> */}
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 12,
  }
})
