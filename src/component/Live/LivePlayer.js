'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
import KSYVideo from 'react-native-ksyvideo'
import PropTypes from 'prop-types'

const LivePlayerManager = NativeModules.LivePlayerManager
const LivePlayer = requireNativeComponent('LivePlayer', LivePlayerComponent)

class LivePlayerComponent extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.isPlaying = true
        this._liverHandle = null
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        LivePlayerManager.releasePlayer(this._liverHandle)
    }

    // 播放或者暂停
    pauseResume = () => {
        if (this.isPlaying) {
            LivePlayerManager.pause(this._liverHandle)
        } else {
            LivePlayerManager.resume(this._liverHandle)
        }
        this.isPlaying = !this.isPlaying
    }

    replay = () => {
        LivePlayerManager.replay(this._liverHandle)
        this.isPlaying = true
    }

    _onLiveLoadStart = () => {
        console.log('_onLiveLoadStart')
        LivePlayerManager.start(this._liverHandle)
    }

    _captureRef = (v) => {
        if (v) {
            this.livePlayerRef = v
            this._liverHandle = findNodeHandle(v)
        } else {
            this.livePlayerRef = null
            this._liverHandle = null
        }
    }

    render() {
        const { source, style } = this.props
        console.log('LivePlayer')
        return (
            <LivePlayer
                ref={this._captureRef}
                style={style}
                source={source}
                onLiveLoadStart={this._onLiveLoadStart}
            />
        );
    }
}


class LivePlayerAndroid extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = { isPlaying: false }
        this._liverHandle = null
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

    }


    // 播放或者暂停
    pauseResume = () => {
        const { isPlaying } = this.state
        if (isPlaying) {
            this.setState({ isPlaying: false })
        } else {
            this.setState({ isPlaying: true })
        }
    }

    replay = () => {
        this.setState({ isPlaying: false }, () => {
            // this.setState({ isPlaying: true })
        })
        setTimeout(() => {
            this.setState({ isPlaying: true })
        }, 200);
        // const { source } = this.props
        // let newSource = {
        //     uri: `${source.uri}?random=${Math.random()}`
        // }
        // this.setState({ source: newSource })
    }

    _onLiveLoadStart = () => {
        console.log('_onLiveLoadStart')
        this.setState({ isPlaying: true })
    }

    _captureRef = (v) => {
        if (v) {
            this.livePlayerRef = v
            this._liverHandle = findNodeHandle(v)
        } else {
            this.livePlayerRef = null
            this._liverHandle = null
        }
    }

    render() {
        const { style, source } = this.props
        const { isPlaying } = this.state
        return (
            <KSYVideo
                style={style}
                source={source}   // Can be a URL or a local file.
                ref={this._captureRef}                                      // Store reference
                volume={1.0}
                muted={false}
                paused={!isPlaying}                          // Pauses playback entirely.
                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                repeat={false}                           // Repeat forever.
                playInBackground={false}                // Audio continues to play when app entering background.
                onLoadStart={this._onLiveLoadStart}            // Callback when video starts to load
            />
        );
    }
}


const styles = StyleSheet.create({

});

export default __IOS__ ? LivePlayerComponent : LivePlayerAndroid