import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, createTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './src/context';
import { ListItem, Icon } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';

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


const fadeTransition = {
    transitionSpec: {
        open: {
            animation: 'timing',
            config: {
            }
        },
        close: {
            animation: 'timing',
            config: {
                duration: 300
            }
        }
    },
    cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        }
    })
};

function HeaderMenuButton(navigation) {
    return (
        <Pressable onPress={() => navigation.openDrawer()} style={{paddingHorizontal: 12, height: '100%', justifyContent: 'center'}}>
            <MaterialIcons name="menu" color={Colors.Background} size={28} />
        </Pressable>
    );
}

function GetMenuHeaderOptions(title) {
    return ({navigation}) => {
        return {
            headerTitle: title,
            headerLeft: () => HeaderMenuButton(navigation)
        }
    };
}

function GetSearchMenuHeaderOptions() {
    return ({navigation}) => {
        return {
            headerTintColor: Colors.Background,
            headerStyle: {backgroundColor: Colors.Blue[4]},
            headerTitleContainerStyle: { margin: 0, padding: 0, left: 52 },
            headerTitleAlign: 'left',
            headerLeft: () => HeaderMenuButton(navigation)
        }
    }
}

const HeaderScreenOptions = {
    headerStyle: {
        backgroundColor: Colors.Blue[4]
    },
    headerTintColor: Colors.Background,
    headerTitleAlign: 'center',
};

const Drawer = createDrawerNavigator();
function DrawerScreen() {
    return (
        <Drawer.Navigator drawerStyle={{backgroundColor: Colors.Blue[6]}} drawerContentOptions={{ activeTintColor: 'white', activeBackgroundColor: Colors.Blue[7], inactiveTintColor: Colors.Gray[3]}}>
            <Drawer.Screen name="Search" component={SearchStackScreen}/>
            <Drawer.Screen name="My Diet" component={DietStackScreen}/>
            <Drawer.Screen name="Grocery List" component={GroceryListStackScreen}/>
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
        <SearchStack.Navigator screenOptions={HeaderScreenOptions}>
            <SearchStack.Screen name="FoodSearch" component={FoodSearch} options={GetSearchMenuHeaderOptions()}/>
            <SearchStack.Screen name="Scanner" component={Scanner} />
            <SearchStack.Screen name="FoodPage" component={Food} options={{ headerTitleAlign: 'center', title: "Food Information" }}/>
        </SearchStack.Navigator>
    );
}

const DietStack = createStackNavigator();
function DietStackScreen() {
    return (
        <DietStack.Navigator screenOptions={HeaderScreenOptions}>
            <DietStack.Screen name="ViewDiet" component={ViewDiet} options={GetMenuHeaderOptions('Diet')}/>
            <DietStack.Screen name="SelectRestriction" component={SelectRestriction} options={{ headerShown: false, ...fadeTransition }}/>
            <DietStack.Screen name="FoodPage" component={Food}/>
            <DietStack.Screen name="RestrictionInfo" component={RestrictionInfo}/>
            <DietStack.Screen name="TypeRestriction" component={TypeRestriction}/>
        </DietStack.Navigator>
    )
}

const GroceryListStack = createStackNavigator();
function GroceryListStackScreen() {
    return (
        <GroceryListStack.Navigator screenOptions={HeaderScreenOptions}>
            <GroceryListStack.Screen name="GroceryList" component={GroceryList} options={GetMenuHeaderOptions('Grocery List')} />
            <GroceryListStack.Screen name="FoodPage" component={Food} options={{ title: "Food Information" }}/>
        </GroceryListStack.Navigator>
    )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerStyle: navStyle.header, headerTintColor: Colors.Accent}}>
            <HomeStack.Screen name="LandingPage" component={LandingPage} options={{ title: "Search"}}/>
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
        backgroundColor: Colors.Blue[4],
    }
});
