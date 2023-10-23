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


import TestImage from 'assets/icon.png'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getRewardsCollection, getUserInfo } from 'services/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'

export default function RewardHome({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const onChangeSearch = query => setSearchQuery(query)

  const [rewardList, setRewardList] = useState([])
  const rewardsCollection = getRewardsCollection()
  const getReward = querySnapshot => {
    const data = []
    querySnapshot.forEach(res => {
      const fields = res.data()
      data.push({ key: res.id, ...fields })
    })
    setRewardList(data)
  }
  useEffect(() => {
    const unsub = onSnapshot(rewardsCollection, { next: getReward })
    return () => unsub()
  }, [])

  const user = useSelector(state => state.user.user)
  const [userInfo, setUserInfo] = useState({})
  const userRef = getUserInfo(user ? user.uid : '0')
  useEffect(() => {
    const unsub = onSnapshot(userRef, {
      next: snap => {
        setUserInfo(snap.data())
      },
    })
    return () => unsub()
  }, [])

  const [selectedReward, setSelectedReward] = useState({})

  function RewardList(props) {
    let res = []
    let data = props.items ?? []
    data.forEach(item =>
      res.push(
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
            <Image src={item.image} style={styles.cardImage} />
            <Text variant="titleLarge">{item.title}</Text>
            <Text variant="bodyMedium" style={{ marginTop: 5 }}>
              {item.description}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text variant="labelLarge" style={{ marginTop: 5 }}>
                Remaining: {item.remaining}
              </Text>
              <Text variant="labelLarge" style={{ marginTop: 5 }}>
                Cost: {item.point}
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode='contained'
              onPress={() => {
                setSelectedReward(item)
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
        <ScrollView>
          <RewardList
            items={
              searchQuery
                ? rewardList.filter(i => i.title.includes(searchQuery))
                : rewardList
            }
          />
          <View style={{ marginVertical: 108 }} />
        </ScrollView>
        <RedeemModal
          visible={modalVisible}
          onCancel={hideModal}
          onOK={hideModal}
          reward={selectedReward}
          user={userInfo}
        />
      </SafeAreaView>
    </>
  )
}

function RedeemModal({ visible, onCancel, onOK, reward, user }) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modal}
      >
        <Text
          variant="titleLarge"
          style={{
            fontWeight: 'bold',
            marginVertical: 4,
            textAlign: 'center',
          }}
        >
          Are you sure?
        </Text>
        <Text variant="titleMedium" style={{ marginVertical: 4 }}>
          Item name: {reward.title}
        </Text>
        <Text variant="titleMedium" style={{ marginVertical: 4 }}>
          Cost: {reward.point}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="titleMedium" style={{ marginVertical: 4 }}>
            Your point: {user ? user.point : '?'}
          </Text>
          <Text variant="titleMedium" style={{ marginVertical: 4 }}>
            Point left: {user && reward ? user.point - reward.point : '?'}
          </Text>
        </View>
        <Button
          mode="contained"
          style={{ marginVertical: 4, marginTop: 16 }}
          onPress={onOK}
        >
          Redeem
        </Button>
        <Button mode="outlined" style={{ marginVertical: 4 }} onPress={onOK}>
          Cancel
        </Button>
      </Modal>
    </Portal>
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
