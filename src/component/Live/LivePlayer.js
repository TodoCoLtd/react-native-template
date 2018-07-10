'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
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

const styles = StyleSheet.create({

});

export default LivePlayerComponent