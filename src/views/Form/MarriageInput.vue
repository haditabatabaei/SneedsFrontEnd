<template>
    <section class="form-marriage">
        <h1 class="marriage-title isansFont">
            مجردی یا متاهل؟
            <i class="material-icons">info</i>
        </h1>
        <div class="marriage-wrapper isansFont">
            <input v-model="selectedMarriageStatus" id="marriage-single" type="radio" name="marriage" value="single">
            <input v-model="selectedMarriageStatus" id="marriage-married" type="radio" name="marriage" value="married">
            <label for="marriage-single" class="marriage-holder" :class="[{'holder--selected': selectedMarriageStatus == 'single'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedMarriageStatus == 'single'">done</i>
                <img draggable="false" src="/sneedsAssets/img/single.svg" class="marriage-holder-image" alt="وضععیت تاهل مجرد">
                <p class="marriage-holder-text">مجردم</p>
            </label>
            <label for="marriage-married" class="marriage-holder" :class="[{'holder--selected': selectedMarriageStatus == 'married'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedMarriageStatus == 'married'">done</i>
                <img draggable="false" src="/sneedsAssets/img/married.svg" class="marriage-holder-image" alt="وضعیت تاهل متاهل">
                <p class="marriage-holder-text">متاهلم</p>
            </label>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MarriageInput',
    data() {
        return {
            selectedMarriageStatus: null
        }
    },
    created() {

    }
}
</script>

<style scoped>
    input[type="radio"] {
        display: none;
    }

    .form-marriage {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* padding-right: 50px; */
    }

    .marriage-wrapper  {
        display: flex;
    }

    .marriage-holder {
        width: calc(100% - 360px);
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
        opacity: 0.5;
    }

    .holder--selected .marriage-holder-text {
        color: #00BFD6;
    }

    .holder--selected .marriage-holder-image {
        opacity: 1;
    }

    .marriage-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }
</style>