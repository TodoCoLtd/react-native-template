'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageContainer from './MessageContainer'

class ChatGroup extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props)

    }


    render() {
        const { messages } = this.props
        return (
            <View style={styles.container}>
                <MessageContainer
                    messages={messages}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ChatGroup