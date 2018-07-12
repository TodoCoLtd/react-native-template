'use strict';
import AsyncStorage from '../util/AsyncStorage';

class StorageManager {

    static load = async (key) => {
        try {
            const loadData = await AsyncStorage.load({ key })
            console.log('StorageManager_load', loadData)
            return Promise.resolve({ code: 1, data: loadData })
        } catch (error) {
            console.log('StorageManager_load_error', error)
            return Promise.resolve({ code: 0, data: null })
        }
    }

    static save = async (key, data) => {
        try {
            const saveData = await AsyncStorage.save({ key, data })
            console.log('StorageManager_save', saveData)
            return Promise.resolve({ code: 1, data: saveData })
        } catch (error) {
            console.log('StorageManager_save_error', error)
            return Promise.resolve({ code: 0, data: null })
        }
    }

    static remove = async (key) => {
        try {
            const removeData = await AsyncStorage.remove({ key })
            console.log('StorageManager_save', removeData)
            return Promise.resolve({ code: 1, data: removeData })
        } catch (error) {
            console.log('StorageManager_save_error', error)
            return Promise.resolve({ code: 0, data: null })
        }
    }
}

export default StorageManager