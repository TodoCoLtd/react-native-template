'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
import DanmakuView from 'react-native-android-danmaku';
import PropTypes from 'prop-types'

const OCBarrageViewManager = NativeModules.OCBarrageViewManager
const OCBarrageView = requireNativeComponent('OCBarrageView', Barrage)

class Barrage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.ocbarrageStart = false
        this._ocbarrageHandle = null
    }

    componentDidMount() {
        this.times = setInterval(() => {
            // if (__ANDROID__) {
            //     this.ocbarrageRef.addDanmaku({ text: Math.random() + '', color: 'red', padding: 2, isLive: false, time: 2000, fontSize: FontSize(50) })
            // }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.times)
    }

    senderOCBarrage = (text) => {
        if (text && text != '' && this.ocbarrageStart) {
            if (__ANDROID__) {
                this.ocbarrageRef.addDanmaku({ text, color: 'red', padding: 2, isLive: false, time: 0, fontSize: FontSize(50) })
            } else {
                OCBarrageViewManager.addNormalBarrage(text, { textColor: 'red', fontSize: FontSize(15), }, this._ocbarrageHandle)
            }
        } else {
            console.warn('弹幕不能为空或者空字符串')
        }
    }

    startRender = () => {
        if (!this.ocbarrageStart) {
            if (__ANDROID__) {
                this.ocbarrageRef.resume()
                this.ocbarrageRef.show(); //显示弹幕
            } else {
                OCBarrageViewManager.start(this._ocbarrageHandle)
            }
            this.ocbarrageStart = true
        }
    }

    stopRender = () => {
        if (this.ocbarrageStart) {
            if (__ANDROID__) {
                this.ocbarrageRef.pause(); //暂停弹幕
                this.ocbarrageRef.hide(); //隐藏弹幕
            } else {
                OCBarrageViewManager.stop(this._ocbarrageHandle)
            }
            this.ocbarrageStart = false
        }
    }

    _captureRef = (v) => {
        if (v) {
            this.ocbarrageRef = v
            this._ocbarrageHandle = findNodeHandle(v)
        } else {
            this.ocbarrageRef = null
            this._ocbarrageHandle = null
        }
    }

    render() {
        const { style } = this.props
        return (
            __IOS__ ? (
                <OCBarrageView ref={this._captureRef} style={style} />
            ) : (<DanmakuView style={style} speed={1.2} maxLines={10} ref={this._captureRef} />)
        );
    }
}

const styles = StyleSheet.create({

});

export default Barrage