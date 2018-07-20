'use strict';
import React from 'react';
import { StyleSheet, Image, } from 'react-native';
import PropTypes from 'prop-types'
// import FastImage from 'react-native-fast-image' // 在安卓上有问题，等作者发布

class ImageView extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes,
        maxImageWidth: PropTypes.number,
        useMaxImage: PropTypes.bool, // 不用的话是普通Image
        useFastImage: PropTypes.bool // 使用原生桥接的缓存image 
    };

    static defaultProps = {
        ...Image.defaultProps,
        maxImageWidth: SCREEN_WIDTH,
        useFastImage: false,
        useMaxImage: false
    };

    constructor(props) {
        super(props);
        this.state = { imageSize: null }
        this.isUnmount = false
    };

    componentDidMount() {
        const { useFastImage, useMaxImage } = this.props
        if (!useFastImage && useMaxImage) {
            this._loadImage()
        }
    }

    componentWillUnmount() {
        this.isUnmount = true
    }

    _loadImage = () => {
        const { source } = this.props
        if (!source) {
            return
        }
        if (source.uri === undefined) {
            const { width, height } = Image.resolveAssetSource(source)
            if (!this.isUnmount) {
                this._setImageSize(width, height)
            }
        } else {
            Image.getSize(source.uri, (width, height) => {
                if (!this.isUnmount) {
                    this._setImageSize(width, height)
                }
            }, (error) => { })
        }
    }

    _setImageSize = (width, height) => {
        const { maxImageWidth } = this.props
        if (width >= maxImageWidth) {
            height = (maxImageWidth / width) * height
            width = maxImageWidth
        }
        this.setState({ imageSize: { width, height } })
    }

    _renderImage = () => {
        const { style, ...others } = this.props
        const { imageSize } = this.state
        return (
            <Image style={[style, imageSize]} {...others} />
        )
    };

    _renderFastImage = () => {
        return (
            // <FastImage {...this.props} />
            null
        )
    };

    render() {
        const { useFastImage } = this.props
        return (
            useFastImage ? this._renderFastImage() : this._renderImage()
        );
    }
}


const styles = StyleSheet.create({

});

export default ImageView;
