import { fromUnixTime, format } from 'date-fns';

export const findRate = (state) => {
    return (currency) => {
        return state.rates.find(rate => rate.currency == currency);
    };
}

export const getRates = (state) => {
    return state.rates || [];
}

export const getUpdatedAt = (state) => {
    let unixtimestamp = state.updated_at;
    if (!unixtimestamp) return '';

    let date = fromUnixTime(unixtimestamp);
    return format(date, 'yyyy-MM-dd kk:mm:ss');
}

export const getEnabledCurrencies = (state) => {
    return state.enabledCurrencies || ['USD', 'JPY', 'EUR'];
}

export const getDisplayRateField = (state) => {
    return state.displayRateField || 'cash_selling';
}

export const getRateFields = (state) => {
    return {
        cash_buying: '現金買入',
        cash_selling: '現金賣出',
        spot_buying: '即期買入',
        spot_selling: '即期賣出',
    };
}