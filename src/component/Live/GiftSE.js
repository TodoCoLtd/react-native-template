'use strict';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Animated } from 'react-native';
import PropTypes from 'prop-types'

class GiftSE extends React.Component {

    static propTypes = {
        giftData: PropTypes.object
    }

    static defaultProps = {
        giftsData: null
    }

    constructor(props) {
        super(props);
        this.state = { currentGift: { message_id: -1 } }
        this.giftsData = [] // 

        this.translateX = new Animated.Value(-230)
        this.translateY = new Animated.Value(0)
        this.opacity = new Animated.Value(1)

        this.isCycle = true
        this.animateding = false
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.sequenceAnimated) {
            this.sequenceAnimated.stop()
            this.translateX.stopAnimation()
            this.translateY.stopAnimation()
            this.opacity.stopAnimation()
            this.isCycle = false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const newGift = nextProps.giftData
        const currentGift = this.state.currentGift
        console.log('shouldComponentUpdate', newGift, currentGift.message_id)
        if (this.animateding) {
            return false
        } else if (!newGift || newGift.message_id === currentGift.message_id) {
            return false
        } else {
            return true
        }
    }

    componentWillReceiveProps(nextProps) {
        const newGift = nextProps.giftData
        const currentGift = this.state.currentGift
        const lastOldGift = this.giftsData[this.giftsData.length - 1]
        if (lastOldGift) {
            console.log('lastOldGift', lastOldGift, newGift)
            if (lastOldGift.message_id != newGift.message_id) {
                this.giftsData.push(newGift)
            }
        } else if (newGift && newGift.message_id != currentGift.message_id) {
            console.log('数组为0', newGift)
            this.giftsData.push(newGift)
            this.setState({ currentGift: newGift }, () => {
                this.showGiftAnimation()
            })
        }
    }

    initAnimated = () => {
        this.translateX.setValue(-250)
        this.translateY.setValue(0)
        this.opacity.setValue(1)
    }

    showGiftAnimation = () => {
        if (this.giftsData.length === 0) {
            return
        }
        if (!this.isCycle) {
            return
        }
        if (this.animateding) {
            return
        }
        this.animateding = true
        this.sequenceAnimated = Animated.sequence([
            Animated.spring(this.translateX, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true
            }),
            Animated.delay(2000), // 礼物停留2s
            Animated.parallel([
                Animated.timing(this.translateY, {
                    toValue: -120,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(this.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ]).start((completion) => {
            this.initAnimated()
            this.animateding = false
            if (completion) {
                this.giftsData = this.giftsData.slice(1)
                console.log(this.giftsData)
                if (this.giftsData.length != 0) {
                    this.setState({ currentGift: this.giftsData[0] }, () => {
                        this.showGiftAnimation()
                    })
                }
            }
        })
    }

    render() {
        const { currentGift } = this.state
        let text = ''
        if (currentGift) {
            text = currentGift.message_id
        }
        console.log('currentGiftcurrentGift')
        return (
            <Animated.View style={[styles.container, {
                transform: [
                    { translateX: this.translateX },
                    { translateY: this.translateY, }
                ],
                opacity: this.opacity,
            }]}>
                <View >
                    <Image style={styles.imageBack} />
                    <View style={styles.contentContainer}>
                        <Image style={styles.userHeader} source={{ uri: currentGift.send_head }} />
                        <View style={styles.userContainer}>
                            <Text style={styles.userName}>{currentGift.send_uname}</Text>
                            <Text style={styles.giftInfo}>{text}</Text>
                        </View>
                        <Image style={styles.giftImage} />
                        <Text style={styles.giftConunt}>x88</Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        // width: 200,
        // height: 50,
        // backgroundColor: 'red',
    },
    imageBack: {
        position: 'absolute',
        bottom: 0,
        width: 150,
        height: 50,
        backgroundColor: 'blue',
    },
    userHeader: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 16,
        zIndex: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 5,
        // backgroundColor: 'red',
    },
    userContainer: {
        marginBottom: 5,
        marginLeft: 10,
    },
    userName: {
        color: '#fff',
        fontSize: FontSize(15),
        marginBottom: 5,
    },
    giftInfo: {
        color: '#fff',
        fontSize: FontSize(11),
    },
    giftImage: {
        width: 55,
        height: 55,
        backgroundColor: 'red',
        marginLeft: 10,
    },
    giftConunt: {
        color: '#6D32F4',
        fontSize: FontSize(38),
        marginLeft: 10,
    }
});

export default GiftSE