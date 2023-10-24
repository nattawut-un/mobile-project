import { StyleSheet, ScrollView, View } from 'react-native'
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Chip, Checkbox } from 'react-native-paper';
import React from 'react'

import ListCard from 'components/ListCard'
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getAdminRedeemsCollection } from 'services/firestore';
import { useState, useEffect } from 'react'
import { Timestamp, onSnapshot } from 'firebase/firestore';
import dayjs from 'dayjs';

const AdminHistory = () => {
  const [history, setHistory] = useState([])
  const user = useSelector(state => state.user.user)
  const redeemsCollection = getAdminRedeemsCollection(user ? user.uid : '')
  useEffect(() => {
    const unsub = onSnapshot(redeemsCollection, { next: snap => {
      const data = []
      snap.forEach(doc => {
        data.push({ key: doc.id, ...doc.data() })
      })
      console.log(data)
      setHistory(data)
    } })
    return () => unsub()
  }, [])

  return (
    <ScrollView style={styles.container}>
      {history.map(item => (
        <ListCard
          key={item.key}
          title={item.title}
          description={`Redeem ID: ${item.key}\nDate: ${dayjs(new Timestamp(item.redeemTime.seconds, 0).toDate()).format('HH:mm - MMMM DD, YYYY')}`}
          image={{ uri: item.image }}
        >
          {item.finished ? <Chip mode='flat' icon='check' style={{ marginTop: 6, width: 100 }}>Finished</Chip> : null}
        </ListCard>
      ))}
    </ScrollView>
  )
}

export default AdminHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  chip: {
    marginTop: 10,
    backgroundColor: "white",
    width: 85
  },
})