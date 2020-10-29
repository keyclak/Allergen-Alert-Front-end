import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, createTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './src/context';

// import Food from './src/screens/Food'; 
import LandingPage from './src/screens/LandingPage';
import Settings from './src/screens/Settings'
import Login from './src/screens/auth/Login';
import { Colors, StyleConstants } from './src/style';
import CreateAccount from './src/screens/auth/CreateAccount';
import Scanner from './src/screens/Scanner';

const Tabs = createBottomTabNavigator(); 
function TabScreen() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name = "Search" component = {SearchStackScreen}/>
            <Tabs.Screen name = "Home" component = {HomeStackScreen}/>
        </Tabs.Navigator>
    )
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
    return (
        <SearchStack.Navigator>
            {/* Add Scanning Page */}
            {/* Add Food Page */}
        </SearchStack.Navigator>
    );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            {/* <HomeStack.Screen name="FoodPage" component={Food} /> */}
            <HomeStack.Screen name="LandingPage" component={LandingPage} options={{ title: "Home" }}/>
            <HomeStack.Screen name="Settings" component={Settings} options={{ title: "Settings" }}/>
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
    const [authToken, setAuthToken] = useState('abc');

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
                        ? <TabScreen/>
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