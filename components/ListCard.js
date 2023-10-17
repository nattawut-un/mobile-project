import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { MD3Colors, Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * @param {object} props
 * @param {string} props.title Card title
 * @param {string} props.description Card description
 * @param {string} props.image Path of an image
 * @param {string} props.date Due date
 * @param {JSX.Element} props.icon Icon element
 * @param {JSX.Element} props.children Children element
 * @param {() => void} props.onPress Function to call when the card is selected
 */
export default function ListCard(props) {
  const { title, description, image, date, icon, children, onPress } = props
  const dueDate = dayjs.unix(date) ?? null

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : icon ? (
          icon
        ) : (
          <View />
        )}
      </View>
      <View style={{ width: '85%' }}>
        <Text variant="labelLarge">{title}</Text>
        {date ? (
          <Text variant="labelMedium">
            {dueDate.fromNow()} ({dueDate.format('DD MMM YYYY, HH:ss')})
          </Text>
        ) : null}
        {description ? (
          <Text
            variant="bodyMedium"
            style={{
              flexWrap: 'nowrap',
              alignItems: 'flex-start',
            }}
          >
            {description}
          </Text>
        ) : null}
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'hsla(0, 0%, 0%, 0.07)',
    backgroundColor: MD3Colors.primary95,
    borderRadius: 10,
    padding: 16,
    marginVertical: 4,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: '100%',
    marginRight: 12,
    objectFit: 'contain',
    borderRadius: 100,
    aspectRatio: '1/1',
  },
})
