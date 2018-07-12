/*
 * @author: jiasong 
 * @creation time: 2018-06-26 08:57:08
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../component/Container';
// 直播
import { Liver, ChatManager, ChatConstants, GiftSender } from '../component/live/index';


class LivePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { messages: [], giftsData: [] }
        this.room_id = '2'
        this.user = {
            id: '1'
        }
        const url = 'ws://wmbchat.nididake.com:9501'
        const params = {
            webSocketUrl: url,
            user: {
                id: '1'
            },
            onChatMessage: this._onChatMessage,
        }
        this._chatManager = new ChatManager(params)
    }

    componentDidMount() {
        setTimeout(() => {
            // 进入房间
            this.enterRoom(true)
        }, 1000);
    }

    componentWillUnmount() {
        // 退出房间
        this.enterRoom(false)
    }


    _onPressRecharge = () => {
        const params = {
            title: '温馨提示',
            detail: '跳转到充值',
            actions: [
                { title: '确定', onPress: () => { } }
            ]
        }
        AlertManager.show(params)
    }

    _onPressGift = () => {
        ActionsManager.showPullView(<GiftSender onPressSend={this._onPressSendGift} />, { overlayOpacity: 0.02 })
    }

    _onPressSendGift = async () => {
        ActionsManager.hide()
        let url = 'http://liangcai.3todo.com/api/live/buy_gift'
        let result = await Services.post(url, { gift_code: 'gift_code_1', stream_id: 1, member_id: 1 })
        console.log(result)
    }

    _onPressSend = (text) => {
        const params = {
            eventName: ChatConstants.send_barrage,
            data: {
                message: text,
                send_uid: 1,
                room_id: "1"
            }
        }
        this._chatManager.sendMessage(params)
    }

    enterRoom = (enter) => {
        const params = {
            eventName: enter ? ChatConstants.enter_room : ChatConstants.quit_room, //退出:_quit_room
            data: {
                send_uid: this.user.id,
                room_id: this.room_id
            }
        }
        this._chatManager.sendMessage(params)
    }

    _onChatMessage = (event) => {
        const { data, eventName } = event
        const oldMessages = this.state.messages
        if (eventName === ChatConstants.send_barrage) {
            const newMessages = [{ ...data, type: 1 }] // 类型：消息
            this.setState({ messages: newMessages.concat(oldMessages) })
        } else if (eventName === ChatConstants.send_gift) {
            const oldGiftsData = this.state.messages
            const newMessages = [{ ...data, type: 2 }] // 类型：礼物
            this.setState({
                messages: newMessages.concat(oldMessages),
                giftData: { ...data, type: 2 }
            })
        } else {
            console.log('其他种类的消息')
        }
    }

    render() {
        const { messages, giftData } = this.state
        return (
            <Container>
                <Liver
                    style={{ flex: 1 }}
                    playerStyle={{ width: SCREEN_WIDTH, height: 220 }}
                    source={{ uri: 'rtmp://live.hkstv.hk.lxdns.com/live/hks' }}
                    messages={messages}
                    giftData={giftData}
                    onPressRecharge={this._onPressRecharge}
                    onPressGift={this._onPressGift}
                    onPressSend={this._onPressSend}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    ceshi: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    text: {
        color: '#fff'
    }
});

export default LivePage