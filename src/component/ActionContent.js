'use strict';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types'
import { fontSize, scaleSize, isEmpty } from '../util/Tool';
import Theme from '../config/Theme';


class ActionContent extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        titleStyle: Text.propTypes.style,
        actions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, titleStyle: Text.propTypes.style, onPress: PropTypes.func })),
        cancelAction: PropTypes.shape({ title: PropTypes.string, titleStyle: Text.propTypes.style, onPress: PropTypes.func }),
        // 例如,
        //   actions: [
        //         { title: '取消', titleStyle: {}, onPress: () => alert('取消') },
        //         { title: '确定', titleStyle: {}, onPress: () => alert('取消') },
        //     ]
    };

    static defaultProps = {
        title: '',
        actions: [],
        cancelAction: { title: '取消' }
    };

    _onPressAction = (onPress) => {
        setTimeout(() => {
            onPress && onPress()
        }, 230); // 防止两个alert同时触发
        ActionsManager.hide()
    }

    _onPressCancel = () => {
        ActionsManager.hide()
    }

    renderTitle = () => {
        const { title, titleStyle } = this.props
        let titleComponent;
        if (React.isValidElement(title)) {
            titleComponent = title
        } else {
            titleComponent = !isEmpty(title) ? (
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                </View>
            ) : null
        }
        return titleComponent
    }

    renderContent = () => {
        const { actions } = this.props
        return (
            <ScrollView
                style={styles.contentContainer}
                bounces={true}
            >
                {actions.map((item, index) => {
                    const { title, titleStyle, onPress } = item
                    const borderTopWidth = index === 0 ? 0 : StyleSheet.hairlineWidth
                    return (
                        <TouchableHighlight
                            key={`action_item${index}`}
                            style={[styles.actionContainer, { borderTopWidth }]}
                            underlayColor={'#eeeeee'}
                            onPress={() => this._onPressAction(onPress)}>
                            <Text style={[styles.actionText, titleStyle]}>{title}</Text>
                        </TouchableHighlight>
                    )
                })}
            </ScrollView>
        )
    }

    render() {
        const { title } = this.props
        return (
            <View style={styles.container}>
                {this.renderTitle()}
                {this.renderContent()}
                <View style={styles.sep} />
                <TouchableHighlight
                    style={styles.cancelActionContainer}
                    underlayColor={'#eeeeee'}
                    onPress={this._onPressCancel}
                >
                    <Text style={styles.cancelActionText}>取消</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(127, 127, 127, 0.3)',
        paddingVertical: 15,
    },
    title: {
        fontSize: Theme.titleFontSize,
        color: Theme.titleColor
    },
    contentContainer: {
        maxHeight: Theme.actionMaxHeight,
    },
    actionContainer: {
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(127, 127, 127, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    actionText: {
        fontSize: Theme.actionTitleFontSize,
        color: Theme.actionTitleColor
    },
    sep: {
        height: 5,
        backgroundColor: 'rgba(127, 127, 127, 0.3)',
    },
    cancelActionContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    cancelActionText: {
        fontSize: Theme.cancelTitleFontSize,
        color: Theme.cancelTitleColor
    },
});

export default ActionContent