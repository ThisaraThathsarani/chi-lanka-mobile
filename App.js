import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import placeAnOrder from './src/components/placeAnOrder';
import draftList from './src/components/draftList';

import login from './src/components/login';





const defaultTheme = {
  ...DefaultTheme,
  // dark: false,
  colors: {
    // ...DefaultTheme.colors,
    card: '#FFA800',
    primary: "#FFA800",
    text: 'black',
    background: 'white',
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#FFA800' },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'placeOrder') {
            iconName = focused
              ? 'email-plus'
              : 'email-plus-outline';
          } else if (route.name === 'draftList') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          }

          // You can return any component that you like here!
          return <Icons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="draftList" component={draftList} options={{ headerTitleAlign: 'center', title: 'Drafts List', }} />
      <Tab.Screen name="placeOrder" component={placeAnOrder} options={{ headerTitleAlign: 'center', title: 'Place an Order' }} />

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer theme={defaultTheme}>

      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="draftList" component={draftList} options={{ headerTitleAlign: 'center', title: 'Drafts List' }} />
        <Stack.Screen name="Login" component={login} options={{ headerTitleAlign: 'center' }} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}


