
import store from './store';
import axios from 'axios';

// alert(`Hello ${store.getters.foo}!`)

window.store = store;

chrome.alarms.clearAll();
chrome.alarms.onAlarm.addListener(function(alarm) {
    setTimeout(getJson, 1000);
});
chrome.alarms.create('updateJson', {
    when: (new Date()).setHours(9, 5, 0).valueOf(),
    periodInMinutes: 60,
});

function getJson () {
    let resource = process.env.CURRENCY_RESOURCE;
    if (!resource) return;

    if (store.state.updated_at > (Date.now()/1000 - 3600)) {
        return;
    }

    axios.get(resource).then(response => {
        store.commit('setRates', response.data.rates);
        store.commit('setCreated', response.data.created_at);
        store.commit('setUpdated', response.data.updated_at);
    });
}