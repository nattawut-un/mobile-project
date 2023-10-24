import { StyleSheet, View, Image } from 'react-native'
import {
  Portal,
  PaperProvider,
  Text,
  Appbar,
  MD3Colors,
  Chip,
  Button,
  Divider,
} from 'react-native-paper'
import React from 'react'
import { getRedeemDocument, markAsRedeem } from 'services/firestore'
import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { useState } from 'react'

// import ItemImage from 'assets/1f4f7.jpg'

const AdminRedeem = ({ navigation, route }) => {
  const data = route.params.item

  const [itemInfo, setItemInfo] = useState({})
  const redeemDocument = getRedeemDocument(data.key)
  useEffect(() => {
    const unsub = onSnapshot(redeemDocument, { next: snap => {
      setItemInfo(snap.data())
    } })
    return () => unsub()
  }, [])

  const confirm = () => {
    markAsRedeem(data.key)
    navigation.navigate('AdminSuccess')
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <Image style={styles.ItemImages} source={{ uri: itemInfo.image }} />
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text variant="headlineLarge">{itemInfo.title}</Text>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {/* <Text>99 $, Remaining: 2</Text> */}
        {/* <Text>{JSON.stringify(itemInfo)}</Text> */}
        <Text>Redeem ID: {data.key}</Text>
      </View>
      <Divider style={{ marginVertical: 8, width: '97%' }} />
      {/* <View style={styles.infomation}>
        <Text style={styles.detailuser}>User: Firstname Lastname</Text>
        <Text style={styles.detailuser}>Redeem ID: asdf123456</Text>
      </View>
      <View style={styles.infomation}>
        <Text style={styles.pointinfo}>Points to use: 99 $</Text>
      </View> */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <Text variant='headlineMedium' style={{ padding: 16 }}>Mark as redeem now?</Text>
      <View
        style={{ position: 'absolute', width: '100%', bottom: 0, padding: 16 }}
      >
        <Button
          mode="contained"
          style={{ marginVertical: 8 }}
          onPress={() => confirm()}
        >
          Redeem
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
      </View>
    </View>
  )
}

export default AdminRedeem

const styles = StyleSheet.create({
  ItemImages: {
    width: '100%',
    height: 250,
  },
  header: {
    paddingLeft: 10,
    fontSize: 25,
  },
  infomation: {
    paddingLeft: 10,
  },
  detailuser: {
    fontWeight: 'bold',
  },
  pointinfo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonredeem: {
    marginTop: 130,
  },
  buttoncancle: {
    marginTop: 5,
  },
})
