import { Text, Appbar } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AdminHome from "./AdminHome";

const Tab = createMaterialTopTabNavigator()

export default function AdminMain({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="AdminHome" component={AdminHome} options={{
        title: 'Home'
      }} />
      <Tab.Screen name="AdminHistory" component={AdminHome} options={{
        title: 'History'
      }} />
    </Tab.Navigator>
  )
}
