import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  AnimatedFAB,
  Portal,
  Button,
  Card,
  Text,
  Modal,
  TextInput,
  MD3Colors,
  Searchbar,
} from 'react-native-paper'

import TestImage from '../../assets/icon.png'
import { AddRewardModal, EditRewardModal } from 'components/modal'
import { getItemsCollection, getUserRedeemsCollection } from 'services/firestore'
import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

const dummyData = [
  {
    id: 0,
    title: 'name',
    description: 'Make student fun all night',
    point: 100,
    remaining: 20,
  },
  {
    id: 1,
    title: 'itemaaa',
    description: 'Make student fun all night',
    point: 100,
    remaining: 20,
  },
]

export default function AdminItems({ navigation }) {
  // FAB
  const [isExtended, setIsExtended] = useState(true)
  const [offset, setOffset] = useState(0)
  const onScroll = ({ nativeEvent }) => {
    var currentOffset = nativeEvent.contentOffset.y
    setIsExtended(!(currentOffset > offset))
    setOffset(currentOffset)
  }

  const [showEditItemModal, setShowEditItemModal] = useState(false)
  const [showAddItemModal, setShowAddItemModal] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const onChangeSearch = query => setSearchQuery(query)

  const user = useSelector(state => state.user.user)
  const redeemsCollection = getItemsCollection(user ? user.uid : '')
  const [itemList, setItemList] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(redeemsCollection, { next: snap => {
      const data = []
      snap.forEach(doc => {
        const fields = doc.data()
        data.push({ key: doc.id, ...fields })
      })
      setItemList(data)
    } })
    return () => unsub()
  }, [])

  const [sortedList, setSortedList] = useState([])
  useEffect(() => {
    setSortedList(itemList.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery])

  const [selectedItem, setSelectedItem] = useState({})

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            // backgroundColor: MD3Colors.primary50,
          }}
        >
          <Searchbar
            placeholder=""
            onChangeText={onChangeSearch}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={searchQuery}
          />
        </View>
        <FlatList
          data={sortedList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item)
                setShowEditItemModal(true)
              }}
            >
              <Card
                key={item.key}
                style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                  backgroundColor: MD3Colors.primary95,
                  shadowColor: '#0000',
                }}
              >
                <Card.Content>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                  />
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 5 }}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text variant="labelLarge" style={{ marginTop: 5 }}>
                      Remaining: {item.remaining}
                    </Text>
                    <Text variant="labelLarge" style={{ marginTop: 5 }}>
                      Cost: {item.point}
                    </Text>
                  </View>
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
        onPress={() => setShowAddItemModal(true)}
        style={[styles.fabStyle, { animateFrom: 16 }]}
      />
      <AddRewardModal
        visible={showAddItemModal}
        onCancel={() => setShowAddItemModal(false)}
        onOK={() => setShowAddItemModal(false)}
        userId={user ? user.uid : ''}
      />
      <EditRewardModal
        visible={showEditItemModal}
        onCancel={() => setShowEditItemModal(false)}
        onOK={() => setShowEditItemModal(false)}
        item={selectedItem}
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
  },
})
