import { View, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  ActivityIndicator,
  Appbar,
  MD3Colors
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import SubjectHome from './subject/SubjectHome'
import SubjectInfo from './subject/SubjectInfo'

const Stack = createNativeStackNavigator()

export default function Subject() {
  return (
    <Stack.Navigator
      initialRouteName="SubjectHome"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="SubjectHome"
        component={SubjectHome}
        options={{
          title: 'Subjects',
          header: SubjectHomeHeader,
        }}
      />
      <Stack.Screen
        name="SubjectInfo"
        component={SubjectInfo}
        options={{
          title: 'Subjects Info',
          header: SubjectInfoHeader
        }}
      />
    </Stack.Navigator>
  )
}

function SubjectHomeHeader() {
  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50 }}
    >
      <Appbar.Action
        icon="bookmark-multiple"
        color={MD3Colors.primary90}
        // onPress={_handleSearch}
      />
      <Appbar.Content title="Subjects" color="white" />
      <Appbar.Action
        icon="dots-vertical"
        color={MD3Colors.primary90}
        // onPress={_handleMore}
      />
    </Appbar.Header>
  )
}

function SubjectInfoHeader({ navigation, route }) {
  const { subject } = route.params

  return (
    <Appbar.Header
      mode="large"
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
    >
      <Appbar.BackAction
        color={MD3Colors.primary90}
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content title={subject.title} color="white" />
      <Appbar.Action
        icon="pencil"
        color={MD3Colors.primary90}
        onPress={() => console.log('More')}
      />
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
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
})

