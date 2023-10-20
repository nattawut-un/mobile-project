import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { List, MD3Colors, Appbar } from 'react-native-paper'

export default function RewardHistory({ navigation } ) {
  return (
    <View>
      <Appbar.Header
          mode="small"
          style={{
            backgroundColor: MD3Colors.primary50,
          }}
        >
          <Appbar.BackAction color={MD3Colors.primary90} onPress={() => navigation.goBack()} />
        <Appbar.Content title='History' color='white' />
      </Appbar.Header>
      <ScrollView>
        <View>
            <Text>
                Hello
            </Text>
        </View>

        
        {/* <List.Section>
          <List.Subheader>Some title</List.Subheader>
          <List.Item
            title="First Item"
            left={() => <List.Icon color={MD3Colors.primary50} icon="folder" />}
            onPress={e => navigation.navigate('SettingsA')}
            style={styles.listItem}
          />
          <List.Item
            title="Second Item"
            left={() => <List.Icon color={MD3Colors.primary50} icon="calendar" />}
            onPress={e => navigation.navigate('SettingsA')}
            style={styles.listItem}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Version 0.0.1"
            left={() => <List.Icon color='gray' icon="application-brackets-outline" />}
            onPress={e => console.log('Version 0.0.1')}
            style={styles.listItem}
          />
        </List.Section> */}
      </ScrollView>
    </View>
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
