/*
 * @author: jiasong 
 * @creation time: 2018-07-05 11:08:40
 */

'use strict';
import React from 'react';
import { View, StyleSheet, NetInfo } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';
import JPushModule from 'jpush-react-native'
import Navigation from '../router/Navigation';
import { getDeviceInfo } from '../util/Tool';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
class Main extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this._handleLoginState() // 处理登陆状态
        this._addNetworkListener() // 网络状态
        this._receiveDeviceInfo() // 设备信息
        this._handlePushListener(); // 通知
    }

    componentWillUnmount() {
        this._removeNetworkListener()
        this._removePushListener()
    };

    _handleLoginState = () => {
        SplashScreen.hide()
    };

    _addNetworkListener = () => {
        const { appStore } = this.props
        NetInfo.addEventListener('connectionChange', ({ type, effectiveType }) => {
            console.log('connectionInfo-->', type, effectiveType)
            appStore.changeNetworkState(type)
        });
    };

    _removeNetworkListener = () => {
        NetInfo.removeEventListener('connectionChange', () => { });
    };

    _receiveDeviceInfo = async () => {
        const { appStore } = this.props
        const info = getDeviceInfo()
        // const ip = await DeviceInfo.getIPAddress() ios上不可用，有可能是私有方法
        const batteryLevel = await DeviceInfo.getBatteryLevel() // 电池的电量，模拟器返回-1
        appStore.setDeviceInfo({ ...info, batteryLevel })
        console.log(info, batteryLevel)
    };

    _handlePushListener = () => {
        JPushModule.initPush()
        if (__ANDROID__) {
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        }
        JPushModule.addReceiveCustomMsgListener(map => {
            // 自定义消息
            console.log('extras: ' + map.extras)
        })

        JPushModule.addReceiveNotificationListener(map => {
            // 接收推送事件
            console.log('alertContent: ' + map.alertContent)
            console.log('extras: ' + map.extras)
        })

        JPushModule.addReceiveOpenNotificationListener(map => {
            // 点击推送事件
            console.log('Opening notification!')
            console.log('map.extra: ' + map.extras)
        })

        JPushModule.addGetRegistrationIdListener(registrationId => {
            // 设备注册成功
            console.log('Device register succeed, registrationId ' + registrationId)
        })
    }

    _removePushListener = () => {
        JPushModule.removeReceiveCustomMsgListener()
        JPushModule.removeReceiveNotificationListener()
        JPushModule.removeReceiveOpenNotificationListener()
        JPushModule.removeGetRegistrationIdListener()
        JPushModule.clearAllNotifications()
    }

    render() {
        return (
            <View style={styles.container} >
                <Navigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Main