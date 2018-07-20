'use strict';
import React from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import PropTypes from 'prop-types'

class HeaderLoading extends React.PureComponent {

    static propTypes = {
        isRefreshing: PropTypes.bool,
        onRefresh: PropTypes.func,
        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.any,
        refreshableTintColor: PropTypes.string,
        refreshableTitle: PropTypes.string,
    }

    static defaultProps = {
        isRefreshing: false,
        refreshableColors: ['green'],
        refreshableTitle: '  正在加载...',
    }

    render() {
        const { isRefreshing, onRefresh, ...others } = this.props;
        return (
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                {...others}
            />
        );
    }
}

export default HeaderLoading