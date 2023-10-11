import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Portal, PaperProvider, Text, Appbar, MD3Colors } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';

import HomeFAB from 'components/HomeFAB';
import ListCard from 'components/ListCard';
import TestImage from 'assets/icon.png'
import Settings from './Settings';

const Stack = createNativeStackNavigator()

function Homepage({ navigation }) {
  dayjs.extend(UTC)

  const [date, setDate] = useState(dayjs())
  const clockInterval = () => {
    setDate(dayjs())
  }

  const toSettings = () => navigation.navigate("Settings")

  useEffect(() => {
    const interval = setInterval(clockInterval, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PaperProvider>
      <Portal>
        <Appbar.Header
          mode="small"
          style={{
            backgroundColor: MD3Colors.primary50,
          }}
        >
          <Appbar.Action icon="home" color={MD3Colors.primary90} />
          <Appbar.Content title="Home" color="white" />
          <Appbar.Action
            icon="login-variant"
            color={MD3Colors.primary90}
            onPress={() => console.log('Login')}
          />
          <Appbar.Action
            icon="cog"
            color={MD3Colors.primary90}
            onPress={() => toSettings()}
          />
          <Appbar.Action
            icon="dots-vertical"
            color={MD3Colors.primary90}
            onPress={() => console.log('More')}
          />
        </Appbar.Header>
        <ScrollView style={styles.container}>
          <View style={styles.timeElement}>
            <Text variant="displayLarge" style={styles.time}>
              {date.format('H:mm:ss')}
            </Text>
            <Text variant="titleLarge" style={styles.time}>
              {date.format('dddd, MMMM D, YYYY')}
            </Text>
            {/* <Text style={styles.text}>เทส</Text> */}
          </View>
          <View style={{ marginVertical: 8 }}>
            {[...Array(10).keys()].map((n, i) => (
              <ListCard
                key={i}
                title={'Title ' + n}
                description={
                  'Nisi ea est veniam adipisicing aliqua est aliqua dolore laboris. ' +
                  n
                }
                image={TestImage}
              />
            ))}
          </View>
          {/* <View></View> */}
        </ScrollView>
        <HomeFAB />
      </Portal>
    </PaperProvider>
  )
}

export default function Home() {
  return (
    <Stack.Navigator initialRouteName='Homepage' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='Homepage' component={Homepage} />
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  timeElement: {
    paddingTop: 32,
    paddingBottom: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    fontWeight: '500',
  },
  text: {
    fontFamily: 'font-thai',
    fontSize: 99
  },
})
