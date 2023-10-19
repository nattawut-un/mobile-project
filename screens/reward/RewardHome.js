import { View, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useLayoutEffect } from 'react'
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
  MD3Colors
} from 'react-native-paper'

import RewardHistory from "./RewardHistory"

import { Ionicons } from '@expo/vector-icons'

import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'

// import storage from 'data/storage'
import TestImage from 'assets/icon.png'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors' มาจากไหนวะ

const Stack = createNativeStackNavigator()


const dummyData = [
  {
    id: 0,
    title: 'Apple',
    description: 'Make student fun all night',
    createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  },
  {
    id: 1,
    title: 'test',
    description:
      'Eiusmod sit mollit elit occaecat ipsum commodo elit deserunt aliqua cupidatat proident minim incididunt adipisicing.',
    createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  },
]

function SubjectHome({ navigation }) {

  const toHistory = () => navigation.navigate("RewardHistory")






  // Subject List
  const [subject, setSubject] = useState(dummyData)
  const [nextId, setNextId] = useState(subject.length)

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
  // const [visibleModalAddSubject, setVisibleModalAddSubject] = useState(false)
  // const showModal = () => setVisibleModalAddSubject(true)
  // const hideModal = () => {
  //   setVisibleModalAddSubject(false)
  //   clearAllFields()
  // }
  // const [newSubjectTitle, setNewSubjectTitle] = useState('')
  // const [newSubjectDescription, setNewSubjectDescription] = useState('')
  // const clearAllFields = () => {
  //   setNewSubjectTitle('')
  //   setNewSubjectDescription('')
  // }

  // MyModal
  const [modalVisible, setModalVisible] =useState(false);
  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)
  


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

  // const addSubject = () => {
  //   const newSubject = {
  //     id: nextId,
  //     title: newSubjectTitle,
  //     description: newSubjectDescription,
  //     createDate: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  //   }
  //   setSubject([...subject, newSubject])
  //   setNextId(nextId + 1)
  //   hideModal()
  //   // saveSubjectData()
  //   console.log('Added new subject: ' + JSON.stringify(newSubject))
  // }
  // const deleteSubject = id => {
  //   const newSubjectList = cloneDeep(subject)
  //   for (let i = 0; i < newSubjectList.length; i++) {
  //     if (newSubjectList[i].id === id) {
  //       newSubjectList.splice(i, 1)
  //       console.log('Deleted subject. id: ' + id)
  //     }
  //   }
  //   setSubject(newSubjectList)
  //   onToggleSnackBar()
  // }
  // const deleteAll = () => {
  //   setSubject([])
  //   setNextId(0)
  //   console.log('Deleted all subjects.')
  // }

  function SubjectList(props) {
    let res = []
    let data = props.items ?? []
    data.forEach(item =>
      res.push(
        <Card
          key={item.id}
          style={{
            marginHorizontal: 16,
            marginVertical: 8,
            borderColor: MD3Colors.primary80,
            borderWidth: 2,
          }}
        >
          {/* <Card.Title title={'id: ' + item.id} subtitle={item.createDate} /> */}
          <Card.Content>
            <Image source={TestImage} style={styles.cardImage} />
            <Text variant="titleLarge">{item.title}</Text>
            <Text variant="bodyMedium" style={{ marginTop: 5 }}>{item.description}</Text>
            <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
              <Text varient="bodyMedium" style={{ marginTop: 5 }}>Remaining : ?</Text>
              <Text variant='bodyMedium' style={{ marginTop: 5 }}>Cost : ?</Text>
            </View>
            
          </Card.Content>
          <Card.Actions>
            {/* <Button onPress={() => deleteSubject(item.id)}>Delete</Button> */}
            <Button
              onPress={() => {
                setModalVisible(true)
              }}
            >
              Redeem
            </Button>
          </Card.Actions>
        </Card>
      )
    )
    return res
  }

  // function loadSubjectData() {
  //   storage.load({ key: 'subjects' }).then(res => {
  //     console.log('load subjects:', res)
  //     setSubject(res)
  //   })
  // }
  // async function saveSubjectData() {
  //   return await storage.save({ key: 'subjects', data: subject })
  // }
  // function readData() {
  //   storage.load({ key: 'subjects' }).then(res => {
  //     console.log('read subjects:', res)
  //   })
  // }

  // useEffect(() => {
  //   storage.load({ key: 'subjects' })
  //   .then(ret => {
  //     setSubject(ret)
  //     console.log("load subjects:", ret)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  // useLayoutEffect(() => {
  //   loadSubjectData()
  // }, [])

  // useEffect(() => {
  //   saveSubjectData()
  //   console.log('save subjects:', subject)
  // }, [subject])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Appbar.Header
          mode="small"
          style={{
            // position: 'absolute',
            // zIndex: 100,
            // width: '100%',
            backgroundColor: MD3Colors.primary50,
          }}
        >
          <Appbar.Action
            icon="tag-multiple-outline"
            color={MD3Colors.primary90}
            onPress={_handleSearch}
          />
          
          <Appbar.Content title="Rewards" color="white" />
          {/* <Appbar.Action
            icon="magnify"
            color={MD3Colors.primary90}
            onPress={_handleSearch}
          /> */}


          {/* point ชิดขวาไม่เปน */}
          <Appbar.Content title="? : $" color="white"/> 
          <Appbar.Action
            icon="bookmark-multiple"
            color={MD3Colors.primary90}
            onPress={() => toHistory()}
          />
        </Appbar.Header>
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
        <Menu
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
        </Menu>
        {/* </PaperProvider> */}
        <ScrollView onScroll={onScroll}>
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
          <SubjectList
            items={
              searchQuery
                ? subject.filter(i => i.title.includes(searchQuery))
                : subject
            }
          />
          <View style={{ marginVertical: 108 }} />
        </ScrollView>
        <Portal>
          <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: 'bold', marginVertical: 4, textAlign:'center' }}
            >
              Are you sure?
            </Text>
            <Text
            variant='titleMedium'
            style={{ marginVertical: 4 }}>
                Item name : brrrrrr 
            </Text>
            <Text
              variant='titleMedium'
              style={{ marginVertical: 4 }}>
                  Cost : ? $ 
              </Text>
            <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
              <Text
              variant='titleMedium'
              style={{ marginVertical: 4 }}>
                  Your point : ? $ 
              </Text>

              <Text
              variant='titleMedium'
              style={{ marginVertical: 4 }}>
                  Point left : ? $ 
              </Text>
            </View>

            

            <Button
              mode="contained"
              style={{ marginVertical: 4 }}
              onPress={hideModal}
            >
              Redeem
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
        {/* <Portal>
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
        </Portal> */}
      </SafeAreaView>


      {/* remove add button */}
      {/* <AnimatedFAB
        icon="plus"
        label="Add"
        extended={isExtended}
        onPress={showModal}
        style={[styles.fabStyle, { animateFrom: 16 }]}
      /> */}


      <Snackbar
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
      </Snackbar>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22,}}>
          <View style={styles.modalView}>
            <Text>
              Test
            </Text>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              close
            </Button>

          </View>
        </View>
      </Modal> */}
    </>
  )
}

export default function Reward() {
  return (
    <Stack.Navigator initialRouteName='main' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='RewardHome' component={SubjectHome} />
      <Stack.Screen name="RewardHistory" component={RewardHistory} />

    </Stack.Navigator>
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
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})
