import React, {Component} from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Intro from "./src/Intro";
import Home from "./src/Home"
import Edit from "./src/Edit"
import Search from "./src/Search"
import Login from "./src/Login"
import Register from "./src/Register"
import Menu from "./src/Menu"
import './utils.js'

const AppNavigator = createStackNavigator(
    {
        Intro: {
            screen: Intro,
        },
        Home: {
            screen: Home
        },
        Edit: {
            screen: Edit
        },
        Search:{
            screen: Search
        },
        Login:{
            screen: Login
        },
        Register:{
            screen: Register
        },
        Menu:{
            screen: Menu
        }

    },
    {
        initialRouteName: 'Intro',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
