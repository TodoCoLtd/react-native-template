'use strict';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { configRouter, tabOptions } from './RouterTool';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import Home from '../page/Home'
import Mine from '../page/Mine'
import Setting from '../page/Setting'
import LoginAndRegistered from '../page/login/LoginAndRegistered'
import RecoverPwd from '../page/login/RecoverPwd'
import VideoPage from '../page/VideoPage';
import Chat from '../page/Chat';
import LivePage from '../page/LivePage';


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home, navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Mine: {
        screen: Mine, navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
}, {
        tabBarOptions: {
            showIcon: true,
            indicatorStyle: { height: 0 },
            activeTintColor: "#0085da",
            style: {
                backgroundColor: "#fff"
            },
            tabStyle: {
                margin: 2,
            },
        },
        lazy: true, //懒加载
        swipeEnabled: false,
        animationEnabled: false, //关闭安卓底栏动画
        tabBarPosition: "bottom",
        // tabBarComponent: (props) => <TabBarBottom {...props} />,
        initialRouteName: 'Home'
    });

const StackNavigator = createStackNavigator(configRouter({
    Tab: { screen: TabNavigator },
    Mine: { screen: Mine },
    Setting: { screen: Setting },
    LoginAndRegistered: { screen: LoginAndRegistered },
    RecoverPwd: { screen: RecoverPwd },
    VideoPage: { screen: VideoPage },
    Chat: { screen: Chat },
    LivePage: { screen: LivePage },
}), {
        initialRouteName: 'Chat',
        cardStyle: {
            shadowOpacity: 0,
            shadowRadius: 0,
            backgroundColor: Theme.pageBackgroundColor,
        },
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        },
        transitionConfig: () => {
            return {
                screenInterpolator: (sceneProps) => {
                    return StackViewStyleInterpolator.forHorizontal(sceneProps)
                },
                // containerStyle: {
                //     backgroundColor: 'black',
                // }
            }
        }
    });

export { StackNavigator } 
