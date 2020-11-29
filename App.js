import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, createTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './src/context';
import { ListItem, Icon } from 'react-native-elements'

import Food from './src/screens/search/Food'; 
import LandingPage from './src/screens/LandingPage';
import Settings from './src/screens/Settings'
import ViewDiet from './src/screens/ViewDiet'
import TypeRestriction from './src/screens/TypeRestriction'
import SelectRestriction from './src/screens/SelectRestriction'
import Login from './src/screens/auth/Login';
import RestrictionInfo from './src/screens/RestrictionInfo';
import { Colors, StyleConstants } from './src/style';
import CreateAccount from './src/screens/auth/CreateAccount';
import ForgotPass from './src/screens/auth/ForgotPass';
import ChangePass from './src/screens/auth/ChangePass';
import AuthCode from './src/screens/auth/AuthCode';
import FoodSearch from './src/screens/search/FoodSearch';
import Scanner from './src/screens/search/Scanner';
import GroceryList from './src/screens/GroceryList'

const Drawer = createDrawerNavigator();
function DrawerScreen() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={SearchStackScreen}/>
            <Drawer.Screen name="My Diet" component={DietStackScreen}/>
        </Drawer.Navigator>
    );
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{title: "Sign Up"}}/>
            <AuthStack.Screen name="ForgotPass" component={ForgotPass} options={{title: "Reset Password"}}/>
            <AuthStack.Screen name="ChangePass" component={ChangePass} options={{title: "Reset Password"}}/>
            <AuthStack.Screen name="AuthCode" component={AuthCode} options={{title: "Reset Password"}}/>
        </AuthStack.Navigator>
    )
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }}>
            <SearchStack.Screen name="FoodSearch" component={FoodSearch} />
            <SearchStack.Screen name="Scanner" component={Scanner} />
            <SearchStack.Screen name="FoodPage" component={Food} options={{ title: "Ingredient Information" }}/>
        </SearchStack.Navigator>
    );
}

const DietStack = createStackNavigator();
function DietStackScreen() {
    return (
        <DietStack.Navigator screenOptions={{ headerShown: false }}>
            <DietStack.Screen name="ViewDiet" component={ViewDiet} />
            <HomeStack.Screen name="SelectRestriction" component={SelectRestriction}/>
            <HomeStack.Screen name="FoodPage" component={Food}/>
            <HomeStack.Screen name="RestrictionInfo" component={RestrictionInfo}/>
            <HomeStack.Screen name="TypeRestriction" component={TypeRestriction}/>
        </DietStack.Navigator>
    )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerStyle: navStyle.header, headerTintColor: Colors.Accent}}>
            <HomeStack.Screen name="LandingPage" component={LandingPage} options={{ title: "Home"}}/>
            <HomeStack.Screen name="Settings" component={Settings} options={{ title: "Settings" }}/>
            <HomeStack.Screen name="ViewDiet" component={ViewDiet} options={{ title: "My Diet" }}/>
            <HomeStack.Screen name="SelectRestriction" component={SelectRestriction} options={{ title: "Add Dietary Restriction" }}/>
            <HomeStack.Screen name="GroceryList" component={GroceryList} options={{ title: "Grocery List" }}/>
            <HomeStack.Screen name="FoodPage" component={Food} options={{ title: "Ingredient Information" }}/>
            <HomeStack.Screen name="RestrictionInfo" component={RestrictionInfo} options={{ title: "Edit Dietary Restrictions" }}/>
            <HomeStack.Screen name="TypeRestriction" component={TypeRestriction} options={{ title: "Type an Ingredient" }}/>
        </HomeStack.Navigator>
    );
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
                        ? <DrawerScreen/>
                        : <AuthStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const navStyle = StyleSheet.create({
    header: {
        backgroundColor: Colors.Secondary,
    }
});
