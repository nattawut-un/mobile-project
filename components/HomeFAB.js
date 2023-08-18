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
      icon={open ? 'calendar-today' : 'plus'}
      actions={[
        { icon: 'plus', onPress: () => console.log('Pressed add') },
        {
          icon: 'star',
          label: 'Star',
          onPress: () => console.log('Pressed star'),
        },
        {
          icon: 'email',
          label: 'Email',
          onPress: () => console.log('Pressed email'),
        },
        {
          icon: 'bell',
          label: 'Remind',
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