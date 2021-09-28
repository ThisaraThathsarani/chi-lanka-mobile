import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import placeAnOrder from './src/components/placeAnOrder';
import draftList from './src/components/draftList';


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

export default function App() {
  return (
    <NavigationContainer theme={defaultTheme}>
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
        <Tab.Screen name="placeOrder" component={placeAnOrder} options={{ headerTitleAlign: 'center', title: 'Place an Order' }} />
        <Tab.Screen name="draftList" component={draftList} options={{ headerTitleAlign: 'center', title: 'Drafts List' }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
