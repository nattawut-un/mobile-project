import { View, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  ActivityIndicator
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

export default function Reward() {
    return (
      <Stack.Navigator initialRouteName='RewardHome'>
        <Stack.Screen name='RewardHome' component={RewardHome} options={{
          title: 'Rewards',
          headerLeft: () => <Ionicons name="pricetags" size={24} color="black" style={{ marginRight: 12 }} />,
          headerShown: false
        }} />
        <Stack.Screen name='RewardInfo' component={Placeholder} options={{
          title: 'Reward info'
        }} />
      </Stack.Navigator>
    )
  }

  function Placeholder({ route }) {
    const { subject } = route.params
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
        <View style={{ marginVertical: 4 }} />
        <Text variant="bodyMedium">{subject.title}</Text>
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