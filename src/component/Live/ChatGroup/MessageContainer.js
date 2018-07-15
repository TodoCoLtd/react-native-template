'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FlatListView from '../../common/FlatListView';
import Message from './Message';
import GiftMessage from './GiftMessage'

class MessageContainer extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);

    }

    scrollToTop = () => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ offset: 0, animated: true })
        }
    };

    _onRefresh = (stopRefresh) => {

    };

    _onEndReached = (stopEndReached) => {

    };

    _renderItem = (info) => {
        const { item, index } = info
        return (
            item.type === 1 ? <Message {...item} /> : <GiftMessage {...item} />
        )
    };

    _keyExtractor = (item, index) => {
        return `live_chat_${item.message_id}`
    };

    _captureRef = (v) => {
        this._flatListRef = v
    };

    render() {
        const { messages } = this.props
        return (
            <FlatListView
                ref={this._captureRef}
                style={styles.flatListView}
                contentContainerStyle={styles.contentContainerStyle}
                keyboardShouldPersistTaps={__IOS__ ? 'always' : 'handled'}
                inverted={true}
                initialRefresh={false}
                enableLoadMore={false}
                enableRefresh={false}
                data={messages}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                onEndReached={this._onEndReached}
            />
        );
    }
}

const styles = StyleSheet.create({
    flatListView: {
        flex: 1,
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },

});

export default MessageContainer