<template>
    <div class="card">
        <b-table hover :fields="fields" :items="rates">
            <template v-slot:cell(check)="data">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                        :checked="isCurrencyEnabled(data.item.currency)"
                        @input="() => toggleCurrencyEnable(data.item.currency)">
                </div>
            </template>
            <template v-slot:cell(link)="data">
                <a :href="`https://rate.bot.com.tw/xrt/quote/day/${data.item.currency}`" target="_blank">當日</a>
                <a :href="`https://rate.bot.com.tw/xrt/quote/ltm/${data.item.currency}`" target="_blank">三月</a>
                <a :href="`https://rate.bot.com.tw/xrt/quote/l6m/${data.item.currency}`" target="_blank">半年</a>
            </template>
        </b-table>

        <div class="card-body">
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text">顯示欄位</label>
                </div>
                <select class="custom-select" v-model="displayRateField">
                    <option v-for="(text, key) in rateFields" :key="key"
                        v-text="text" :value="key"></option>
                </select>
            </div>
        </div>

        <div class="card-footer">
            <div>
                <span class="badge badge-warning">免責聲明</span>
                本表資料僅供參考，不代表實際交易匯率。
            </div>
            <div>
                <span class="badge badge-primary">資料來源</span>
                <a href="https://rate.bot.com.tw/xrt" target="_blank">台灣銀行</a>
            </div>
            <div>
                <span class="badge badge-info">更新時間</span>
                {{ updatedAt }}
            </div>
        </div>
    </div>
</template>

<script>
    import { BTable } from 'bootstrap-vue';

    export default {
        name: "App",
        components: {BTable},

        data () {
            return {
                fields: [
                    { key: 'check', label: '啟用', sortable: false, },
                    { key: 'chinese_name', label: '名稱', sortable: true, },
                    { key: 'currency', label: '貨幣', sortable: true, },
                    { key: 'cash_buying', label: '現金買入', sortable: true, },
                    { key: 'cash_selling', label: '現金賣出', sortable: true, },
                    { key: 'spot_buying', label: '即期買入', sortable: true, },
                    { key: 'spot_selling', label: '即期賣出', sortable: true, },
                    { key: 'link', label: '歷史', sortable: true, },
                ],
            };
        },

        computed: {
            rates () { return this.$store.getters.getRates; },
            updatedAt () { return this.$store.getters.getUpdatedAt; },
            enabledCurrencies: {
                get() { return this.$store.getters.getEnabledCurrencies; },
                set(value) { this.$store.commit('setEnabledCurrencies', value); }
            },
            displayRateField: {
                get() { return this.$store.getters.getDisplayRateField; },
                set(value) { this.$store.commit('setDisplayRateField', value); }
            },
            rateFields () { return this.$store.getters.getRateFields; },
        },

        methods: {
            isCurrencyEnabled(currency) {
                return this.enabledCurrencies.indexOf(currency) > -1;
            },
            toggleCurrencyEnable(currency) {
                let index = this.enabledCurrencies.indexOf(currency);

                let currencies = this.enabledCurrencies.concat();
                index > -1 ? currencies.splice(index, 1) : currencies.push(currency);
                this.enabledCurrencies = currencies;
            },
        },
    };
</script>

<style lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap';
    @import 'node_modules/bootstrap-vue/src/index.scss';
</style>