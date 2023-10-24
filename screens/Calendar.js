import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Appbar, Card, MD3Colors } from 'react-native-paper';
import dayjs from "dayjs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarPage from "./calendar/CalendarPage";
import CalendarDetails from "./calendar/CalendarDetails";

const timeToString = time => {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}

const Stack = createNativeStackNavigator()

export default function Calendar() {
  return (
    <Stack.Navigator initialRouteName="CalendarPage">
      <Stack.Screen name="CalendarPage" component={CalendarPage} options={{ header: CalendarPageHeader }} />
      <Stack.Screen name="CalendarDetails" component={CalendarDetails} options={{ header: CalendarDetailsHeader }} />
    </Stack.Navigator>
  )
}

function CalendarPageHeader({ navigation }) {
  return (
    <Appbar.Header style={{ backgroundColor: MD3Colors.primary50 }}>
      <Appbar.Action icon="calendar" color={MD3Colors.primary90} />
      <Appbar.Content title={dayjs().format('ddd, MMM DD')} color="white" />
    </Appbar.Header>
  )
}

function CalendarDetailsHeader({ navigation, route }) {
  const date = dayjs(route.params.date)

  return (
    <Appbar.Header style={{ backgroundColor: MD3Colors.primary50 }}>
      <Appbar.BackAction
        color={MD3Colors.primary90}
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content title={'Details'} color="white" />
      <Appbar.Action
        icon="dots-vertical"
        color={MD3Colors.primary90}
        onPress={() => console.log('More')}
      />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
