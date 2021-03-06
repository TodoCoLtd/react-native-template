'use strict';

const WebSocketUrl = 'ws://wmbchat.nididake.com:9502'

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
        const data = { ...params, type: 7, } // 注册的消息类型是7
        console.log('register', data)
        this.wsInstance.send(JSON.stringify(data))
    }

    sendMessage = (params) => {
        console.log('sendMessage', params)
        this.wsInstance.send(JSON.stringify(params))
    }

    onOpen = (event) => {
        console.log('onOpen', event)
        const { token } = this.chatParams
        // 打开后先发送注册的消息
        const register = { token }
        this.registerInfo(register)
    }

    onMessage = (event) => {
        console.log('onMessage', event)
        const { onChatMessage } = this.chatParams
        const jsonData = JSON.parse(event.data)
        onChatMessage && onChatMessage(jsonData)
    }

    onError = (event) => {
        console.log('onError', event)
    }

    onClose = (event) => {
        console.log('onClose', event)
    }

}

export default ChatManager