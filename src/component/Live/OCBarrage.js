'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types'

const OCBarrageViewManager = NativeModules.OCBarrageViewManager
const OCBarrageView = requireNativeComponent('OCBarrageView', OCBarrage)

class OCBarrage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.ocbarrageStart = false
        this._ocbarrageHandle = null
    }

    componentDidMount() {
        this.times = setTimeout(() => {

        }, 500);
    }

    componentWillUnmount() {
        clearTimeout(this.times)
    }

    senderOCBarrage = (text) => {
        if (text && text != '' && this.ocbarrageStart) {
            OCBarrageViewManager.addNormalBarrage(text, { textColor: 'red', fontSize: FontSize(15), }, this._ocbarrageHandle)
        } else {
            console.warn('弹幕不能为空或者空字符串')
        }
    }

    startRender = () => {
        if (!this.ocbarrageStart) {
            OCBarrageViewManager.start(this._ocbarrageHandle)
            this.ocbarrageStart = true
        }
    }

    stopRender = () => {
        if (this.ocbarrageStart) {
            OCBarrageViewManager.stop(this._ocbarrageHandle)
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
            <OCBarrageView
                ref={this._captureRef}
                style={style}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default OCBarrage