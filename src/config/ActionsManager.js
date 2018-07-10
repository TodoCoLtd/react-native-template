
import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { ActionSheet, Overlay, Label } from 'teaset';
import { fontSize, bouncer } from '../util/Tool';
import AreaContent from '../component/AreaContent';
import ShareContent from '../component/ShareContent';
import ActionContent from '../component/ActionContent'
import JShareModule from 'jshare-react-native';

class ActionsManager {

    static pullViewRefs = []

    /** 参数
     * const params = {
        actions: [
            { title: 'Say hello', onPress: () => alert('Hello') },
            { title: 'Do nothing' },
            { title: 'Disabled', disabled: true },
        ],
        cancelAction:{
            title: 'Cancel'
        }
     }
     * 
     */
    static show(params) {
        this.showPullView(<ActionContent {...params} />)
    }

    static showShare(func) {
        this.showPullView(<ShareContent onPress={func} />, {})
    }

    static showArea(func) {
        this.showPullView(<AreaContent onPress={func} />, {})
    }

    static showShareModule(params) {
        const { type, url, title, text } = params
        ActionsManager.showShare((item) => {
            let platform;
            switch (item) {
                case 1:
                    // 微信
                    platform = 'wechat_session'
                    break;
                case 2:
                    // 微信
                    platform = 'wechat_session'
                    break;
                case 3:
                    Clipboard.setString(url)
                    ToastManager.show('已复制到剪切板')
                    break;

                default:
                    break;
            }
            const params = { type, platform, url, title, text, imageUrl: Constants.ICON_APP }
            JShareModule.share(params, (success) => {
                ToastManager.show('分享成功!')
            }, (error) => {
                ToastManager.show('分享失败!')
            })
        })
    }

    static showPullView(component, option) {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()) // 过滤
        if (this.pullViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PullView
                    ref={v => this.pullViewRefs.push(v)}
                    side={'bottom'}
                    modal={false}
                    rootTransform={'none'}
                    containerStyle={{ backgroundColor: 'transparent', }}
                    onCloseRequest={() => this.hide()}
                    {...option}
                >
                    {component}
                </Overlay.PullView>
            )
        }
    }

    static hide() {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()) // 过滤
        if (this.pullViewRefs.length > 0) {
            const lastRef = this.pullViewRefs.pop()
            lastRef.close()
        }
    }
}


export default ActionsManager