'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types'
import SegmentedView from '../segmentedView/index'
import SegmentedControlTab from '../common/SegmentedControlTab';
import ChatGroupPage from './chatGroup/index';
import GiftSE from './GiftSE';
import LiverInfo from './LiverInfo';
import ToolContainer from './ToolContainer'

class Content extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.array,
        giftData: PropTypes.object,
        anchor: PropTypes.object,
    }

    static defaultProps = {
        giftData: null
    }

    constructor(props) {
        super(props)
        this.state = { showLiver: true }
        this.data = []
    }


    _onClose = () => {
        this.setState({ showLiver: false })
    }

    render() {
        const { messages, giftData, anchor, onPressLike, onPressSend, onPressRecharge, onPressGift } = this.props
        const { showLiver } = this.state
        return (
            <View style={styles.container}>
                <SegmentedView indicatorLineColor="#01B9A0" barStyle={styles.barStyle} indicatorPositionPadding={2}>
                    <View title={'群英会'} style={styles.container} activeTitleStyle={styles.activeTitleStyle} titleStyle={styles.titleStyle} >
                        <ChatGroupPage messages={messages} />
                        {showLiver ? (
                            <LiverInfo style={styles.liverInfo} anchor={anchor} onClose={this._onClose} onPressLike={onPressLike} />
                        ) : null}
                        <ToolContainer
                            onPressSend={onPressSend}
                            onPressRecharge={onPressRecharge}
                            onPressGift={onPressGift}
                        />
                    </View>
                    <View title={'英雄榜'} style={styles.container} activeTitleStyle={styles.activeTitleStyle} titleStyle={styles.titleStyle}>
                        <SegmentedControlTab
                            tabsContainerStyle={styles.tabContainer}
                            tabStyle={styles.tab}
                            activeTabStyle={styles.activeTabStyle}
                            tabTextStyle={styles.tabTextStyle}
                            values={['贡献日榜', '贡献月榜', '贡献年榜']}
                        />
                    </View>
                    <View title={'直播回放'} style={styles.container} activeTitleStyle={styles.activeTitleStyle} titleStyle={styles.titleStyle}>

                    </View>
                </SegmentedView>
                <GiftSE giftData={giftData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    liverInfo: {
        // top: ScaleSize(65),
    },
    titleStyle: {
        fontSize: FontSize(14)
    },
    activeTitleStyle: {
        color: '#01B9A0',
        fontSize: FontSize(14)
    },
    tabContainer: {
        marginTop: 30,
        marginHorizontal: 50,
        borderWidth: 0,
        borderRadius: 6,
    },
    tab: {
        borderLeftWidth: 0,
    },
    activeTabStyle: {
        backgroundColor: '#01B9A0',
        borderRadius: 6,
        borderLeftWidth: 0,
    },
    tabTextStyle: {
        color: '#01B9A0',
        fontSize: FontSize(13),
    },
    barStyle: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#cdcdcd',
        height: ScaleSize(70)
    }
});

export default Content