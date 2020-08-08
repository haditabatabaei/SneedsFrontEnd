<template>
    <section class="form-funds">
        <h1 class="funds-title isansFont">
            بورسیه و توانایی مالی
            <i class="material-icons">info</i>
        </h1>
        <h3 class="funds-desc isansFont">
            حداقل یک گزینه را انتخاب کنید.
        </h3>
        <div class="marriage-wrapper isansFont">
            <input v-model="selectedFundStatus" id="fullfund" type="radio" name="marriage" value="fullfund">
            <input v-model="selectedFundStatus" id="halffund" type="radio" name="marriage" value="halffund">
            <input v-model="selectedFundStatus" id="selffund" type="radio" name="marriage" value="selffund">
            <input v-model="selectedFundStatus" id="nomatter" type="radio" name="marriage" value="nomatter">
            <label for="fullfund" class="marriage-holder" :class="[{'holder--selected': selectedFundStatus == 'fullfund'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedFundStatus == 'fullfund'">done</i>
                <img draggable="false" src="/sneedsAssets/img/fullfund.svg" class="marriage-holder-image" alt="بورسیه کامل تحصیلی">
                <p class="marriage-holder-text">Full-Fund</p>
            </label>
            <label for="halffund" class="marriage-holder" :class="[{'holder--selected': selectedFundStatus == 'halffund'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedFundStatus == 'halffund'">done</i>
                <img draggable="false" src="/sneedsAssets/img/halffund.svg" class="marriage-holder-image" alt="بورسه نصف تحصیلی">
                <p class="marriage-holder-text">Half-Fund</p>
            </label>
            <label for="selffund" class="marriage-holder" :class="[{'holder--selected': selectedFundStatus == 'selffund'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedFundStatus == 'selffund'">done</i>
                <img draggable="false" src="/sneedsAssets/img/selffund.svg" class="marriage-holder-image" alt="خود بورسیه تحصیلی">
                <p class="marriage-holder-text">Self-Fund</p>
            </label>
            <label for="nomatter" class="marriage-holder" :class="[{'holder--selected': selectedFundStatus == 'nomatter'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedFundStatus == 'nomatter'">done</i>
                <img draggable="false" src="/sneedsAssets/img/nomatter.svg" class="marriage-holder-image" alt="فرقی نمی کند">
                <p class="marriage-holder-text">فرقی نمی کند</p>
            </label>
        </div>
        <div class="fund-input-wrapper">
            <c-dropdown class="fund-input" />
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
                selectedFundStatus: 'nomatter'
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    input[type="radio"] {
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

    .funds-desc {
        font-size: 14px;
        margin: 0 25px;
        color: #9B9999;
    }

    .fund-input-wrapper {
        padding: 20px;
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