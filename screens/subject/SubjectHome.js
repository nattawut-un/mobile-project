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
import { getDoc, onSnapshot } from 'firebase/firestore'
import { AddSubjectModal } from 'components/modal'
import { addSubjectDocument } from 'services/firestore'

export default function SubjectHome({ navigation }) {
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

  // Firestore
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

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false)
  const addSubject = subject => {
    if (!subject) return

    subject['ownerUID'] = user.uid
    console.log('Adding subject: ' + JSON.stringify(subject))
    addSubjectDocument(subject)

    setShowAddSubjectModal(false)
  }

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
              backgroundColor: MD3Colors.primary90,
            }}
          />
        </View>
        <FlatList
          style={{ marginBottom: 70 }}
          data={subjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
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
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Chip style={{ marginRight: 8 }}>Next: Mon, 9:00</Chip>
                    <Chip style={{ marginRight: 8 }}>__ Homeworks</Chip>
                  </View> */}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <AnimatedFAB
        icon="plus"
        label="Add"
        extended={isExtended}
        onPress={() => setShowAddSubjectModal(true)}
        style={[styles.fabStyle, { animateFrom: 16 }]}
      />
      <AddSubjectModal
        visible={showAddSubjectModal}
        onCancel={() => setShowAddSubjectModal(false)}
        onOK={addSubject}
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
