<template>
    <div class="card">
        <table class="table table-striped mb-0">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>貨幣</th>
                    <th v-text="rateFields[displayRateField]"></th>
                    <th>TWD-></th>
                    <th>->TWD</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rate in enabledRates" :key="rate.currency">
                    <td v-text="rate.chinese_name"></td>
                    <td v-text="rate.currency"></td>
                    <td v-text="rate[displayRateField]"></td>
                    <td v-text="toForeign(rate[displayRateField])"></td>
                    <td v-text="toTwd(rate[displayRateField])"></td>
                </tr>
            </tbody>
        </table>

        <div class="card-body">
            <div class="input-group input-group-sm mb-2">
                <input type="number" class="form-control" v-model="twd">
                <div class="input-group-append">
                    <span class="input-group-text">台幣換外幣</span>
                </div>
            </div>
            <div class="input-group input-group-sm">
                <input type="number" class="form-control" v-model="foreign">
                <div class="input-group-append">
                    <span class="input-group-text">外幣換台幣</span>
                </div>
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

            <button class="mt-2 btn btn-sm btn-primary btn-block" @click="openOptionPage">選項</button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                twd: 1000,
                foreign: 1,
            };
        },

        computed: {
            updatedAt () { return this.$store.getters.getUpdatedAt; },
            enabledCurrencies () { return this.$store.getters.getEnabledCurrencies; },
            displayRateField () { return this.$store.getters.getDisplayRateField; },
            rateFields () { return this.$store.getters.getRateFields; },
            enabledRates () { return this.$store.getters.getRates.filter(rate => this.enabledCurrencies.indexOf(rate.currency) > -1); },
        },

        methods: {
            toForeign (rate) {
                if (!rate) { return ''; }
                return Math.round(this.twd / rate * 100) / 100;
            },
            toTwd (rate) {
                if (!rate) { return ''; }
                return Math.round(this.foreign * rate * 100) / 100;
            },
            openOptionPage() {
                if (chrome.runtime.openOptionsPage) {
                    chrome.runtime.openOptionsPage();
                } else { // Reasonable fallback.
                    window.open(chrome.runtime.getURL('options/options.html'));
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .card {
        min-width: 22rem;
        font-size: .8rem;
    }
</style>
