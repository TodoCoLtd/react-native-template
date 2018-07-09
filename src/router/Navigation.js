'use strict';
import React from 'react'
import { StackNavigator } from './RouterConfig'

// 高阶导航，继承PureComponent
class Navigation extends React.PureComponent {

    constructor(props) {
        super(props)

    }

    _captureRef = (v) => {
        this.navigatorRef = v
    }

    render() {
        return (
            <StackNavigator ref={this._captureRef} />
        );
    }
}

export default Navigation;
