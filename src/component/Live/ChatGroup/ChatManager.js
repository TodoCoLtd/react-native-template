'use strict';
import Constants from './Constants';
const WebSocketUrl = 'ws://wmbchat.nididake.com:9501'

class ChatManager {

    // params = {
    //     token:'',
    //     webSocketUrl:'',
    //     onChatMessage:()=>{}
    // }
    constructor(params) {
        this.wsInstance = null
        this.chatParams = params
        this.createWebSocket(params)
    }

    createWebSocket = (params) => {
        if (this.wsInstance) {
            this.wsInstance = null
        }
        const webSocketUrl = params.webSocketUrl
        console.log(this.chatParams)
        this.wsInstance = new WebSocket(webSocketUrl);
        this.wsInstance.onopen = this.onOpen
        this.wsInstance.onmessage = this.onMessage
        this.wsInstance.onerror = this.onError
        this.wsInstance.onclose = this.onClose
    }

    closeWebSocket = () => {
        this.wsInstance.close();
        this.wsInstance = null
    }


    registerInfo = (params) => {
        const { user } = this.chatParams
        const info = {
            eventName: Constants.register,
            data: {
                send_uid: user.id
            }
        }
        console.log('register', info)
        this.wsInstance.send(JSON.stringify(info))
    }

    sendMessage = (params) => {
        console.log('sendMessage', params)
        this.wsInstance.send(JSON.stringify(params))
    }

    onOpen = (event) => {
        console.log('onOpen', event)
        // 打开后先发送注册的消息
        const register = { token: this.chatParams.token }
        this.registerInfo(register)
    }

    onMessage = (event) => {
        const jsonData = JSON.parse(event.data)
        console.log('onMessage', jsonData)
        this.chatParams.onChatMessage && this.chatParams.onChatMessage(jsonData)
    }

    onError = (event) => {
        console.log('onError', event)
    }

    onClose = (event) => {
        console.log('onClose', event)
    }

}

export default ChatManager