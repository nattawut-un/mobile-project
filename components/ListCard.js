import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { MD3Colors, Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

/**
 * @param {object} props
 * @param {string} props.title Card title
 * @param {string} props.description Card description
 * @param {string} props.image Path of an image
 * @param {JSX.Element} props.icon Icon element
 * @param {JSX.Element} props.children Children element
 * @param {() => void} props.onSelect Function to call when the card is selected
 */
export default function ListCard(props) {
  const { title, description, image, icon, children } = props
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          icon ? icon : <View />
        )}
      </View>
      <View style={{ width: '85%' }}>
        <Text variant="labelLarge">{title}</Text>
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
