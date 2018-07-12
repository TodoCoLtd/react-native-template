'use strict';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Images from '../../asset';
import { scaleSize } from '../../util/Tool';

class ToolContainer extends React.PureComponent {

    constructor(props) {
        super(props)
        this.inputText = ''
    }

    _onChangeText = (text) => {
        this.inputText = text
    }

    _onSubmitEditing = () => {
        const { onPressSend } = this.props
        onPressSend && onPressSend(this.inputText)
        this.inputText = ''
    }

    _captureRef = (v) => {
        this.inputRef = v
    }

    render() {
        const { onPressRecharge, onPressGift } = this.props
        return (
            <KeyboardAvoidingView behavior={__ANDROID__ ? 'height' : 'padding'} >
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.textInputImage} source={Images.icon_live_text} />
                        <TextInput
                            ref={this._captureRef}
                            style={styles.textInput}
                            placeholder={'说点什么呗~'}
                            blurOnSubmit={false}
                            onSubmitEditing={this._onSubmitEditing}
                            onChangeText={this._onChangeText}
                            underlineColorAndroid={'transparent'}
                            clearTextOnFocus={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.rechargeTouch} onPress={onPressRecharge}>
                        <Image style={styles.rechargeImage} source={Images.icon_bar_recharge} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.giftTouch} onPress={onPressGift}>
                        <Image style={styles.giftImage} source={Images.icon_bar_gift} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        marginHorizontal: 10,
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginLeft: 5,
    },
    textInputImage: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        backgroundColor: 'blue',
    },
    rechargeTouch: {
        marginRight: 10,
    },
    rechargeImage: {
        width: ScaleSize(60),
        height: ScaleSize(60),
        // backgroundColor: 'blue',
    },
    giftTouch: {
        marginRight: 10,
    },
    giftImage: {
        width: ScaleSize(60),
        height: ScaleSize(60),
        // backgroundColor: 'blue',
    },
});

export default ToolContainer