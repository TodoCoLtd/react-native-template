'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Countdown from './Countdown';
import PropTypes from 'prop-types'

class VerificationCode extends React.PureComponent {

    static propTypes = {
        interval: PropTypes.number,
        open: PropTypes.bool,
        onStopInterval: PropTypes.func,
    }

    static defaultProps = {
        interval: 60,
        open: false,
    }

    constructor(props) {
        super(props)
        const { interval } = props
        this.state = { intervalNumber: interval }
    }

    componentWillUnmount() {
        // 必须调用
        this.stopInterval()
    }

    componentWillReceiveProps(nextPorps) {
        const oldOpen = this.props.open
        if (nextPorps.open != oldOpen && nextPorps.open) {
            this.startInterval()
        }
    }

    _onPress = () => {
        const { onPress } = this.props
        onPress && onPress()
    }

    startInterval = () => {
        const { interval, onStopInterval } = this.props
        this.interval = setInterval(() => {
            const { intervalNumber } = this.state
            if (intervalNumber === 0) {
                this.stopInterval()
                this.setState({ intervalNumber: interval })
                onStopInterval && onStopInterval()
            } else {
                this.setState({ intervalNumber: intervalNumber - 1 })
            }
        }, 1000)
    }

    stopInterval = () => {
        clearInterval(this.interval)
    }

    render() {
        const { open } = this.props
        const { intervalNumber } = this.state
        return (
            <View style={styles.container}>
                {open ? (
                    <View style={styles.countdownTextContainer}>
                        <Text style={styles.countdownText}>{`${intervalNumber}s`}</Text>
                    </View>) : (
                        <TouchableOpacity style={styles.codeContainer} onPress={this._onPress}>
                            <Text style={styles.codeText}>获取验证码</Text>
                        </TouchableOpacity>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // height: ScaleSize(55),
        // width: ScaleSize(200),
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'red',
    },
    codeText: {
        color: '#43a4fe',
        fontSize: FontSize(13),
    },
    codeContainer: {
        borderRadius: 14,
        backgroundColor: "#e6f0ff",
        paddingHorizontal: 13,
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownText: {
        color: '#418bf2',
        fontSize: FontSize(14),
    },
    countdownTextContainer: {
        position: 'absolute',
        backgroundColor: '#43a4fe',
        width: ScaleSize(130),
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 5,
    }
});

export default VerificationCode