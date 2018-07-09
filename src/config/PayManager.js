import XPay from 'react-native-puti-pay';

class PayManager {

    static pay(type, data) {
        return new Promise((resolve, reject) => {
            if (type === 'weixin') {
                const wx = {
                    partnerId: data.partnerid,
                    prepayId: data.prepayid,
                    packageValue: data.package,
                    nonceStr: data.noncestr,
                    timeStamp: data.timestamp,
                    sign: data.sign,
                }
                XPay.wxPay(wx, (res) => {
                    console.log('微信支付', res)
                    if (res.errCode == 0) {
                        resolve({ msg: '支付成功!', code: 1 })
                    } else {
                        resolve({ msg: '支付失败!', code: 0 })
                    }
                })
            } else {
                XPay.alipay(data, (res) => {
                    console.log('支付宝支付', res)
                    if (res.resultStatus === '6001') {
                        resolve({ msg: '取消支付', code: 0 })
                    } else {
                        const result = JSON.parse(res.result)
                        if (result.alipay_trade_app_pay_response.code == 10000) {
                            resolve({ msg: '支付成功!', code: 1 })
                        } else {
                            resolve({ msg: '支付失败!', code: 0 })
                        }
                    }
                })
            }
        })
    }


}

export default PayManager