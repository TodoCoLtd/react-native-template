'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types'

class EmptyView extends React.PureComponent {

    static propTypes = {

    };
    static defaultProps = {

    };

    render() {

        return (
            <View style={styles.emptyContainer}>
                <Image style={styles.emptyImage} source={Images.icon_no_record} />
                <Text style={styles.emptyText}>暂无数据</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: ScaleSize(700),
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: ScaleSize(10),
        color: '#cdcdcd',
        fontSize: FontSize(13),
    },
    emptyImage: {
        width: ScaleSize(80),
        height: ScaleSize(80)
    }
});

export default EmptyView