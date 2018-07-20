'use strict';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import { configRouter, tabOptions } from './RouterTool';


import VideoPage from '../page/example/VideoPage';
import Chat from '../page/example/Chat';
import LivePage from '../page/example/LivePage';
import ListExample from '../page/example/ListExample'
import Example from '../page/example/Example'

const TabNavigator = createBottomTabNavigator({
    Example: {
        screen: Example, navigationOptions: tabOptions({
            title: 'Example',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
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
        initialRouteName: 'Example'
    });

const StackNavigator = createStackNavigator(configRouter({
    Tab: { screen: TabNavigator },
    VideoPage: { screen: VideoPage },
    Chat: { screen: Chat },
    LivePage: { screen: LivePage },
    ListExample: { screen: ListExample },
    Example: { screen: Example },
}), {
        initialRouteName: 'Tab',
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
