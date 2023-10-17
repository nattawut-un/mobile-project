import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import image from "../../assets/TestQrCode.png"

export default function QrCode() {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.imagesize} source={image} />
      </View>
      <View>
        <Text style={styles.item_text}>PENPINEAPPLEAPPLEPE</Text>
        <Text style={styles.redeemid_text}>Redeem ID: zw39erm6tz</Text>
      </View>
    </View>
  );
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
