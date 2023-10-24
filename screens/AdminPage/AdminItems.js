import { View, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  ActivityIndicator
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

// import AdminSubjectHome from './AdminSubjectHome'

const Stack = createNativeStackNavigator()

export default function AdminItems() {
  return (
    <Placeholder />
  )
}

function Placeholder({ route }) {
  // const { subject } = route.params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} size="large" />
      <View style={{ marginVertical: 4 }} />
      {/* <Text variant="bodyMedium">{subject.title}</Text> */}
    </View>
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

