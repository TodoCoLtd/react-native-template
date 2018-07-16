//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewPropTypes, StatusBar } from 'react-native';
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation';
import VideoPlayer from './VideoPlayer';

import PlayerTools from './PlayerTools';

// create a component
class index extends React.PureComponent {

    static propTypes = {
        source: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.shape({ uri: PropTypes.string })]),
        videoStyle: ViewPropTypes.style,
        style: PropTypes.object,
        defaultPaused: PropTypes.bool,
        totalDuration: PropTypes.number
    }

    static defaultProps = {
        defaultPaused: false,
        totalDuration: 0
    }

    constructor(props) {
        super(props)
        this.state = { sliderValue: 0, landscapeStyle: null, isLandscape: false }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    _orientationDidChange = (orientation) => {
        console.log(orientation)
        if (orientation === 'LANDSCAPE') {
            // this.changeLandscapeVideoStyle(true)
            this._toolsRef.changeEnlarge(true)
        } else {
            // this.setState({ videoStyle: this.props.videoStyle })
            this._toolsRef.changeEnlarge(false)
        }
    }


    _onProgress = (currentDuration) => {
        this.setState({ sliderValue: currentDuration })
    }

    _end = () => {
        const { totalDuration } = this.props
        // 播放结束
        this.setState({ sliderValue: totalDuration })
        this._toolsRef.changePaused(true)
    }

    _onSlidingStart = (params) => {
        // 拖动开始，暂停播放
        this._videoPlayerRef.setPause(true)
    }

    _onSlidingComplete = (params) => {
        // 拖动结束，开始播放，更新状态
        this._videoPlayerRef.setSeek(parseFloat(params))
        this._videoPlayerRef.setPause(false)
        this._toolsRef.changePaused(false)
    }

    _onPressLeft = () => {
        this._videoPlayerRef.setPause()
    }

    _onPressRight = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscapeLeft()
                this.changeLandscapeVideoStyle()
            } else {
                Orientation.lockToPortrait()
                this.setState({ landscapeStyle: null, isLandscape: false })
            }
        });
    }

    changeLandscapeVideoStyle = () => {
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
            console.log('w-h', newWidth, newHeight)
        }, 500);
    }

    _captureRef = (v) => {
        this._videoPlayerRef = v
    }

    _captureToolsRef = (v) => {
        this._toolsRef = v
    }

    render() {
        const { source, style, videoStyle, onPressBack, defaultPaused, totalDuration } = this.props
        const { landscapeStyle, isLandscape } = this.state
        const isLandscapeOffset = __IOS__ ? 20 : 0
        return (
            <View style={style}>
                <StatusBar hidden={isLandscape} />
                <View style={[styles.statusBar, { height: isLandscape ? isLandscapeOffset : Theme.statusBarHeight }]} />
                <View style={[styles.playerContainer, landscapeStyle]}>
                    <VideoPlayer
                        ref={this._captureRef}
                        source={source}
                        style={[videoStyle, landscapeStyle]}
                        onProgress={this._onProgress}
                        onEnd={this._end}
                        defaultPaused={defaultPaused}
                    />
                    <PlayerTools
                        style={styles.playerTools}
                        ref={this._captureToolsRef}
                        currentDuration={Math.ceil(this.state.sliderValue)}
                        totalDuration={totalDuration}
                        defaultPaused={defaultPaused}
                        defaultEnlarge={false}
                        onPressLeft={this._onPressLeft}
                        onPressRight={this._onPressRight}
                        debugTouchArea={true}
                        sliderStyle={styles.sliderContainer}
                        step={0.1}
                        value={this.state.sliderValue}
                        minimumValue={0}
                        maximumValue={totalDuration}
                        onSlidingStart={this._onSlidingStart}
                        onSlidingComplete={this._onSlidingComplete}
                        onPressBack={onPressBack}
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    sliderContainer: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 40,
        // right: 60,
        flex: 1,
        // backgroundColor: 'red',
        height: 15
    },
    statusBar: {
        backgroundColor: '#000',
    },
    playerContainer: {
        backgroundColor: '#000',
    },
    playerTools: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'red',
    }
});

//make this component available to the app
export default index;
