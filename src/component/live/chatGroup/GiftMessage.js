'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class GiftMessage extends React.PureComponent {

    render() {
        const { send_uname, gift_name, gift_url } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.userName}>
                    {send_uname}
                    <Text style={styles.mark}>
                        {` 赠送给主播 `}
                    </Text>
                    {gift_name}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginLeft: 6,
    },
    userName: {
        color: '#2E77E5',
        fontSize: FontSize(14),
    },
    mark: {
        color: '#151515',
        fontSize: FontSize(14),
    },
});

export default GiftMessage