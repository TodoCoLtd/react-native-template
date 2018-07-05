/*
 * @author: jiasong 
 * @creation time: 2018-07-05 11:08:40
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Container from '../component/Container';
import Navigation from '../router/Navigation';

// 处理推送，导航,引导页等其他的功能
class Main extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        SplashScreen.hide()
    }

    get navigationRef() {
        return null
    }

    render() {
        return (
            <Container fitIPhoneX={false}>
                <Navigation />
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});

export default Main