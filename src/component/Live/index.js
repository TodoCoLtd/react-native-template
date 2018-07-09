'use strict';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes, Dimensions, } from 'react-native';
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation';
import LivePlayer from './LivePlayer'
import PlayerTools from './PlayerTools'
import ToolContainer from './ToolContainer';
import Content from './Content';
import OCBarrage from './OCBarrage';

class Index extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func,
        messages: PropTypes.array,
        giftsData: PropTypes.array,
    }

    static defaultProps = {
        messages: [],
        giftsData: []
    }

    constructor(props) {
        super(props);
        const { playerStyle } = this.props
        this.state = { playerStyle, isLandscape: false }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const oldMessages = this.props.messages
        const newMessages = nextProps.messages
        const msg = newMessages[0]
        if (newMessages.length > oldMessages.length && msg.type === 1) {
            // 有新消息，发送弹幕
            const text = msg.message
            this.barrageRef.senderOCBarrage(text)
        }
    }

    _orientationDidChange = (orientation) => {
        console.log(orientation)
        const { playerStyle } = this.props
        if (orientation === 'LANDSCAPE') {
            // this.changeLandscapeLiveStyle()
            // this._toolsRef.changeEnlarge(true)
        } else {
            // this.setState({ playerStyle, isLandscape: false })
            // this._toolsRef.changeEnlarge(false)
        }
    }

    changeLandscapeLiveStyle = () => {
        const { playerStyle } = this.props
        setTimeout(() => {
            console.log(Theme.screenInset)
            const { left, right, top, bottom } = Theme.screenInset
            // 安卓减去状态栏的高度
            this.setState({
                playerStyle: [
                    playerStyle,
                    { width: Theme.screenWidth, height: Theme.screenHeight, }
                ],
                isLandscape: true
            })
            console.log(Theme.screenWidth, Theme.screenHeight)
        }, 200);
    }

    _onPressPlay = () => {
        this.livePlayer.pauseResume()
    }

    _onPressVideo = () => {
        // alert('播放视频')
    }

    _onPressRefresh = () => {
        this.livePlayer.replay()
    }

    _onPressScale = () => {
        const { playerStyle } = this.props
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscapeLeft()
                this.changeLandscapeLiveStyle()
            } else {
                Orientation.lockToPortrait()
                this.setState({ playerStyle, isLandscape: false })
            }
        });
    }

    _captureRef = (v) => {
        this.livePlayer = v
    }

    _captureBarrRef = (v) => {
        this.barrageRef = v
    }

    render() {
        const { style, source, messages, giftData, onPressRecharge, onPressGift, onPressSend } = this.props
        const { playerStyle, isLandscape } = this.state
        const { left, right, top, bottom } = Theme.screenInset
        console.log('render', isLandscape)
        return (
            <View style={[styles.container, style]}>
                <View style={[styles.statusBar, { height: isLandscape ? 20 : Theme.statusBarHeight }]} />
                <View style={playerStyle}>
                    <View style={[styles.playerContainer, playerStyle]}>
                        <LivePlayer
                            ref={this._captureRef}
                            style={playerStyle}
                            source={source}
                        />
                    </View>
                    <OCBarrage
                        ref={this._captureBarrRef}
                        style={styles.ocbarrage}
                    />
                    <PlayerTools
                        style={styles.playerTools}
                        onPressPlay={this._onPressPlay}
                        onPressVideo={this._onPressVideo}
                        onPressRefresh={this._onPressRefresh}
                        onPressScale={this._onPressScale}
                    />
                </View>
                <Content messages={messages} giftData={giftData} />
                <ToolContainer
                    onPressSend={onPressSend}
                    onPressRecharge={onPressRecharge}
                    onPressGift={onPressGift}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    statusBar: {
        backgroundColor: '#000',
    },
    playerTools: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    ocbarrage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    playerContainer: {
        backgroundColor: 'red',
    }
});

export default Index