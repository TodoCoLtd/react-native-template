/*
 * @author: jiasong 
 * @creation time: 2018-07-15 13:18:22
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavigationBar from '../../component/common/NavigationBar';
import Container from '../../component/common/Container';
import SpinnerLoading from '../../component/common/SpinnerLoading';
import LargePicture from '../../component/common/LargePicture';
import { ListRow } from 'teaset';

class Example extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    _onNetworkReload = () => {
        const params = {
            title: '温馨提示',
            detail: '重新刷新网络',
            actions: [
                { title: '取消', titleStyle: { color: 'red' }, actionStyle: { backgroundColor: 'blue', }, onPress: () => { } },
                { title: '确定', titleStyle: { color: 'blue' }, actionStyle: { backgroundColor: 'red', }, onPress: () => { } }
            ]
        }
        AlertManager.show(params)
    }

    _onPressAlert = () => {
        const params = {
            title: '温馨提示',
            detail: '我是alert',
            actions: [
                { title: '取消', titleStyle: { color: 'red' }, actionStyle: { backgroundColor: 'blue', }, onPress: () => { } },
                { title: '确定', onPress: () => { } }
            ]
        }
        AlertManager.show(params)
    }

    _onPressAlertPop = () => {
        AlertManager.showPopView(<Text>showPopView</Text>, {})
    }

    _onPressActionsShow = () => {
        const params = {
            // title: '温馨提示',
            actions: [
                { title: '相机', titleStyle: { color: 'red' }, onPress: () => alert('相机') },
                { title: '打开相册', onPress: () => alert('打开相册') }
            ]
        }
        ActionsManager.show(params)
    }

    _onPressActionsShowShare = () => {
        ActionsManager.showShare((type) => {
            alert(type)
        })
    }

    _onPressActionsShowArea = () => {
        ActionsManager.showArea((data) => {
            alert(JSON.stringify(data))
        })
    }

    _onPressActionsShowShareModule = () => {
        const params = {
            type: 'link',
            url: '',
            title: '',
            text: '',
        }
        ActionsManager.showShareModule(params)
    }

    _onPressLargePicture = () => {

    }

    _onPressList = () => {
        RouterHelper.navigate('ListExample')
    }

    render() {
        return (
            <Container onNetworkReload={this._onNetworkReload}>
                <NavigationBar
                    title={'Example'}
                    rightView={null}
                    leftView={null}
                />
                <ScrollView>
                    <ListRow title={'Alert-show（通用弹窗）'} onPress={this._onPressAlert} />
                    <ListRow title={'Alert-popView（自定义弹窗）'} onPress={this._onPressAlertPop} />
                    <View style={styles.section} />
                    <ListRow title={'Actions-show'} onPress={this._onPressActionsShow} />
                    <ListRow title={'Actions-showShare'} onPress={this._onPressActionsShowShare} />
                    <ListRow title={'Actions-showArea'} onPress={this._onPressActionsShowArea} />
                    <ListRow title={'Actions-showShareModule'} onPress={this._onPressActionsShowShareModule} />
                    <ListRow title={'Actions-showShareModule'} onPress={this._onPressActionsShowShareModule} />
                    <View style={styles.section} />
                    <ListRow
                        title={'LargePicture (查看大图)'}
                        detail={
                            <LargePicture
                                style={{ width: 50, height: 50, backgroundColor: 'red', }}
                                source={Images.img_bg_navbar}
                            />
                        }
                        onPress={this._onPressLargePicture}
                    />
                    <ListRow title={'list-列表'} onPress={this._onPressList} />
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#e5e5e5',
        height: 10,
    }
});

export default Example