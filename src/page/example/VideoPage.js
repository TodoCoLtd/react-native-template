//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation';
import Container from '../../component/common/Container';
import VideoPlayer from '../../component/video/index'
import { Button } from 'teaset';

// create a component
class VideoPage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { videoStyle: { width: 375, height: 260 }, navHidden: false }
    }

    componentDidMount() {
        // this locks the view to Portrait Mode
        // Orientation.lockToPortrait();

        // // this locks the view to Landscape Mode
        // // Orientation.lockToLandscape();

        // // this unlocks any previous locks to all Orientations
        // // Orientation.unlockAllOrientations();

        Orientation.addOrientationListener(this._orientationDidChange);
        console.log('VideoPage-componentDidMount')
        // setTimeout(() => {
        //     this.props.navigation.goBack()
        // }, 100);
        // alert('VideoPage-componentDidMount')
        this.inter = InteractionManager.runAfterInteractions(() => {
            console.log('VideoPage-runAfterInteractions')
            // alert('VideoPage-runAfterInteractions')
        })
    }
    componentWillUnmount() {
        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);

        // this.inter.cancel()
    }
    onPress = () => {
        this.props.navigation.navigate('Ceshi')
    }
    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            this.setState({ navHidden: true })
        } else {
            this.setState({ navHidden: false })
        }
    }
    render() {
        console.log('render')
        return (
            <Container style={styles.container}>
                <VideoPlayer
                    style={{ backgroundColor: 'black', }}
                    // source={{ uri: 'rtmp://live.hkstv.hk.lxdns.com/live/hks' }}
                    videoStyle={{ width: 375, height: 260 }}
                    totalDuration={23}
                    onPressBack={this._onPressBack}
                />
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    navBar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 20
    }
});

//make this component available to the app
export default VideoPage;
