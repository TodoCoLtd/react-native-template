/*
 * @author: jiasong 
 * @creation time: 2018-07-20 15:19:29
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../../component/common/NavigationBar';
import Container from '../../component/common/Container';
import ListView from '../../component/list/ListView';

class ListExample extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { dataSource: [] }
        this.page = 1
    }

    componentDidMount() {
        this.requestDataSource(this.page)
    }

    requestDataSource = async () => {
        const limit = 10
        const result = await Services.get('https://cnodejs.org/api/v1/topics', { limit, page: this.page })
        if (result.success) {
            const { dataSource } = this.state
            let dataSourceTemp = []
            if (this.page === 1) {
                dataSourceTemp = result.data
            } else if (this.page > 1) {
                dataSourceTemp = dataSource.concat(result.data)
            }
            this.setState({ dataSource: dataSourceTemp })
        }
        this._listRef && this._listRef.stopRefresh()
        this._listRef && this._listRef.stopEndReached() // 是否加载完毕需要自行判断 
    }

    _onRefresh = (stopRefresh) => {
        this.page = 1
        this.requestDataSource()
    };

    _onEndReached = (stopEndReached) => {
        this.page++
        this.requestDataSource()
    };

    _renderItem = (info) => {
        const { item, index } = info
        return (
            <View style={styles.itemContainer}>
                <Text>{item.title}</Text>
            </View>
        )
    };

    _renderItemSeparator = () => {
        return (
            <View style={styles.sep} />
        )
    }

    _captureRef = (v) => {
        this._listRef = v
    };


    _keyExtractor = (item, index) => {
        return `${index}`
    }

    render() {
        const { dataSource } = this.state
        return (
            <Container>
                <NavigationBar title={'ListExample'} rightView={null} />
                <ListView
                    ref={this._captureRef}
                    initialRefresh={true}
                    enableLoadMore={true}
                    enableRefresh={true}
                    data={dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderItemSeparator}
                    onRefresh={this._onRefresh}
                    onEndReached={this._onEndReached}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 100,
        justifyContent: 'center',
    },
    sep: {
        height: 1,
        backgroundColor: '#000',
    }
});

export default ListExample