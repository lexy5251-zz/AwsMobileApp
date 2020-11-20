import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const storeData = async (key, value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
}


export const getData = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export const setQuestionProgress = (questionId, examVersion, qp) => {
    return getData(`@${examVersion}_progress`).then(progress => {
        if (_.isEmpty(progress)) {
            progress = {};
        }

        if (_.isEmpty(progress[questionId])) {
            progress[questionId] = {status: '', saved: false};
        }
        if (_.has(qp, 'status')) {
            progress[questionId].status = qp.status;
        }
        if (_.has(qp, 'saved')) {
            progress[questionId].saved = qp.saved;
        }

        return storeData(`@${examVersion}_progress`, progress);
    });
}

export const getQuestionProgress = (questionId, examVersion) => {
    return getData(`@${examVersion}_progress`).then(progress => {
        if (!_.isEmpty(progress) && !_.isEmpty(progress[questionId])) {
            return progress[questionId]
        }
        return {status: '', saved: false};
    });
}