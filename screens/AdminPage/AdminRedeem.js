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

import ItemImage from 'assets/1f4f7.jpg'

const AdminRedeem = ({ navigation, route }) => {
  const data = route.params.item

  const confirm = () => {
    // TODO somethinfg
    navigation.navigate('AdminSuccess')
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <Image style={styles.ItemImages} source={ItemImage} />
      <View>
        <Text style={styles.header}>PENPINEAPPLEAPPLEPEN</Text>
      </View>
      <View style={styles.infomation}>
        <Text>99 $, Remaining: 2</Text>
        <Text>Make you fun everyday</Text>
        <Divider style={{ marginVertical: 8, width: '97%' }} />
      </View>
      <View style={styles.infomation}>
        <Text style={styles.detailuser}>User: Firstname Lastname</Text>
        <Text style={styles.detailuser}>Redeem ID: asdf123456</Text>
      </View>
      <View style={styles.infomation}>
        <Text style={styles.pointinfo}>Points to use: 99 $</Text>
      </View>
      <Text>{JSON.stringify(data)}</Text>
      <View style={{ position: 'absolute', width: '100%', bottom: 0, padding: 16 }}>
        <Button
          mode="contained"
          style={{ marginVertical: 8 }}
          onPress={() => confirm()}
        >
          Redeem
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
        >
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
