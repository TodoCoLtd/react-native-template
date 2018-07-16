//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wheel, Button, Theme } from 'teaset';

// create a component
class WheelDay extends React.PureComponent {

    constructor(props) {
        super(props);
        this.years = [];
        for (let i = 2017; i <= 2025; ++i) {
            this.years.push(i)
        }
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.daysCount = [
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        ];
        this.state = { date: new Date() }
    }
    isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }
    _onPressCancel = () => {
        if (this.props.onPressCancel) {
            this.props.onPressCancel()
        } else {
            ActionsManager.hide()
        }
    }
    _onPressOk = () => {
        const data = Moment(this.state.date).format('X')
        this.props.onPressOK && this.props.onPressOK(this.state.date)
    }
    onDateChange(year, month, day) {
        let { date } = this.state;
        date.setFullYear(year);
        let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
        if (day > daysCount) {
            day = daysCount;
            date.setDate(day);
            date.setMonth(month);
        } else {
            date.setMonth(month);
            date.setDate(day);
        }
        this.setState({ date });
        this.forceUpdate()
    }
    render() {
        const { defaultValue } = this.props
        let { date } = this.state;
        let year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
        let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
        console.log('daysCount', daysCount)
        let days = [];
        for (let i = 1; i <= daysCount; ++i) days.push(i);

        let currentYear, currentMounth, currentDay, value
        value = defaultValue === '日期' ? new Date() : defaultValue
        currentYear = Moment(value).format('YYYY')
        currentMounth = Moment(value).format('M')
        currentDay = Moment(value).format('D')
        return (
            <View style={styles.container}>
                <View style={styles.bottomContainer}>
                    <Button onPress={this._onPressCancel} style={{ marginLeft: 10, }} title={'取消'} size={'sm'} />
                    <Button onPress={this._onPressOk} style={{ marginRight: 10, }} title={'确定'} size={'sm'} />
                </View>
                <View style={styles.wheelContainer}>
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        items={this.years}
                        defaultIndex={this.years.findIndex((item) => item == currentYear)}
                        onChange={index => this.onDateChange(this.years[index], month, day)}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        items={this.months}
                        defaultIndex={this.months.findIndex((item) => item == currentMounth)}
                        onChange={index => this.onDateChange(year, this.months[index] - 1, day)}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        items={days}
                        defaultIndex={days.findIndex((item) => item == currentDay)}
                        onChange={index => this.onDateChange(year, month, days[index])}
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: Theme.isIPhoneX ? 34 : 0,
    },
    wheelContainer: {
        // marginTop: 10,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wheelStyle: {
        height: 180,
        width: 100
    },
    itemStyle: {
        textAlign: 'center'
    },
    bottomContainer: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
    }
});

//make this component available to the app
export default WheelDay;
