import { AsyncStorage } from 'react-native';
import { createStore, combineReducers } from 'redux'

const site_url = 'http://10.0.2.2:3001/';

const fetchAndTry = async (link, data) => {
    const token = await AsyncStorage.getItem('id_token');
    data.authorisation = token;
    return (new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(site_url + link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status == 201) {
                var json = response.json();
                resolve(json);
            } else {
                reject();
            }
            const objets = await response.json();
        } catch (err) {
            reject();
        }
    })
    );
}

const fetchReducer = (state = fetchAndTry, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const siteReducer = (state = site_url, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const marqueReducer = (state = '', action) => {
    switch (action.type) {
        case 'change':
            return action.marque;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    marque: marqueReducer,
    site: siteReducer,
    fetch: fetchReducer
});

export default createStore(allReducers);
