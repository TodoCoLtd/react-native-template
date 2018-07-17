'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

class VerificationCode extends React.PureComponent {

    static propTypes = {
        interval: PropTypes.number,
        open: PropTypes.bool,
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
                            <Text style={styles.codeText}>| 获取验证码</Text>
                        </TouchableOpacity>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: ScaleSize(55),
        width: ScaleSize(200),
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        color: '#1BB77A',
        fontSize: FontSize(14),
    },
    codeContainer: {


    },
    countdownText: {
        color: '#fff',
        fontSize: FontSize(14),
    },
    countdownTextContainer: {
        position: 'absolute',
        backgroundColor: '#1BB77A',
        width: ScaleSize(130),
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 5,
    }
});

export default VerificationCode