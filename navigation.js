import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import IndividualChatScreen from './screens/IndividualChatScreen';
import GroupChatScreen from './screens/GroupChatScreen';


const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="IndividualChat" component={IndividualChatScreen} />
                <Stack.Screen name="GroupChat" component={GroupChatScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
