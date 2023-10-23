import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Divider } from 'react-native-paper';

import ListCard from '../../components/ListCard';
import QrImage from '../../assets/1f4f7.jpg';
import TestImage from '../../assets/icon.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminHome({ navigation }) {
  return (
    <PaperProvider>
      <Portal>
        <ScrollView style={styles.container}>
          <View>
            <ListCard
              title="Scan QR"
              icon={<MaterialCommunityIcons name="qrcode-scan" size={36} color={MD3Colors.primary50} />}
              onPress={() => navigation.navigate('AdminScan')}
            />
          </View>
          <Divider style={{ marginVertical: 8 }} />
          <Text variant="labelLarge">Your items</Text>
          <View style={{ marginVertical: 8 }}>
            {[...Array(1).keys()].map((n, i) => (
              <ListCard
                key={i}
                title={'PENPINEAPPLEAPPLEPEN'}
                description={'PENPINEALPPLEAPPLEPEN' + '\n' + 'Redeemed: 8/10'}
                image={TestImage}
              />
            ))}
          </View>
          {/* <View></View> */}
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
