'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Nav from './RouterConfig'


class Navigation extends React.PureComponent {

    componentDidMount() {
        SplashScreen.hide();
    }

    _captureRef = (v) => {
        this.navigationRef = v
    }

    render() {
        return (
            <View style={styles.container}>
                <Nav ref={this._captureRef} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});


export default Navigation;
