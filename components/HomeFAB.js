import { useState } from "react"
import { FAB, Portal, PaperProvider } from 'react-native-paper'

export default function HomeFAB() {
  const [state, setState] = useState({ open: false })
  const onStateChange = ({ open }) => setState({ open })
  const { open } = state

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? 'arrow-down' : 'plus'}
      actions={[
        {
          icon: 'bookmark',
          label: 'Subject',
          onPress: () => console.log('Pressed star'),
        },
        {
          icon: 'table',
          label: 'Timetable',
          onPress: () => console.log('Pressed email'),
        },
        {
          icon: 'book',
          label: 'Homework',
          onPress: () => console.log('Pressed notifications'),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  )
}