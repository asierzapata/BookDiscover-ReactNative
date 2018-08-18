
import { AsyncStorage } from 'react-native'

/* ====================================================== */
/*                          API                           */
/* ====================================================== */

export default {
    getCachedDataByKey,
    setCachedDataByKey,
    removeCachedDataByKey,
    getAllCachedDataKeys,
    clearAllCachedData
}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function getCachedDataByKey(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key)
}

function setCachedDataByKey(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value)
}

function removeCachedDataByKey(key: string): Promise<void>{
    return AsyncStorage.removeItem(key)
}

function getAllCachedDataKeys(): Promise<string[]>{
    return AsyncStorage.getAllKeys()
}

function clearAllCachedData(): Promise<void> {
    return AsyncStorage.clear()
}