'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules } from 'react-native';
import PropTypes from 'prop-types'

const OCBarrageViewManager = NativeModules.OCBarrageViewManager
const OCBarrageView = requireNativeComponent('OCBarrageView', OCBarrage)

class OCBarrage extends React.PureComponent {

    componentDidMount() {
        setTimeout(() => {
            OCBarrageViewManager.start()
        }, 500);
    }

    senderOCBarrage = (text) => {
        if (text && text != '') {
            OCBarrageViewManager.addNormalBarrage(text, { textColor: 'red', fontSize: FontSize(15), })
        } else {
            console.warn('弹幕不能为空或者空字符串')
        }
    }

    render() {
        const { style } = this.props
        return (
            <OCBarrageView
                style={style}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default OCBarrage