import { StyleSheet, View, Image, Alert } from 'react-native'
import { Text, Button, Divider } from 'react-native-paper'
import { getRedeemDocument, markAsRedeem } from 'services/firestore'
import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const AdminRedeem = ({ navigation, route }) => {
  const data = route.params.item
  const user = useSelector(state => state.user.user)

  const [itemInfo, setItemInfo] = useState({})
  const redeemDocument = getRedeemDocument(data.key)
  useEffect(() => {
    const unsub = onSnapshot(redeemDocument, { next: snap => {
      const data = snap.data()
      if (data.finished) {
        Alert.alert('Error', 'The redeem has already been claimed.')
        navigation.navigate('AdminScanQR')
      }
      if (data.ownerId != user.uid) {
        Alert.alert('Error', 'The redeem code is invalid.')
        navigation.navigate('AdminScanQR')
      }
      setItemInfo(data)
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
        <Text>Redeem ID: {data.key}</Text>
      </View>
      <Divider style={{ marginVertical: 8, width: '97%' }} />
      <Text variant='headlineSmall' style={{ padding: 16 }}>Mark as redeem now?</Text>
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
