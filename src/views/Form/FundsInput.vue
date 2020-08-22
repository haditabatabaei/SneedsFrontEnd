<template>
    <section class="form-funds">
        <h1 class="funds-title isansFont">
            بورسیه و توانایی مالی
            <i class="material-icons">help_outline</i>
        </h1>
        <h3 class="funds-desc isansFont">
            حداقل یک گزینه را انتخاب کنید.
        </h3>
        <div class="marriage-wrapper isansFont">
            <input v-model="fullFund" id="fullfund" type="checkbox" value="fullfund">
            <input v-model="halfFund" id="halffund" type="checkbox" value="halffund">
            <input v-model="selfFund" id="selffund" type="checkbox" value="selffund">
            <label for="fullfund" class="marriage-holder" :class="[{'holder--selected': fullFund}]">
                <i class="material-icons holder-selected-icon" v-if="fullFund">done</i>
                <img draggable="false" src="/sneedsAssets/img/fullfund.svg" class="marriage-holder-image" alt="بورسیه کامل تحصیلی">
                <p class="marriage-holder-text">Full-Fund</p>
            </label>
            <label for="halffund" class="marriage-holder" :class="[{'holder--selected': halfFund}]">
                <i class="material-icons holder-selected-icon" v-if="halfFund">done</i>
                <img draggable="false" src="/sneedsAssets/img/halffund.svg" class="marriage-holder-image" alt="بورسه نصف تحصیلی">
                <p class="marriage-holder-text">Half-Fund</p>
            </label>
            <label for="selffund" class="marriage-holder" :class="[{'holder--selected': selfFund}]">
                <i class="material-icons holder-selected-icon" v-if="selfFund">done</i>
                <img draggable="false" src="/sneedsAssets/img/selffund.svg" class="marriage-holder-image" alt="خود بورسیه تحصیلی">
                <p class="marriage-holder-text">Self-Fund</p>
            </label>
            <label for="nomatter" class="marriage-holder" :class="[{'holder--selected': nomatter}]">
                <i class="material-icons holder-selected-icon" v-if="nomatter">done</i>
                <img draggable="false" src="/sneedsAssets/img/nomatter.svg" class="marriage-holder-image" alt="فرقی نمی کند">
                <p class="marriage-holder-text">فرقی نمی کند</p>
            </label>
        </div>
        <div class="fund-input-wrapper">
            <c-dropdown class="fund-input" label="توانایی مالی" :options="moneyOptions" @select-option="setAffordability" :defaultSelectedIndex="defaultSelectedIndex"/>
        </div>
    </section>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput.vue";
    export default {
        name: "FundsInput",
        components: {
            "c-dropdown": DropdownInput
        },
        data() {
            return {
                fullFund: null,
                halfFund: null,
                selfFund: null,
                selectedAffordability: null,
                defaultSelectedIndex: -1,
                moneyOptions: []
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            api() {
                return this.$store.getters.getApi
            },

            httpConfig() {
                return this.$store.getters.httpConfig
            },

            multipartHttpConfig() {
                return this.$store.getters.multipartHttpConfig
            },

            nomatter() {
                return !(this.fullFund || this.halfFund || this.selfFund) || (this.fullFund && this.selfFund && this.halfFund);
            }
        },
        watch: {
            fullFund(newVal) {
                this.$store.commit('setDetailedFormProperty', {prop: 'prefers_full_fund', value: newVal})
            },
            halfFund(newVal) {
                this.$store.commit('setDetailedFormProperty', {prop: 'prefers_half_fund', value: newVal})
            },
            selfFund(newVal) {
                this.$store.commit('setDetailedFormProperty', {prop: 'prefers_self_fund', value: newVal})
            },
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.init();
            }
        },
        methods: {
            setAffordability(option) {
                this.selectedAffordability = option;
                if(this.detailedForm) {
                    this.$store.commit('setDetailedFormProperty', {prop: 'payment_affordability', value: option.nameEnglish.toUpperCase()})
                }
            },
            async getAffordabilityChoices() {
                let result = await this.$api.get(`${this.api}/account/payment-affordability-choices/`, this.httpConfig);
                this.moneyOptions = result.data.choices.map(item => {
                    return {
                        name: item[0],
                        nameEnglish: item[1]
                    }
                })
                this.defaultSelectedIndex = this.moneyOptions.findIndex(moneyOption => moneyOption.nameEnglish.toUpperCase() == this.detailedForm.payment_affordability.toUpperCase())
                this.selectedAffordability = this.moneyOptions[this.defaultSelectedIndex]
            },
            init() {
                if(this.detailedForm) {
                    this.fullFund = this.detailedForm.prefers_full_fund;
                    this.halfFund = this.detailedForm.prefers_half_fund;
                    this.selfFund = this.detailedForm.prefers_self_fund;
                    this.getAffordabilityChoices();
                }
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
    input[type="checkbox"] {
        display: none;
    }

    .form-funds {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .marriage-wrapper  {
        display: flex;
        flex-wrap: wrap;
    }

    .marriage-holder {
        width: calc(50% - 40px);
        border-radius: 12px;
        background-color: white;
        box-shadow:0 3px 26px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 20px;
        padding: 20px;
        cursor: pointer;
        transition: all 100ms ease-in-out;
    }

    .holder-selected-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 18px;
        color: white;
        border-radius: 50%;
        background-color: #00D4ED;
        padding: 2px;
    }

    .marriage-holder-text {
        margin: 20px 0 10px 0;
        color: #9B9999;
    }

    .holder--selected {
        position: relative;
        box-shadow: none;
        border: 3px solid #00BFD6;
    }

    .marriage-holder-image {
        width: 100px;
        opacity: 0.5;
    }

    .holder--selected .marriage-holder-text {
        color: #00BFD6;
    }

    .holder--selected .marriage-holder-image {
        opacity: 1;
    }

    .funds-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .funds-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
    }

    .funds-desc {
        font-size: 14px;
        margin: 0 25px;
        color: #9B9999;
    }

    .fund-input-wrapper {
        padding: 20px;
        align-self: stretch;
    }

    .fund-input {
        width: 50%;
    }

    @media only screen and (max-width: 767.8px) {
        .fund-input {
            width: auto;
        }

    }
</style>