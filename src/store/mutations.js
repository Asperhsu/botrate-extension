
export default {
    setRates (state, payload) {
        state.rates = payload
    },
    setCreated (state, payload) {
        state.created_at = payload
    },
    setUpdated (state, payload) {
        state.updated_at = payload
    },
    setEnabledCurrencies (state, payload) {
        state.enabledCurrencies = payload
    },
}
