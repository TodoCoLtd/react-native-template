'use strict';
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import PropTypes from 'prop-types'
import HeaderLoading from './HeaderLoading';
import FooterLoding from './FooterLoding'
import EmptyView from './EmptyView';

// 上拉刷新的状态
const EndReachedStatus = {
    FIRST_LOADED: 'FIRST_LOADED', // 第一次加载
    START_LOADED: 'START_LOADED',  // 已经开始刷新
    WAITING_LOADING: 'WAITING_LOADING',  // 等待着刷新
    ALL_LOADED: 'ALL_LOADED',
};

class ListView extends React.PureComponent {

    static propTypes = {
        listType: PropTypes.oneOf(['FlatList', 'SectionList']),

        initialNumToRender: PropTypes.number,
        initialRefresh: PropTypes.bool,//列表初始化时是否显示刷新按钮,请求数据结束后需要手动调用stopRefresh方法
        enableLoadMore: PropTypes.bool, //是否能上拉加载
        enableRefresh: PropTypes.bool, //是否能下拉刷新

        onRefresh: PropTypes.func,
        onEndReached: PropTypes.func,

        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.any,
        refreshableTintColor: PropTypes.string,
        refreshableTitle: PropTypes.string,

    };

    static defaultProps = {
        listType: 'FlatList',
        initialNumToRender: 8,
        initialRefresh: true,
        enableRefresh: true,
        enableLoadMore: true,

        refreshableColors: ['green'],
        refreshableTitle: '  正在加载...',
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: props.initialRefresh,
            isEndReached: false,
        };
        if (__IOS__) {
            // 解决列表初始化时显示刷新按钮导致的bug
            // this._currentEndReachedStatus = props.data.length === 0 && props.initialRefresh ? EndReachedStatus.FIRST_LOADED : EndReachedStatus.WAITING_LOADING;
            this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
        } else {
            this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
        }
        this._currentContentSize = { contentWidth: 0, contentHeight: 0 }
        this._currentListSize = { width: 0, height: 0 }
        this._currentContentOffset = { x: 0, y: 0 }
    };

    componentWillUnmount() {
        clearTimeout(this.refreshTime)
        clearTimeout(this.endReachedTime)
    }

    setNativeProps(props) {
        if (this._listRef) {
            this._listRef.setNativeProps(props);
        }
    };

    scrollToLocation = (option = { animated: true, itemIndex: 0, sectionIndex: 0, viewOffset: 0, viewPosition: 0 }) => {
        const { listType } = this.props
        if (listType === 'SectionList' && this._listRef) {
            this._listRef.scrollToLocation(option)
        }
    };

    scrollToOffset = (option = { offset: 0, animated: true }) => {
        if (this._listRef) {
            this._listRef.scrollToOffset(option)
        }
    };

    scrollToIndex = (option = { animated: true, index: 0, viewOffset: 0, viewPosition: 0 }) => {
        if (this._listRef) {
            this._listRef.scrollToIndex(option)
        }
    };

    scrollToItem = (option = { animated: true, item: 0, viewPosition: 0 }) => {
        if (this._listRef) {
            this._listRef.scrollToItem(option)
        }
    };

    scrollToEnd = (option = { animated: true }) => {
        if (this._listRef) {
            this._listRef.scrollToEnd(option)
        }
    };

    flashScrollIndicators = () => {
        if (this._listRef) {
            this._listRef.flashScrollIndicators();
        }
    };

    get scrollResponder() {
        if (this._listRef) {
            return this._listRef.getScrollResponder();
        }
        return null
    };

    get scrollableNode() {
        if (this._listRef) {
            return this._listRef.getScrollableNode();
        }
        return null
    };

    get listResponder() {
        if (this._listRef) {
            return this._listRef
        }
        return null
    };

    get contentSize() {
        return this._currentContentSize
    };

    get contentOffset() {
        return this._currentContentOffset
    };

    _onRefresh = () => {
        this.startRefresh();
        this.props.onRefresh && this.props.onRefresh(this.stopRefresh)
    };

    startRefresh = () => {
        if (!this.state.isRefreshing) {
            console.log('startRefresh')
            if (this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED) {
                this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
            }
            this.setState({ isRefreshing: true });
        }
    };

    stopRefresh = () => {
        if (this.state.isRefreshing) {
            this.refreshTime = setTimeout(() => {
                this.setState({ isRefreshing: false });
            }, 200); // 解决下拉刷新请求过快，导致的bug
        }
    };

    _onEndReached = (params) => {
        const { data, enableLoadMore } = this.props;
        const { isRefreshing, isEndReached } = this.state;
        // 统一解决_onEndReached回调不正确的Bug,以下条件满足之一都不会触发startEndReached，
        // 都不满足时进入下一个条件判断
        // 注意：以下每个判断条件的顺序要一致，不能随意更换
        // 解决如果列表一开始显示刷新按钮,_onEndReached回调不正确的Bug
        if (!enableLoadMore || this._currentEndReachedStatus === EndReachedStatus.START_LOADED
            || this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED
        ) {
            return;
        }
        console.log('_onEndReached', this._currentEndReachedStatus)
        if (this._currentEndReachedStatus === EndReachedStatus.FIRST_LOADED) {
            this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING
            return;
        }
        if (data.length === 0) {
            return;
        }
        if (isRefreshing || isEndReached) {
            return;
        }
        // 解决内容视图不够列表的高度时,_onEndReached回调不正确的Bug，必须放在FIRST_LOADED后面
        if (this._currentContentSize.contentHeight <= this._currentListSize.height) {
            return
        }
        this.startEndReached();
        this.props.onEndReached && this.props.onEndReached(this.stopEndReached)
    };

    startEndReached = () => {
        if (!this.state.isEndReached) {
            console.log('startEndReached');
            this._currentEndReachedStatus = EndReachedStatus.START_LOADED;
            this.setState({ isEndReached: true }, () => {
                // 问题所在，不能显示到视图最底层
                // console.log('this._currentContentSize', this._currentContentSize.contentHeight)
                // let offset = this._currentContentSize.contentHeight - this._currentListSize.height + 30
                // console.log('this.offset', offset)
                // this.scrollToOffset({ offset: offset, animated: true })
            })
        }
    };

    stopEndReached = (option = { allLoad: false }) => {
        if (this.state.isEndReached) {
            this.endReachedTime = setTimeout(() => {
                if (option.allLoad === true) {
                    this._currentEndReachedStatus = EndReachedStatus.ALL_LOADED;
                } else {
                    this._currentEndReachedStatus = EndReachedStatus.WAITING_LOADING;
                }
                this.setState({ isEndReached: false })
            }, 200); // 解决上拉加载请求过快，导致的bug
        }
    };

    _onContentSizeChange = (contentWidth, contentHeight) => {
        const { onContentSizeChange } = this.props
        this._currentContentSize = { contentWidth, contentHeight }
        onContentSizeChange && onContentSizeChange(contentWidth, contentHeight)
    };

    _onScroll = (event) => {
        const { onScroll } = this.props
        this._currentContentOffset = event.nativeEvent.contentOffset
        onScroll && onScroll(event)
    };

    _onLayout = (event) => {
        const { onLayout } = this.props
        if (event.nativeEvent.layout.height != 0 && event.nativeEvent.layout.width != 0) {
            this._currentListSize = { width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height }
        }
        onLayout && onLayout(event)
    };

    _renderRefreshLoading = () => {
        const {
            refreshableColors, refreshableProgressBackgroundColor,
            refreshableSize, refreshableTintColor, refreshableTitle,
        } = this.props;
        return (
            <HeaderLoading
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                colors={refreshableColors}
                progressBackgroundColor={refreshableProgressBackgroundColor}
                size={refreshableSize}
                tintColor={refreshableTintColor}
                title={refreshableTitle}
            />
        )
    };

    _renderFooterLoading = () => {
        const { isEndReached } = this.state;
        const status = this._currentEndReachedStatus === EndReachedStatus.ALL_LOADED;
        return (
            <FooterLoding loading={isEndReached} allLoad={status} />
        );
    };

    _renderEmptyView = () => {
        return <EmptyView />
    };

    _captureRef = (v) => {
        this._listRef = v
    };

    _rednerFlatList = () => {
        const { data, onRefresh, onEndReached, onLayout, onContentSizeChange, enableRefresh, enableLoadMore, ...others } = this.props;
        return (
            <FlatList
                ref={this._captureRef}
                onLayout={this._onLayout}
                data={data}
                onScroll={this._onScroll}
                onContentSizeChange={this._onContentSizeChange}
                ListEmptyComponent={this._renderEmptyView}
                ListFooterComponent={enableLoadMore ? this._renderFooterLoading : null}
                refreshControl={enableRefresh ? this._renderRefreshLoading() : null}
                {...others}
                onEndReachedThreshold={0.1} // 必须在{...}后面，否则就会出问题。也不知道是为什么，
                onEndReached={this._onEndReached}
            />
        )
    };

    _rednerSectionList = () => {
        const { data, onRefresh, onEndReached, onLayout, onContentSizeChange, enableRefresh, enableLoadMore, ...others } = this.props;
        return (
            <SectionList
                ref={this._captureRef}
                onLayout={this._onLayout}
                sections={data}
                onScroll={this._onScroll}
                onContentSizeChange={this._onContentSizeChange}
                refreshControl={enableRefresh ? this._renderRefreshLoading() : null}
                ListFooterComponent={enableLoadMore ? this._renderFooterLoading : null}
                ListEmptyComponent={this._renderEmptyView}
                {...others}
                onEndReachedThreshold={0.1} // 必须在{...}后面，否则就会出问题。也不知道是为什么，
                onEndReached={this._onEndReached}
            />
        )
    };

    render() {
        const { listType } = this.props;
        return listType === 'FlatList' ? this._rednerFlatList() : this._rednerSectionList()
    }
}

export default ListView;
