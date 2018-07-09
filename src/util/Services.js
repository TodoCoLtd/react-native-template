'use strict';
import queryString from 'query-string';

// 默认选项配置
const _settings = {
    url: '',
    method: 'GET',
    headers: {},
    data: null,
    query: null,
    dataType: 'json',
    cache: true,
    accepts: {
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
    },
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 匹配所有资源类型
const _allType = '*/' + '*'
const _objToString = Object.prototype.toString;
const _fnToString = Function.prototype.toString;
/**
 * [classOf 检测是否属于指定的类型]
 * className 首字母需要大写
 */
const classOf = (obj, className) => {
    return _objToString.call(obj) === '[object ' + className + ']';
}
/**
 * [isPlainObject 检测对象是否是纯粹的由Object创建的对象]
 * 1. 排除Null和非Object类型的对象
 * 2. 排除宿主对象
 * 3. 排除不是由Object构造函数创建的对象(这也包括了宿主对象)
 */
const isPlainObject = (obj) => {
    let constructor, proto
    // IE7/8里的宿主对象是Object类型，而且它们的toString也是Object类型
    if (!obj || !classOf(obj, 'Object') || typeof obj.toString !== 'function') {
        return false;
    }
    if (typeof Object.getPrototypeOf === 'function') {
        proto = Object.getPrototypeOf(obj);
    }
    // Object.prototype 等于 null
    if (proto === null) {
        return true;
    }
    constructor = proto ? proto.constructor : obj.constructor;
    // IE7里的宿主对象的constructor是undefined
    return typeof constructor === 'function' && _fnToString.call(constructor) === _fnToString.call(Object);
}

/**
 * [isArray 检测是否是数组类型]
 */
const isArray = (obj) => {
    return classOf(obj, 'Array');
}

/**
 * [extend 将一个或多个对象的属性复制到另一个指定的对象上]
 */
function extend(target) {
    let args = [].slice.call(arguments, 1), source;
    while (!!(source = args.shift())) {
        for (let name in source) {
            let copy = source[name];
            let src = target[name];
            if (isPlainObject(copy)) {
                src = isPlainObject(src) ? src : {};
                target[name] = extend(src, copy);
            } else if (isArray(copy)) {
                src = isArray(src) ? src : [];
                target[name] = extend(src, copy);
            } else {
                target[name] = copy;
            }
        }
    }
    return target;
}

const configSettings = (settings) => {
    // fetch 选项 // 组合默认设置与用户设置
    let options = {}, newSettings = extend({}, _settings, settings);
    newSettings.method = newSettings.method.toUpperCase();
    newSettings.dataType = newSettings.dataType.toLowerCase();
    // GET/HEAD请求不能设置body
    newSettings.hasBody = !/^(?:GET|HEAD)$/.test(newSettings.method);
    // 格式化query为querystring
    newSettings.query = queryString.stringify(newSettings.query || null);
    //格式化data为JSONstring
    newSettings.data = JSON.stringify(newSettings.data || null);
    if (!newSettings.hasBody) {
        // 如果设置了data，将它追加到query中
        if (newSettings.data) {
            newSettings.query += (newSettings.query ? '&' : '') + newSettings.data;
        }
        // 如果设置为不缓存，在query中追加时间戳
        if (newSettings.cache === false) {
            newSettings.query += (newSettings.query ? '&' : '') + '_=' + Date.now();
        }
    } else {
        if (newSettings.data) {
            options.body = newSettings.data;
            newSettings.headers['Content-Type'] = newSettings.contentType;
        }
    }
    newSettings.url += (newSettings.query ? (/\?/.test(newSettings.url) ? '&' : '?') + newSettings.query : '');
    // q=0.01 表示权重，数字越小权重越小
    let accept = newSettings.accepts[newSettings.dataType];
    newSettings.headers.Accept = accept ? (accept + ', ' + _allType + '; q=0.01') : _allType;
    options.method = newSettings.method;
    options.headers = newSettings.headers;
    return { newSettings, options }
}

/**
	 * [request 包装fetch]
	 * @param  settings
	 * @return promise
	 */
const request = (settings) => {
    const { newSettings, options } = configSettings(settings)
    console.log('请求参数---', newSettings)
    return fetch(newSettings.url, options).then((res) => {
        const status = res.status;
        if (res.ok && status >= 200 && status < 300 || status === 304) {
            const dataType = newSettings.dataType || res.headers.get('Content-Type');
            if (dataType.match(/json/)) {
                const resJson = res.json()
                return Promise.all([resJson, res]);
            } else {
                return Promise.all([res.text(), res]);
            }
        } else {
            const error = status + ' ' + (res.statusText || '');
            console.log('请求失败---', error)
            return Promise.reject(error || 'error');
        }
    })
}

/**
	 * [get 快捷方法]
	 * @param  {[type]} url   [description]
	 * @param  {[type]} query [description]
	 * @return promise
	 */
const get = (url, query) => {
    const setting = {
        url: url,
        method: 'GET',
        query: query
    }
    return request(setting);
}

/**
 * [post 快捷方法]
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return promise
 */
const post = (url, data) => {
    const setting = {
        url: url,
        method: 'POST',
        data: { token: global.token, ...data }
    }
    return request(setting);
}

export default { configSettings, get, post } 