import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { List, MD3Colors, Appbar, PaperProvider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { saveUser } from 'config/redux'
import { LogoutModal } from 'components/modal'
import { FIREBASE_AUTH } from 'config/firebase'

export default function SettingsHome({ navigation } ) {
  const user = useSelector(state => state.user.user)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const logOut = () => {
    console.log('Logout')
    navigation.navigate('Home')
    FIREBASE_AUTH.signOut()
  }

  return (
    <PaperProvider>
      <ScrollView>
        <List.Section>
          <List.Subheader>Some title</List.Subheader>
          <List.Item
            title="First Item"
            left={() => <List.Icon color={MD3Colors.primary50} icon="folder" />}
            onPress={e => navigation.navigate('SettingsA')}
            style={styles.listItem}
          />
          <List.Item
            title="Second Item"
            left={() => (
              <List.Icon color={MD3Colors.primary50} icon="calendar" />
            )}
            onPress={e => navigation.navigate('SettingsA')}
            style={styles.listItem}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>User</List.Subheader>
          <List.Item
            title="Your email"
            description={user ? user.email : ''}
            left={() => <List.Icon color="gray" icon="email" />}
            onPress={e => console.log(user)}
            style={styles.listItem}
          />
          <List.Item
            title="Your UID"
            description={user ? user.uid : ''}
            left={() => <List.Icon color="gray" icon="account" />}
            onPress={e => console.log(user)}
            style={styles.listItem}
          />
          <List.Item
            title="Logout"
            titleStyle={{ color: 'red' }}
            left={() => <List.Icon color="red" icon="logout" />}
            onPress={e => setShowLogoutModal(true)}
            style={styles.listItem}
            rippleColor={'hsl(0, 50%, 80%)'}
          />
        </List.Section>
        <List.Section title="App">
          <List.Item
            title="Version"
            description="0.0.1"
            left={() => (
              <List.Icon color="gray" icon="application-brackets-outline" />
            )}
            onPress={e => console.log('Version 0.0.1')}
            style={styles.listItem}
          />
        </List.Section>
      </ScrollView>
      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onOK={logOut}
      />
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  listItem: {
    paddingHorizontal: 16,
  },
})
