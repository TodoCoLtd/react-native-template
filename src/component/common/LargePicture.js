'use strict';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import { TransformView } from 'teaset';
import PropTypes from 'prop-types'
import ImageView from './ImageView';

class LargePicture extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes,
        style: ViewPropTypes.style,
        imageStyle: ViewPropTypes.style,
        minScale: PropTypes.number,
        maxScale: PropTypes.number,
    }

    static defaultProps = {
        ...Image.defaultProps,
    }

    _onPressShow = () => {
        const { source, minScale, maxScale } = this.props
        const content = (
            <View>
                <TransformView style={styles.transformView}
                    minScale={minScale}
                    maxScale={maxScale}
                    onPress={this._onPressHide}>
                    <ImageView
                        style={styles.largeImage}
                        useMaxImage={true}
                        source={source}
                        maxImageWidth={SCREEN_WIDTH}
                    />
                </TransformView>
            </View>
        )
        AlertManager.showPopView(content, { type: 'none', overlayOpacity: 1.0 })
    }

    _onPressHide = () => {
        AlertManager.hide()
    }

    render() {
        const { style, imageStyle, ...others } = this.props
        return (
            <TouchableOpacity style={style} onPress={this._onPressShow}>
                <Image style={imageStyle} {...others} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    transformView: {

    }
});

export default LargePicture