import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { MD3Colors, Provider, PaperProvider } from 'react-native-paper'

import Home from './Home'
import Settings from './Settings'
import Calendar from './Calendar'
import Subject from './Subject'
import Agenda from './Agenda'

const Tab = createMaterialBottomTabNavigator()

const bottomBarItems = [
  {
    name: 'Calendar',
    component: IDK,
    icons: ['calendar-outline', 'calendar-sharp'],
  },
  {
    name: 'Timetable',
    component: IDK,
    icons: ['list', 'list'],
  },
  {
    name: 'Home',
    component: Home,
    icons: ['home-outline', 'home'],
  },
  {
    name: 'Subject',
    component: Subject,
    icons: ['bookmarks-outline', 'bookmarks'],
  },
  {
    name: 'Rewards',
    component: IDK,
    icons: ['pricetags-outline', 'pricetags'],
  },
]
const colors = [
  '#3A87AD',
  '#B15C92',
  '#F8A537',
  '#72E66C',
  '#D94F3C',
  '#8E63A8',
  '#5BC2E7',
  '#FF9F55',
  '#A1D05E',
  '#E04E39',
]

function createBottomBarTabs() {
  let res = []
  bottomBarItems.forEach(item => {
    res.push(
      <Tab.Screen
        name={item.name}
        key={item.name}
        component={item.component}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <Ionicons name={item.icons[1]} size={24} color={MD3Colors.primary10} />
            ) : (
              <Ionicons name={item.icons[0]} size={24} color={MD3Colors.primary90} />
            )
          },
          tabBarColor: colors[item.name.length % 10],
          tabBarBadge: false,
        }}
      />
    )
  })
  return res
}

export default function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={MD3Colors.primary90}
      inactiveColor="#ffcfdf"
      shifting={true}
      backBehavior="initialRoute"
      barStyle={{ backgroundColor: MD3Colors.primary50, }}
      screenOptions={{ headerShown: false }}
    >
      {createBottomBarTabs()}
    </Tab.Navigator>
  )
}

function IDK() {
  return <View />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'orange',
  },
})
