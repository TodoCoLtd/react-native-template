'use strict';
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';

class ImagePickerManager {

    static showSyanImagePicker(option = {}) {
        return new Promise((resolve, reject) => {
            SyanImagePicker.showImagePicker(option, (error, selectedPhotos) => {
                let data = []
                if (error) {
                    resolve({ code: 0, data, msg: '取消选择' })
                } else {
                    selectedPhotos.forEach(item => {
                        data.push({
                            size: item.size,
                            width: item.width,
                            height: item.height,
                            path: item.uri
                        })
                    });
                    resolve({ code: 1, data, msg: '' })
                }
            })
        })
    }

    static showImagePicker(option = {}) {
        return new Promise((resolve, reject) => {
            ImagePicker.launchImageLibrary(option, (response) => {
                let data = null
                if (response.didCancel) {
                    // 取消
                    resolve({ code: 0, data, msg: '取消选择' })
                } else {
                    data = {
                        size: response.fileSize,
                        width: response.width,
                        height: response.height,
                        path: response.uri
                    }
                    resolve({ code: 1, data, msg: '' })
                }
            });
        });
    }
}

export default ImagePickerManager