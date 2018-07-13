'use strict';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes, Dimensions, } from 'react-native';
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation';
import LivePlayer from './LivePlayer'
import PlayerTools from './PlayerTools'
import Content from './Content';
import Barrage from './Barrage';
import ChatManager from './chatGroup/ChatManager'
import ChatConstants from './chatGroup/Constants';
import GiftSender from './GiftSender';


class Liver extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func,
        playerStyle: ViewPropTypes.style,
        messages: PropTypes.array,
        giftData: PropTypes.object,
        anchor: PropTypes.object, // 主播信息
        roomNumbers: PropTypes.number, // 观看人数
        title: PropTypes.string, // 直播间名字
        onPressRecharge: PropTypes.func,
        onPressGift: PropTypes.func,
        onPressSend: PropTypes.func,
        onPressBack: PropTypes.func,
        onPressLike: PropTypes.func
    }

    static defaultProps = {
        messages: [],
        giftData: null,
    }

    constructor(props) {
        super(props);
        this.state = { landscapeStyle: null, isLandscape: false, showDanMu: true }
    }

    componentDidMount() {
        const { showDanMu } = this.state
        if (showDanMu) {
            this.barrageRef && this.barrageRef.startRender()
        }
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        const { isLandscape } = this.state
        if (isLandscape) {
            Orientation.lockToPortrait()
        }
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
            console.log('componentWillReceiveProps', msg)
        }
    }

    _orientationDidChange = (orientation) => {
        console.log(orientation)
        const { landscapeStyle } = this.props
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
        const { left, right, top, bottom } = Theme.screenInset
        let newWidth = 0, newHeight = 0
        if (__ANDROID__) {
            newWidth = SCREEN_HEIGHT
            newHeight = SCREEN_WIDTH
        } else {
            newWidth = SCREEN_HEIGHT
            newHeight = SCREEN_WIDTH
        }
        // 安卓减去状态栏的高度
        this.setState({
            landscapeStyle: { width: newWidth, height: newHeight },
            isLandscape: true
        })
        setTimeout(() => {
            console.log('w-h', newWidth, Theme.screenHeight)
        }, 500);
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
        const { onPressBack } = this.props
        const { isLandscape } = this.state
        if (isLandscape) {
            this._onPressScale()
        } else {
            onPressBack && onPressBack()
        }
    }

    _onPressScale = () => {
        const { playerStyle } = this.props
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscapeLeft()
                this.changeLandscapeLiveStyle()
            } else {
                this.setState({ landscapeStyle: null, isLandscape: false }, () => {
                    Orientation.lockToPortrait()
                })
            }
        });
    }

    biludPlayerStyle = () => {
        const { landscapeStyle, isLandscape } = this.state
        let livePlayerStyle, playerToolsStyle;
        if (landscapeStyle && isLandscape) {
            const iPhoneXOffset = Theme.isIPhoneX ? 34 : 0
            livePlayerStyle = {
                height: landscapeStyle.height,
                width: landscapeStyle.width - iPhoneXOffset
            }
            playerToolsStyle = { right: iPhoneXOffset }
        } else {
            livePlayerStyle = null
            playerToolsStyle = null
        }
        return { livePlayerStyle, playerToolsStyle }
    }

    _captureRef = (v) => {
        this.livePlayer = v
    }

    _captureBarrRef = (v) => {
        this.barrageRef = v
    }

    render() {
        const { style, playerStyle, source, messages, giftData, onPressRecharge, onPressGift, onPressSend, roomNumbers, title, anchor, onPressLike } = this.props
        const { landscapeStyle, isLandscape, showDanMu } = this.state
        const isLandscapeOffset = __IOS__ ? 20 : 0
        const { livePlayerStyle, playerToolsStyle } = this.biludPlayerStyle()
        return (
            <View style={[styles.container, style]}>
                <View style={[styles.statusBar, { height: isLandscape ? isLandscapeOffset : Theme.statusBarHeight }]} />
                <View style={[styles.playerContainer, landscapeStyle]}>
                    <LivePlayer
                        ref={this._captureRef}
                        style={[playerStyle, livePlayerStyle]}
                        source={source}
                    />
                    <Barrage
                        ref={this._captureBarrRef}
                        style={[styles.ocbarrage, playerToolsStyle]}
                    />
                    <PlayerTools
                        style={[styles.playerTools, playerToolsStyle]}
                        isLandscape={isLandscape}
                        showDanMu={showDanMu}
                        roomNumbers={roomNumbers}
                        title={title}
                        onPressPlay={this._onPressPlay}
                        onPressVideo={this._onPressVideo}
                        onPressRefresh={this._onPressRefresh}
                        onPressScale={this._onPressScale}
                        onPressLeft={this._onPressLeft}
                        onPressDanMu={this._onPressDanMu}
                    />
                </View>
                <Content
                    anchor={anchor}
                    messages={messages}
                    giftData={giftData}
                    onPressLike={onPressLike}
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
        overflow: 'hidden',
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
        // backgroundColor: 'blue',
    },
    playerContainer: {
        backgroundColor: '#000',
    },
});

export { Liver, ChatManager, ChatConstants, GiftSender } 