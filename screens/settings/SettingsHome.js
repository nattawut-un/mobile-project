import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { List, MD3Colors } from 'react-native-paper'

export default function SettingsHome() {
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Some title</List.Subheader>
        <List.Item
          title="First Item"
          left={() => <List.Icon color={MD3Colors.primary50} icon="folder" />}
          onPress={e => console.log('First Item')}
          style={styles.listItem}
        />
        <List.Item
          title="Second Item"
          left={() => <List.Icon color={MD3Colors.primary50} icon="calendar" />}
          onPress={e => console.log('Second Item')}
          style={styles.listItem}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version 0.0.1"
          left={() => <List.Icon color={MD3Colors.primary50} icon="application-brackets-outline" />}
          onPress={e => console.log('First Item')}
          style={styles.listItem}
        />
      </List.Section>
    </ScrollView>
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
