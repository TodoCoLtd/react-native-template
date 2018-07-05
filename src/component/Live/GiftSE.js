'use strict';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Animated } from 'react-native';
import PropTypes from 'prop-types'


class GiftSE extends React.PureComponent {

    static propTypes = {
        giftsData: PropTypes.array
    }

    static defaultProps = {
        giftsData: []
    }

    constructor(props) {
        super(props);
        this.state = { currentGifts: [] }
        this.currentGifts = [] // 当前礼物的
        this.giftIndex = 0 // 当前正在执行动画的礼物
        this.translateX = new Animated.Value(-200)
        this.translateY = new Animated.Value(0)
        this.opacity = new Animated.Value(1)

        this.isCycle = true
        this.animateding = false
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.sequenceAnimated.stop()
        this.translateX.stopAnimation()
        this.translateY.stopAnimation()
        this.opacity.stopAnimation()
        this.isCycle = false
    }

    componentWillReceiveProps(nextProps) {
        const newGift = nextProps.giftData
        const array = this.state.currentGifts
        const lastOldGift = array[array.length - 1]
        if (lastOldGift) {
            console.log('lastOldGift', lastOldGift, newGift)
            if (lastOldGift.message_id != newGift.message_id) {
                array.push(newGift)
                this.setState({ currentGifts: array }, () => {
                    this.showGiftAnimation()
                })
            }
        } else {
            array.push(newGift)
            this.setState({ currentGifts: array }, () => {
                this.showGiftAnimation()
            })
        }
        // const oldGiftsData = this.props.giftsData
        // const newGiftsData = nextProps.giftsData
        // if (oldGiftsData.length < newGiftsData.length && newGiftsData.length != 0) {
        //     // 执行礼物动画

        // }
        // this.currentGifts = newGiftsData
    }

    initAnimated = () => {
        this.translateX.setValue(-200)
        this.translateY.setValue(0)
        this.opacity.setValue(1)
    }

    showGiftAnimation = () => {
        const { currentGifts } = this.state
        console.log('currentGifts', currentGifts)
        if (currentGifts.length === 0) {
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
        ]).start((finsh) => {
            this.initAnimated()
            this.animateding = false
            if (finsh && this.isCycle) {
                let array = this.state.currentGifts
                this.setState({ currentGifts: array.slice(1) }, () => {
                    console.log(this.state.currentGifts)
                    this.showGiftAnimation()
                })
            }
        })
    }

    render() {
        const { giftsData } = this.props
        const { currentGifts } = this.state
        let ceshi = null
        if (currentGifts.length > 0) {
            ceshi = currentGifts[0].message_id
        }
        console.log('ceshi')
        // const ceshi = currentGifts[0] && currentGifts[0].message_id
        // console.log('ceshi', currentGifts[0].message_id)
        return (
            <Animated.View style={[styles.container, {
                transform: [
                    { translateX: this.translateX },
                    { translateY: this.translateY, }
                ],
                opacity: this.opacity,
            }]}>
                {/* <Image /> */}
                <Text>{ceshi}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        width: 200,
        height: 50,
        backgroundColor: 'red',
    }
});

export default GiftSE