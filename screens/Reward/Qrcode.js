import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import image from "../../assets/TestQrCode.png"
import QRCode from 'react-qr-code';
import { Base64 } from 'js-base64';
// import { Base64, toBase64 } from 'js-base64';

export default function QrCode({ navigation, route }) {
  const data = route.params.item
  const value = JSON.stringify({
    key: data.key, rewardId: data.rewardId, userId: data.userId
  })
  const encoded = Base64.encode(value)

  return (
    <View style={styles.container}>
      <View>
        {/* <Image style={styles.imagesize} source={image} /> */}
        <QRCode value={encoded} />
      </View>
      <View style={{ marginTop: 32 }}>
        <Text style={styles.item_text}>{data.title}</Text>
        <Text style={styles.redeemid_text}>Redeem ID: {data.key}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_text: {
    fontSize: 20,
    textAlign: "center",
  },
  redeemid_text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  imagesize: {
    height: 300,
    width: 300,
    objectFit: "contain"
  }
});
