import { StyleSheet, ScrollView, View, FlatList } from 'react-native'
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Chip, Checkbox } from 'react-native-paper';
import React from 'react'

import ListCard from 'components/ListCard'
import { useSelector } from 'react-redux';
import { getAdminRedeemsCollection } from 'services/firestore';
import { useState, useEffect } from 'react'
import { Timestamp, onSnapshot } from 'firebase/firestore';
import dayjs from 'dayjs';
import _ from 'lodash';

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
      const sortedData = _.reverse(_.sortBy(data, item => item.redeemTime.seconds))
      setHistory(sortedData)
    } })
    return () => unsub()
  }, [])

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 16, marginVertical: 4 }}>
            <ListCard
              key={item.key}
              title={item.title}
              description={`Redeem ID: ${item.key}\nDate: ${dayjs(
                new Timestamp(item.redeemTime.seconds, 0).toDate()
              ).format('HH:mm - MMMM DD, YYYY')}`}
              image={{ uri: item.image }}
            >
              {item.finished ? (
                <Chip
                  mode="flat"
                  icon="check"
                  style={{ marginTop: 6, width: 100 }}
                >
                  Finished
                </Chip>
              ) : null}
            </ListCard>
          </View>
        )}
      />
    </View>
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