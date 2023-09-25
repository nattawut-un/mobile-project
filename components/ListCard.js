import { View, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

/**
 * @param {object} props
 * @param {string} props.title Card title
 * @param {string} props.description Card description
 * @param {string} props.image Path of an image
 * @param {() => void} props.onSelect Function to call when the card is selected
 */
export default function ListCard(props) {
  const { title, description, image } = props
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View>
        <Text variant='labelLarge'>{title}</Text>
        <Text variant='bodyMedium'>{description.length >= 40 ? description.substring(0, 40) + '...' : description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsla(0, 0%, 0%, 0.07)',
    borderRadius: 10,
    padding: 16,
    marginVertical: 4,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
    objectFit: 'contain',
    borderRadius: 100,
    aspectRatio: '1/1'
  },
})
