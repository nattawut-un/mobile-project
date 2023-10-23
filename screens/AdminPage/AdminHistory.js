import { StyleSheet, ScrollView, View } from 'react-native'
import { Portal, PaperProvider, Text, Appbar, MD3Colors, Chip } from 'react-native-paper';
import React from 'react'

import ListCard from 'components/ListCard'
import TestImage from 'assets/icon.png';

const AdminHistory = () => {
  return (
    <ScrollView style={ styles.container }>
      <View>
        {[...Array(2).keys()].map((n, i) => (
          <ListCard
            key={i}
            title={'Apple pencil'}
            description={
              "12:00:00, September 17,2023"
            }
            image={TestImage}
          >
            <Chip style={ styles.chip } onPress={() => console.log('Pressed')}>
              Redeem
            </Chip>
          </ListCard>
        ))}
      </View>
      {/* <View></View> */}
    </ScrollView>
  )
}

export default AdminHistory

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  chip: {
    marginTop: 10,
    backgroundColor: "white",
    width: 85
  },
})