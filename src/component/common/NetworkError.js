'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types'

class NetworkError extends React.PureComponent {

    static propTypes = {
        onNetworkReload: PropTypes.func
    }

    static defaultProps = {

    }

    render() {
        const { onNetworkReload } = this.props
        return (
            <View style={styles.container}>
                <Image style={styles.errImage} source={Images.icon_network_err} />
                <Text style={styles.description}>天哪，网络好像出了点小问题?</Text>
                <TouchableOpacity style={styles.reloadTouch} onPress={onNetworkReload}>
                    <Text style={styles.reloadText}>重新加载</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Theme.navBarHeight + Theme.statusBarHeight,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.pageBackgroundColor,
    },
    errImage: {
        width: 50,
        height: 50
    },
    description: {
        marginTop: 20,
        color: '#cdcdcd',
        fontSize: FontSize(12),
    },
    reloadTouch: {
        backgroundColor: '#20ceca',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 17,
        marginTop: 20,
    },
    reloadText: {
        color: '#fff',
        fontSize: FontSize(14),
    },
});

export default NetworkError