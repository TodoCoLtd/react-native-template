
'use strict'
import React from 'react'
import { Image } from 'react-native';
import RouteHelper from './RouteHelper'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const tabOptions = (params) => {
    return {
        title: params.title,
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                resizeMode="contain"
                style={{ width: ScaleSize(80), height: ScaleSize(80) }}
                source={!focused ? params.normalIcon : params.selectedIcon}
            />
        )
    }
};

export const configRouter = (routeConfig) => {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = createNavigationContainer(Component)
    }
    return routeConfig
}

// 高阶组件
export const createNavigationContainer = (OldComponent) => {
    class NewComponent extends React.PureComponent {

        static displayName = `addToRouteStack(${OldComponent.displayName ||
            OldComponent.name})`;

        componentDidMount() {
            console.log('componentDidMount')
            requestAnimationFrame(() => {
                console.log('componentDidMount--requestAnimationFrame')

            })
            InteractionManager.runAfterInteractions(() => {
                console.log('addToRouteStackcomponentDidMount--runAfterInteractions')
                RouteHelper.addStack(this.props.navigation);
                this.subscriptions = [
                    this.props.navigation.addListener('willBlur', (payload) => {
                        console.log('willBlur')
                        this.oldComponent && this.oldComponent.componentWillBlur && this.oldComponent.componentWillBlur(payload)
                    }),
                    this.props.navigation.addListener('willFocus', (payload) => {
                        this.oldComponent && this.oldComponent.componentWillFocus && this.oldComponent.componentWillFocus(payload)
                    }),
                    this.props.navigation.addListener('didFocus', (payload) => {
                        this.oldComponent && this.oldComponent.componentDidFocus && this.oldComponent.componentDidFocus(payload)
                    }),
                    this.props.navigation.addListener('didBlur', (payload) => {
                        console.log('didBlur')
                        console.log(this.props.navigation)
                        this.oldComponent && this.oldComponent.componentDidBlur && this.oldComponent.componentDidBlur(payload)
                    }),
                ]
            })
        }

        componentWillUnmount() {
            // console.log('componentWillUnmount', this)
            // 
            requestAnimationFrame(() => {
                this.subscriptions.forEach(sub => sub.remove());
                RouteHelper.remove(this.props.navigation);
            })
            // requestAnimationFrame(() => {
            //     console.log('componentWillUnmount--requestAnimationFrame', this)

            // })
            // InteractionManager.runAfterInteractions(() => {
            //     console.log('componentWillUnmount--runAfterInteractions', this)
            // })
        }

        _captureRef = (v) => {
            this.oldComponent = v
        }

        render() {
            return (
                <OldComponent
                    ref={this._captureRef}
                    {...this.props}
                // {...this.props.navigation.state.params}
                />
            )
        }
    }

    return hoistNonReactStatics(NewComponent, OldComponent)
};
