import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getItemsCollection } from 'services/firestore';
import { onSnapshot } from 'firebase/firestore';

import ListCard from '../../components/ListCard';
import QrImage from '../../assets/1f4f7.jpg';
import TestImage from '../../assets/icon.png';

export default function AdminHome({ navigation }) {
  const user = useSelector(state => state.user.user)
  const redeemsCollection = getItemsCollection(user ? user.uid : '')
  const [itemList, setItemList] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(redeemsCollection, {
      next: snap => {
        const data = []
        snap.forEach(doc => {
          const fields = doc.data()
          data.push({ key: doc.id, ...fields })
        })
        setItemList(data)
      },
    })
    return () => unsub()
  }, [])

  return (
    <PaperProvider>
      <Portal>
        <ScrollView style={styles.container}>
          <View>
            <ListCard
              title="Scan QR"
              icon={
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={36}
                  color={MD3Colors.primary50}
                />
              }
              onPress={() => navigation.navigate('AdminScan')}
            />
          </View>
          <Divider style={{ marginVertical: 8 }} />
          <Text variant="labelLarge">Items ready for redeem</Text>
          <View style={{ marginVertical: 8 }}>
            {itemList.map((item, index) => {
              if (item.remaining > 0) return (
                <ListCard
                  key={index}
                  title={item.title}
                  description={`${item.point}p - ${item.remaining} redeem${
                    item.remaining > 1 ? 's' : ''
                  } left`}
                  image={{ uri: item.image }}
                />
              )
            })}
          </View>
        </ScrollView>
      </Portal>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  timeElement: {
    paddingTop: 32,
    paddingBottom: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    fontWeight: '500',
  },
  text: {
    fontFamily: 'font-thai',
    fontSize: 99
  },
})
