'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class Message extends React.PureComponent {


    render() {
        const { send_uname, message, send_head } = this.props
        return (
            <View style={styles.messageContainer}>
                <Image style={styles.messageImage1} />
                <Image style={styles.messageImage2} source={{ uri: 'send_head' }} />
                <Text style={styles.messageName}>{`${send_uname}：`}</Text>
                <Text style={styles.messageContent}>{message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginLeft: 5,
    },
    messageName: {
        color: '#2E77E5',
        fontSize: FontSize(14),
    },
    messageImage1: {

    },
    messageImage2: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    messageContent: {
        color: '#151515',
        fontSize: FontSize(14),
    }
});

export default Message