import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { MD3Colors } from 'react-native-paper'

import Home from './Home'
import Settings from './Settings'
import Calendar from './Calendar'
import Subject from './Subject'
import Agenda from './Agenda'

const Tab = createMaterialBottomTabNavigator()

const bottomBarItems = [
  {
    name: 'Calendar',
    component: Calendar,
    icons: ['calendar-outline', 'calendar-sharp'],
  },
  {
    name: 'Agenda',
    component: Agenda,
    icons: ['list', 'list'],
  },
  {
    name: 'Home',
    component: Home,
    icons: ['home-outline', 'home'],
  },
  {
    name: 'Subjects',
    component: Subject,
    icons: ['bookmarks-outline', 'bookmarks'],
  },
  {
    name: 'Settings',
    component: Settings,
    icons: ['settings-outline', 'settings'],
  },
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
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Ionicons name={item.icons[1]} size={24} color={MD3Colors.primary10} />
            ) : (
              <Ionicons name={item.icons[0]} size={24} color={MD3Colors.primary90} />
            )
          },
          tabBarActiveBackgroundColor: '#eee',
        }}
      />
    )
  })
  return res
}

export default function Main() {
  const [markedDates, setMarkedDates] = useState({
    '2023-08-21': { marked: true, dotColor: 'red' },
  })
  function addDate(date, options) {
    setMarkedDates(prevState => {
      let markedDates = Object.assign({}, prevState.markedDates)
      markedDates[date] = options
      return { markedDates }
    })
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={MD3Colors.primary90}
      inactiveColor="#ffcfdf"
      barStyle={{ backgroundColor: MD3Colors.primary50 }}
      shifting={true}
    >
      {createBottomBarTabs()}
    </Tab.Navigator>
  )
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
