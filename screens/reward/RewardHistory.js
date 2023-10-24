import { StyleSheet, ScrollView, View } from 'react-native'
import {
  Portal,
  PaperProvider,
  Text,
  Appbar,
  MD3Colors,
  Chip,
} from 'react-native-paper'
import { useSelector } from 'react-redux'
import { getUserRedeemsCollection } from 'services/firestore'
import { useEffect } from 'react'

import ListCard from 'components/ListCard'
import TestImage from 'assets/icon.png'
import { Timestamp, onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import dayjs from 'dayjs'

export default RewardHistory = ({ navigation }) => {
  const user = useSelector(state => state.user.user)
  const historyCollection = getUserRedeemsCollection(user ? user.uid : '')

  const [history, setHistory] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(historyCollection, { next: snap => {
      const data = []
      snap.forEach(res => {
        const fields = res.data()
        data.push({ key: res.id, ...fields })
      })
      setHistory(data)
    }})
  return () => unsub()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View>
        {history ? (
          history.map((item, index) => (
            <ListCard
              key={index}
              title={item.title}
              description={dayjs(
                new Timestamp(item.redeemTime.seconds, 0).toDate()
              ).format('HH:mm - MMMM DD, YYYY')}
              image={{ uri: item.image }}
            >
              {!item.finished ? (
                <Chip
                  icon='basket'
                  style={{ ...styles.chip, backgroundColor: MD3Colors.primary90 }}
                  onPress={() => navigation.navigate('RewardQRCode', { item })}
                  >
                  Redeem
                </Chip>
              ) : (
                <Chip
                  disabled
                  icon='check'
                  style={{ ...styles.chip }}
                >
                  Redeemed
                </Chip>
              )}
            </ListCard>
          ))
        ) : (
          <Text variant="labelMedium">Nothing</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  chip: {
    marginTop: 10,
    backgroundColor: 'white',
  },
})
