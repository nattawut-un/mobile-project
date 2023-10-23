import { Text, Appbar, MD3Colors } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AdminHome from "./AdminHome";
import AdminItems from "./AdminItems";
import AdminHistory from "./AdminHistory";
import AdminScan from "./AdminScan";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

function AdminDashboard({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: MD3Colors.primary50,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: MD3Colors.primary80,
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AdminItems"
        component={AdminItems}
        options={{
          title: 'Items',
        }}
      />
      <Tab.Screen
        name="AdminHistory"
        component={AdminHistory}
        options={{
          title: 'History',
        }}
      />
    </Tab.Navigator>
  )
}

export default function AdminMain({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="AdminDashboard">
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ header: AdminMainHeader }}
      />
      <Stack.Screen
        name="AdminScan"
        component={AdminScan}
        options={{ header: AdminScanHeader, animation: 'fade_from_bottom' }}
      />
    </Stack.Navigator>
  )
}

function AdminMainHeader({ navigation }) {
  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
    >
      <Appbar.BackAction
        color={MD3Colors.primary90}
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content title="Admin" color="white" />
    </Appbar.Header>
  )
}

function AdminScanHeader({ navigation }) {
  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: MD3Colors.primary50 }}
    >
      <Appbar.Action
        icon='window-close'
        onPress={() => navigation.goBack()}
        color={MD3Colors.primary90}
      />
      <Appbar.Content title="Scan" color="white" />
    </Appbar.Header>
  )
}
