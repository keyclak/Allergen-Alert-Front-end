import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/context';

import Home from './src/screens/Home';
import Login from './src/screens/auth/Login';
import { Colors, StyleConstants } from './src/style';
import CreateAccount from './src/screens/auth/CreateAccount';
import Scanner from './src/screens/Scanner';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home}/>
        </HomeStack.Navigator>
    );
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
    return (
        <AuthStack.Navigator screenOptions={{ headerStyle: navStyle.header, headerTintColor: Colors.Foreground }}>
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <AuthStack.Screen name="CreateAccount" component={CreateAccount}/>
            <AuthStack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    )
}

export default function App() {
    const [authToken, setAuthToken] = useState(null);

    const authContext = {
        token: authToken,
        logIn(token) {
            console.log(token);
            setAuthToken(token);
        },
        logOut() {
            setAuthToken(null);
        },
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    authToken
                        ? <HomeStackScreen/>
                        : <AuthStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const navStyle = StyleSheet.create({
    header: {
        backgroundColor: Colors.BackgroundBlur,
    }
});