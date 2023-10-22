import { StyleSheet, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon } from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react'
import { MD3Colors, Provider, PaperProvider, ActivityIndicator, Text } from 'react-native-paper'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from 'config/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { saveUser } from 'config/redux'

import Login from './Login'
import Home from './Home'
import Calendar from './Calendar'
import Subject from './Subject'
import Reward from './Reward'
import Timetable from './Timetable'
import { checkAdmin } from 'services/firestore'

const Tab = createMaterialBottomTabNavigator()

const bottomBarItems = [
  {
    name: 'Calendar',
    component: Calendar,
    icons: ['calendar-outline', 'calendar-sharp'],
  },
  {
    name: 'Timetable',
    component: Timetable,
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
    component: Reward,
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
              <Ionicons name={item.icons[1]} size={24} color={MD3Colors.primary20} />
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
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) console.log('User loaded:', user.email)
      dispatch(saveUser(user))
      setUser(user)
    })
    setLoading(false)
  }, [])

  if (loading) return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  )

  if (user) return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={MD3Colors.primary90}
        inactiveColor="#ffcfdf"
        shifting={true}
        backBehavior="initialRoute"
        barStyle={{ backgroundColor: MD3Colors.primary50 }}
        screenOptions={{ headerShown: false }}
        compact={true}
      >
        {createBottomBarTabs()}
      </Tab.Navigator>
      <StatusBar style="light" />
    </>
  )

  return (
    <>
      <Login />
      <StatusBar style="dark" />
    </>
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
