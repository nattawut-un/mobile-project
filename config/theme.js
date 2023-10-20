import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper'

export default AppTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#ff5f5f',
  },
}
