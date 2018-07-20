'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types'

class LiverInfo extends React.PureComponent {

    static propTypes = {
        onClose: PropTypes.func,
        anchor: PropTypes.object
    }

    static defaultProps = {

    }


    constructor(props) {
        super(props)
        this.translateY = new Animated.Value(0)
    }

    startAnimatedTranslateY = () => {
        let toValue = -40;
        Animated.spring(this.translateY, {
            toValue,
            friction: 9
        }).start(() => {

        })
    }

    _onPressCollapse = () => {
        const { onClose } = this.props
        onClose && onClose()
    }

    render() {
        const { style, anchor } = this.props
        return (
            <Animated.View style={[styles.container, style, {
                transform: [{
                    translateY: this.translateY,
                }]
            }]}>
                <Image style={styles.headerImage} />
                <View style={styles.userContainer}>
                    <Text style={styles.userName}>不2</Text>
                    <Text style={styles.linkeText}>关注数：100万</Text>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.likeTouch}>
                        <Text style={styles.likeText}>关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.collapseTouch} onPress={this._onPressCollapse}>
                        <Image style={styles.collapseImage} source={Images.icon_live_up} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        left: 0,
        right: 0,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: ScaleSize(65),
        height: ScaleSize(65),
        backgroundColor: 'red',
        marginLeft: 10,
    },
    userContainer: {
        marginLeft: 10,
    },
    userName: {
        color: '#000',
        fontSize: FontSize(14),
    },
    linkeText: {
        color: '#999999',
        fontSize: FontSize(12),
    },
    rightContainer: {
        position: 'absolute',
        flexDirection: 'row',
        right: 0,
    },
    likeTouch: {
        backgroundColor: '#01B9A0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 10,
    },
    likeText: {
        color: '#fff',
        fontSize: FontSize(12),
    },
    collapseTouch: {
        // paddingVertical: 20,
        // backgroundColor: 'blue',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    collapseImage: {
        width: ScaleSize(50),
        height: ScaleSize(50),
        // backgroundColor: 'red',
    },
});

export default LiverInfo