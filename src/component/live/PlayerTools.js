'use strict';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Theme } from 'teaset';

class PlayerTools extends React.PureComponent {

    constructor(props) {
        super(props);
        this.isHidden = true
        this.opacity = new Animated.Value(0)
        this.state = { isPlay: true, isEnlarge: false }
    }

    startFadeAnimated = () => {
        let toValue = this.isHidden ? 1 : 0
        this.isHidden = !this.isHidden
        Animated.timing(this.opacity, {
            toValue: toValue,
            duration: 400,
        }).start()
    };

    _onPressLeft = () => {
        const { onPressLeft } = this.props
        const { isEnlarge } = this.state
        if (isEnlarge) {
            this.setState({ isEnlarge: false })
        }
        onPressLeft && onPressLeft()
    }

    _onPressfull = () => {
        this.startFadeAnimated()
    };

    _onPressPlay = () => {
        const { onPressPlay } = this.props
        const { isPlay } = this.state
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        this.setState({ isPlay: !isPlay })
        onPressPlay && onPressPlay()
    }

    _onPressVideo = () => {
        const { onPressVideo } = this.props
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        onPressVideo && onPressVideo()
    }

    _onPressDanMu = () => {
        const { onPressDanMu, isLandscape } = this.props
        if (!isLandscape) {
            return;
        }
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        onPressDanMu && onPressDanMu()
    }

    _onPressRefresh = () => {
        const { onPressRefresh } = this.props
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        onPressRefresh && onPressRefresh()
    }

    _onPressScale = () => {
        const { onPressScale } = this.props
        const { isEnlarge } = this.state
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        this.setState({ isEnlarge: !isEnlarge })
        onPressScale && onPressScale()
    }

    render() {
        const { style, isLandscape, showDanMu, roomNumbers, title } = this.props
        const { isPlay, isEnlarge } = this.state
        let source;
        if (isLandscape) {
            source = showDanMu ? Images.icon_danmu : Images.icon_danmu_no
        } else {
            source = null
        }
        return (
            <TouchableWithoutFeedback onPress={this._onPressfull}>
                <Animated.View style={[styles.container, style, { opacity: this.opacity }]}>
                    <NavTools onPressLeft={this._onPressLeft} title={title} />
                    <BottomTools
                        isEnlarge={isEnlarge}
                        onPress={this._onPressScale}
                        roomNumbers={roomNumbers}
                    />
                    <Tool
                        type={'弹幕'}
                        style={styles.danmuTool}
                        source={source}
                        onPress={this._onPressDanMu}
                    />
                    <Tool
                        type={'播放'}
                        style={styles.playTool}
                        source={isPlay ? Images.icon_bottom_pause : Images.icon_bottom_play}
                        onPress={this._onPressPlay}
                    />
                    <Tool
                        type={'视频'}
                        style={styles.videoTool}
                        onPress={this._onPressVideo}
                    />
                    <Tool
                        type={'刷新'}
                        style={styles.refreshTool}
                        source={Images.icon_live_refresh}
                        onPress={this._onPressRefresh}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

class NavTools extends React.PureComponent {

    render() {
        const { onPressLeft, title } = this.props
        return (
            <View style={styles.navContainer}>
                {/* <View style={styles.statusBar} /> */}
                <View style={styles.navContent}>
                    <TouchableOpacity style={styles.backTouch} onPress={onPressLeft}>
                        <Image resizeMode={'contain'} style={styles.backImage} source={Images.icon_nav_left} />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>{title}</Text>
                    <TouchableOpacity style={styles.rightTouch}>
                        <Image resizeMode={'contain'} style={styles.rightImage} source={Images.icon_more} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Tool extends React.PureComponent {

    render() {
        const { style, source, onPress } = this.props
        return (
            <TouchableOpacity style={style} onPress={onPress} >
                <Image resizeMode={'contain'} style={styles.toolImage} source={source} />
            </TouchableOpacity>
        );
    }
}

class BottomTools extends React.PureComponent {

    render() {
        const { onPress, isEnlarge, roomNumbers } = this.props
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomRightText}>{`观看人数：${roomNumbers}`}</Text>
                <TouchableOpacity style={styles.scaleTouch} onPress={onPress}>
                    <Image resizeMode={'contain'} style={styles.scaleImage} source={isEnlarge ? Images.icon_micrify : Images.icon_enlarge} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    navContainer: {
        height: Theme.themes.default.navBarContentHeight,
        // backgroundColor: 'blue',
    },
    navContent: {
        height: Theme.themes.default.navBarContentHeight,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navTitle: {
        fontSize: FontSize(16),
        color: '#fff'
    },
    backTouch: {
        width: 30,
        height: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backImage: {
        width: ScaleSize(55),
        height: ScaleSize(55),
        // backgroundColor: 'red',
    },
    rightTouch: {
        width: 30,
        height: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightImage: {
        width: ScaleSize(40),
        height: ScaleSize(35),
        // backgroundColor: 'red',
    },


    bottomContainer: {
        height: 30,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    bottomRightText: {
        fontSize: FontSize(12),
        color: '#fff',
        marginLeft: 20,
    },
    scaleTouch: {
        width: 30,
        height: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scaleImage: {
        width: ScaleSize(35),
        height: ScaleSize(35),
        // backgroundColor: 'red',
    },


    toolImage: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        // backgroundColor: 'red',
    },
    playTool: {
        position: 'absolute',
        bottom: 55,
        left: 20,
    },
    videoTool: {
        position: 'absolute',
        right: 15,
        bottom: 90
    },
    refreshTool: {
        position: 'absolute',
        right: 15,
        bottom: 55
    },
    danmuTool: {
        position: 'absolute',
        bottom: 90,
        left: 20,
    }
});

export default PlayerTools