'use strict';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types'

class WrapView extends React.PureComponent {

    static propTypes = {
        style: ViewPropTypes.style,  // 最外层的样式
        wrapContainer: ViewPropTypes.style, // 
        data: PropTypes.array.isRequired,
        keyExtractor: PropTypes.func.isRequired,
        numColumns: PropTypes.number.isRequired,
        itemWidth: PropTypes.number.isRequired,
        renderItem: PropTypes.func.isRequired,
        itemColumnMargin: PropTypes.number, // 列间距
        itemRowMargin: PropTypes.number, // 行间距
        useFlatList: PropTypes.bool,  // 使用FlatList的横向布局模式
        exData: PropTypes.any
    }

    static defaultProps = {
        data: [],
        itemColumnMargin: 0,
        itemRowMargin: 0,
        useFlatList: false
    }

    constructor(props) {
        super(props);

    }

    renderContent = (props) => {
        const { data, keyExtractor, wrapContainer, numColumns, itemWidth, itemColumnMargin, itemRowMargin, renderItem } = props
        const wrapWidth = itemWidth * numColumns + itemColumnMargin * (numColumns - 1)
        return (
            <View style={[styles.wrapContainer, wrapContainer, { width: wrapWidth }]} onLayout={this._onLayout}>
                {data.map((item, index) => {
                    const marginLeft = index % numColumns === 0 ? 0 : itemColumnMargin
                    const marginTop = index < numColumns ? 0 : itemRowMargin
                    const element = renderItem({ item, index });
                    const key = keyExtractor(item, index)
                    return React.cloneElement(element, {
                        key,
                        style: [element.props.style, {
                            width: itemWidth,
                            marginLeft,
                            marginTop,
                        }]
                    });
                })}
            </View>
        )
    }

    renderFlatList = (props) => {
        return (
            <FlatList
                {...props}
            />
        )
    }

    render() {
        const { style, useFlatList, ...others } = this.props
        return (
            <View style={style}>
                {useFlatList ? <this.renderFlatList {...others} /> : <this.renderContent {...others} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

export default WrapView