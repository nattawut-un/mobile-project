import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { useState } from 'react'
import { Text, Appbar, ActivityIndicator, MD3Colors, Chip } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import ListCard from 'components/ListCard'
import TestImage from 'assets/icon.png'

const Tab = createMaterialTopTabNavigator()

export default function SubjectInfo({ navigation, route }) {
  console.log('main :', route)
  const { subject } = route.params

  return (
    <Tab.Navigator
      initialRouteName="SubjectInfoTab"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: MD3Colors.primary50,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: MD3Colors.primary80,
        tabBarIndicatorStyle: {
          backgroundColor: 'white'
        }
      }}
      onPres
    >
      <Tab.Screen
        name="SubjectInfoTab"
        component={SubjectInfoTab}
        options={{ title: 'Info' }}
        initialParams={{ subject }}
      />
      <Tab.Screen
        name="SubjectInfoHomework"
        component={SubjectInfoHomework}
        options={{ title: 'Homework' }}
        initialParams={{ subject }}
      />
    </Tab.Navigator>
  )
}

function SubjectInfoTab({ navigation, route }) {
  const { subject } = route.params

  return (
    <ScrollView style={styles.container}>
      <ListCard title="Teacher" description="Lorem Ipsum" image={TestImage} />
      <ListCard
        title="Description"
        description={subject.description}
        icon={<MaterialIcons name="info" size={40} color="gray" />}
      />
      <ListCard
        title="Timetable"
        icon={<MaterialIcons name="today" size={40} color="gray" />}
      >
        <Chip icon="information" onPress={() => console.log('Pressed')} style={styles.chip}>
          Example Chip
        </Chip>
        <Chip icon="information" onPress={() => console.log('Pressed')} style={styles.chip}>
          Example Chip
        </Chip>
      </ListCard>
    </ScrollView>
  )
}

function SubjectInfoHomework({ navigation, route }) {
  const { subject } = route.params

  return (
    <ScrollView style={styles.container}>
      <ListCard
        title="Week 1"
        icon={<MaterialIcons name="info" size={40} color="gray" />}
      >
        <Text variant="bodySmall">11 Oct, 2023</Text>
        <Text variant="bodySmall">22:00:00</Text>
        <Text variant="bodySmall">10p</Text>

        <ChipFinished />
      </ListCard>
      <ListCard
        title="Week 2"
        icon={<MaterialIcons name="info" size={40} color="gray" />}
      >
        <Text variant="bodySmall">11 Oct, 2023</Text>
        <Text variant="bodySmall">22:00:01</Text>
        <Text variant="bodySmall">10p</Text>

        <ChipUnfinished />
      </ListCard>
    </ScrollView>
  )
}

const ChipFinished = () => (
  <Chip icon="check" style={styles.chip}>
    Finish
  </Chip>
)

const ChipUnfinished = () => (
  <Chip icon="close" onPress={() => console.log('Pressed')} style={styles.chip}>
    Unfinished
  </Chip>
)

// function SubjectInfoHomework({ navigation, route }) {
//   const { subject } = route.params

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <ActivityIndicator animating={true} size="large" />
//       <View style={{ marginVertical: 4 }} />
//       <Text variant="bodyMedium">{subject.title}</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  chip: {
    marginTop: 4,
    // backgroundColor: 'hsla(0, 0%, 0%, 0.07)',
  },
})
