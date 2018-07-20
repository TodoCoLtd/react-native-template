'use strict';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'

class FooterLoding extends React.PureComponent {

    static propTypes = {
        loading: PropTypes.bool,
        allLoad: PropTypes.bool,// 是否加载完毕
    };

    static defaultProps = {
        loading: false,
        allLoad: false
    };

    renderIndicator = () => {
        const { loading } = this.props;
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    animating={loading}
                    size="small"
                    hidesWhenStopped={true}
                />
                <Text style={styles.footerText}>正在加载...</Text>
            </View>
        )
    }

    renderAllLoad = () => {
        return (
            <Text style={styles.footerText}>没有更多数据</Text>
        )
    }

    render() {
        const { loading, allLoad } = this.props;
        if (!loading && allLoad) {
            return this.renderAllLoad()
        } else if (loading) {
            return this.renderIndicator()
        }
        console.log('footer', 'null')
        return null
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    footerText: {
        marginLeft: 10,
        height: 30,
        lineHeight: 30,
        fontSize: FontSize(13),
        color: '#999999',
    },
});

export default FooterLoding