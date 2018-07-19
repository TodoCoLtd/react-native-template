'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types'
import HTML from 'react-native-render-html';
import ImageView from './ImageView'

class HTMLView extends React.PureComponent {

    static propTypes = {
        ...HTML.propTypes,
        imageStyle: ViewPropTypes.style,
        maxImageWidth: PropTypes.number,
    };

    static defaultProps = {
        ...HTML.defaultProps,
    };


    _renderImage = (htmlAttribs, children, convertedCSSStyles, passProps) => {
        if (htmlAttribs.src === undefined) {
            return null
        }
        const { imageStyle, maxImageWidth } = this.props
        return (
            <ImageView
                key={`html_image_${passProps.nodeIndex}`}
                style={imageStyle}
                useMaxImage={true}
                maxImageWidth={maxImageWidth}
                source={{ uri: htmlAttribs.src }}
            />
        )
    };

    render() {
        const { renderers, imageStyle, maxImageWidth, ...others } = this.props
        return (
            <HTML
                {...others}
                renderers={{
                    img: this._renderImage
                }}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default HTMLView