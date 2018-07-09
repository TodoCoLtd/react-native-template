'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import WrapView from '../WrapView';

class GiftSender extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { selectIndex: 0 }
        this.data = [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]
    }

    _onPress = (index) => {
        const { selectIndex } = this.state
        if (index != selectIndex) {
            this.setState({ selectIndex: index })
        }
    }

    _onPressSend = () => {
        const { onPressSend } = this.props
        onPressSend && onPressSend()
    }

    _renderItem = (info) => {
        const { item, index } = info
        const { selectIndex } = this.state
        const backgroundColor = selectIndex === index ? '#f2f2f2' : '#fff'
        // console.log('backgroundColor', selectIndex, index)
        return (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor }]} onPress={() => this._onPress(index)}>
                <Image style={styles.itemImage} />
                <Text style={styles.itemName}>123</Text>
                <Text style={styles.itemMoney}>321</Text>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => {
        return `${index}`
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>礼物</Text>
                <WrapView
                    style={styles.wrapView}
                    data={this.data}
                    keyExtractor={this._keyExtractor}
                    numColumns={4}
                    itemRowMargin={5}
                    itemWidth={SCREEN_WIDTH / 4}
                    renderItem={this._renderItem}
                    exData={this.state.selectIndex}
                />
                <View style={styles.toolContainer}>
                    <View style={styles.giftCon}>
                        <Image style={styles.ballImage} />
                        <Text style={styles.ballText}>12200</Text>
                    </View>
                    <TouchableOpacity style={styles.sendTouch} onPress={this._onPressSend}>
                        <Text style={styles.sendText}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    title: {
        color: '#00B29A',
        fontSize: FontSize(14),
        marginVertical: 10,
        marginLeft: 10,
    },
    wrapView: {
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8',
        paddingVertical: 5,
        // backgroundColor: 'green',
    },
    itemContainer: {
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        // backgroundColor: 'green',
    },
    itemImage: {
        width: ScaleSize(100),
        height: ScaleSize(100),
        backgroundColor: 'blue',
    },
    itemName: {
        color: '#333',
        fontSize: FontSize(12),
    },
    itemMoney: {
        color: '#008B44',
        fontSize: FontSize(10),
    },
    toolContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8',
    },
    giftCon: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    ballImage: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        backgroundColor: 'red',
        borderRadius: ScaleSize(15),
    },
    ballText: {
        color: '#008B44',
        fontSize: FontSize(14),
        marginLeft: 5,
    },
    sendTouch: {
        paddingHorizontal: 27,
        paddingVertical: 10,
        backgroundColor: '#01B9A0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendText: {
        color: '#fff',
        fontSize: FontSize(14),
    },
});

export default GiftSender