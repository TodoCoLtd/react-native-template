import { Dimensions, Platform, Text, StyleSheet, StatusBar } from 'react-native'
import { Theme } from 'teaset'
import { fontSize, scaleSize, addCustomProps } from '../util/Tool';

//  更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
// addCustomProps(Text, { allowFontScaling: false });
// addCustomProps(TextInput, { allowFontScaling: false });
// addCustomProps(TouchableOpacity, { activeOpacity: 0.7 });
// addCustomProps(ListRow, {activeOpacity: 0.7});

// 配置全局的teaset的Theme
Theme.set({
    // 开启iphoneX适配
    fitIPhoneX: true,

    // 设置ActionsManager的颜色和字体大小
    asItemFontSize: fontSize(16),

    // 设置MenuManager的颜色和字体大小
    menuItemTitleColor: '#53812F',
    menuItemFontSize: fontSize(14),
    menuItemSeparatorColor: '#D8D8D8',

    // 设置ToastManager的颜色和字体大小
    toastTextColor: '#FFFFFF',
    toastFontSize: fontSize(16),
})

const DefaultTheme = {
    isIPhoneX: Theme.isIPhoneX,
    fitIPhoneXTop: 44,
    fitIPhoneXBottom: 34,
    navBarHeight: Theme.themes.default.navBarContentHeight,
    pageBackgroundColor: '#f7f7f7',

    // 弹窗提示组件的样式
    alertWidth: 260,
    alertMinHeight: 52,
    alertTitleMaxWidth: 200,
    alertDetailMaxWidth: 230,
    alertActionHeight: 42,
    alertActionColor: '#348fe4',
    alertSeparatorColor: '#eaeaea',
    alertTitleFontSize: fontSize(16),
    alertTitleColor: '#000',
    alertDetailFontSize: fontSize(13),
    alertDetailColor: '#000',
    alertActionFontSize: fontSize(16),

    // action组件
    actionMaxHeight: 230,
    actionTitleFontSize: fontSize(14),
    actionTitleColor: '#000',
    cancelTitleFontSize: fontSize(14),
    cancelTitleColor: '#000',
    titleFontSize: fontSize(12),
    titleColor: '#999',

    // 分享组件的样式
    shareBackColor: '#eeeeee',
    shareActionWidth: scaleSize(100),
    shareActionHeight: scaleSize(100),
    shareActionRadius: 7,
    shareActionTextColor: '#000000',
    shareCancelActionHeight: scaleSize(90),
    shareCancelBackColor: '#fff',
    shareCancelTextColor: '#000000',

    // 地区选择组件的样式
    areaActionTitleColor: '#5d7f3b',

    // 设置MenuManager的初始化配置，有些样式请去上方teaset里配置，目前因为时间原因先用teaset自带的组件，后续将自定义组件。
    menuOptions: {
        menuAlign: 'end',
        menuPopoverStyle: { backgroundColor: '#fff', },
        menuShowArrow: true,
        menuAnimated: true,
        menuOverlayOpacity: 0.3,
        menuShadow: false,
    },
    // 设置toastManager的初始化配置，有些样式请去上方teaset里配置，目前因为时间原因先用teaset自带的组件，后续将自定义组件。
    toastOptions: {
        position: 'center',
    }
}

const CusTheme = {

    get statusBarHeight() {
        if (Platform.OS === 'ios') {
            if (DefaultTheme.isIPhoneX) {
                return DefaultTheme.fitIPhoneXTop
            } else {
                return 20
            }
        } else if (Platform.OS === 'android') {
            if (Platform.Version > 20) {
                return StatusBar.currentHeight
            }
            return 0;
        }
        return 0
    },
    get screenWidth() {
        return Dimensions.get('screen').width
    },
    get screenHeight() {
        return Dimensions.get('screen').height
    },
    get screenInset() {
        return Theme.screenInset
    },
    get isLandscape() {
        return Dimensions.get('screen').width > Dimensions.get('screen').height
    },
    ...DefaultTheme,

}

export default CusTheme