import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { List, MD3Colors, Appbar, PaperProvider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { LogoutModal } from 'components/modal'
import { FIREBASE_AUTH } from 'config/firebase'
import { onSnapshot } from 'firebase/firestore'
import { getUserInfo } from 'services/firestore'

export default function SettingsHome({ navigation } ) {
  const user = useSelector(state => state.user.user)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const logOut = () => {
    console.log('Logout')
    navigation.navigate('Home')
    FIREBASE_AUTH.signOut()
  }

  const [userInfo, setUserInfo] = useState({})
  const userRef = getUserInfo(user ? user.uid : '0')
  useEffect(() => {
    const unsub = onSnapshot(userRef, { next: (snap => {
      setUserInfo(snap.data())
    }) })
    return () => unsub()
  }, [])

  return (
    <>
      <ScrollView>
        {userInfo && userInfo.admin ? (
          <List.Section>
            <List.Subheader>Admin</List.Subheader>
            <List.Item
              title="Admin page"
              left={() => <List.Icon color={MD3Colors.primary50} icon="security" />}
              onPress={e => navigation.navigate('AdminPage')}
              style={styles.listItem}
            />
          </List.Section>
        ) : null}
        <List.Section>
          <List.Subheader>User</List.Subheader>
          <List.Item
            title="Your name"
            description={userInfo ? userInfo.name : ''}
            left={() => <List.Icon color="gray" icon="account" />}
            onPress={e => console.log(user)}
            style={styles.listItem}
          />
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
            left={() => <List.Icon color="gray" icon="key" />}
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
    </>
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
