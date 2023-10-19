import { View, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native'
import { useState } from 'react'
import { Text, Appbar, ActivityIndicator, MD3Colors, Chip } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialIcons } from '@expo/vector-icons'
// import { getSubjectsCollection } from 'services/firestore'
import { DAYS } from 'constants'
import { useSelector, useDispatch } from 'react-redux'

import ListCard from 'components/ListCard'
import TestImage from 'assets/icon.png'

const Tab = createMaterialTopTabNavigator()
// const subjectsCollection = getSubjectsCollection()

export default function SubjectInfo({ navigation, route }) {
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
      {subject.image ? (
        <Image src={subject.image} style={{
          height: 200,
          borderWidth: 2,
          borderColor: '#eee',
          borderRadius: 15,
          marginBottom: 4
        }} />
      ) : null}
      <ListCard title="Teacher" description="Lorem Ipsum" image={TestImage} />
      <ListCard
        title="Description"
        description={subject.description}
        icon={<MaterialIcons name="info" size={40} color={MD3Colors.primary50} />}
      />
      <ListCard
        title="Timetable"
        icon={<MaterialIcons name="today" size={40} color={MD3Colors.primary50} />}
      >
        {subject.timetable ? subject.timetable.map((item, index) => (
          <Chip
            key={index}
            icon="information"
            onPress={() => console.log('Pressed')}
            style={styles.chip}
          >
            {DAYS[item.day].short}, {(item.h + '').padStart(2, '0')}:
            {(item.m + '').padStart(2, '0')}
          </Chip>
        )) : (
          <Text style={{ fontStyle: 'italic' }}>None</Text>
        )}
      </ListCard>
      <View style={{ marginVertical: 16 }} />
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
