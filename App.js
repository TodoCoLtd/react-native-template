'use strict';
import React from 'react'
import './src/config/Global'
import { Provider } from 'mobx-react'
import stores from './src/store/index'
import Main from './src/page/Main'

class App extends React.PureComponent {

    render() {
        return (
            <Provider {...stores}>
                <Main />
            </Provider>
        );
    }
}

export default App;