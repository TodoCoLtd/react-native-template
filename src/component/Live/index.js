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
import ChatManager from './ChatGroup/ChatManager'
import ChatConstants from './ChatGroup/Constants';
import GiftSender from './GiftSender';


class Liver extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func,
        messages: PropTypes.array,
        giftsData: PropTypes.array,
    }

    static defaultProps = {
        messages: [],
        giftsData: [],
    }

    constructor(props) {
        super(props);
        const { playerStyle } = this.props
        this.state = { playerStyle, isLandscape: false, showDanMu: true }
    }

    componentDidMount() {
        const { showDanMu } = this.state
        if (showDanMu) {
            this.barrageRef && this.barrageRef.startRender()
        }
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    componentWillReceiveProps(nextProps) {
        const { isLandscape, showDanMu } = this.state
        const oldMessages = this.props.messages
        const newMessages = nextProps.messages
        const msg = newMessages[0]
        if (newMessages.length > oldMessages.length && msg.type === 1 && isLandscape && showDanMu) {
            // 有新消息，发送弹幕
            const text = msg.message
            this.barrageRef.senderOCBarrage(text)
            console.log('componentWillReceiveProps')
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

    _onPressDanMu = () => {
        const { isLandscape, showDanMu } = this.state
        if (!isLandscape) {
            return
        }
        if (showDanMu) {
            this.barrageRef.stopRender()
            this.setState({ showDanMu: false })
        } else {
            this.barrageRef.startRender()
            this.setState({ showDanMu: true })
        }
    }

    _onPressRefresh = () => {
        this.livePlayer.replay()
    }

    _onPressLeft = () => {
        const { isLandscape } = this.state
        if (isLandscape) {
            this._onPressScale()
        } else {
            alert('返回')
        }
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
        const { playerStyle, isLandscape, showDanMu } = this.state
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
                        isLandscape={isLandscape}
                        showDanMu={showDanMu}
                        onPressPlay={this._onPressPlay}
                        onPressVideo={this._onPressVideo}
                        onPressRefresh={this._onPressRefresh}
                        onPressScale={this._onPressScale}
                        onPressLeft={this._onPressLeft}
                        onPressDanMu={this._onPressDanMu}
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
        backgroundColor: 'red'
    }
});

export { Liver, ChatManager, ChatConstants, GiftSender } 