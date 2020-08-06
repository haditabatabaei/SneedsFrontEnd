<template>
    <section class="form-militaryservice">
        <h1 class="militaryservice-title isansFont">
            سابقه کار مرتبط با رشته؟
            <i class="material-icons">info</i>
        </h1>
        <div class="militaryservice-wrapper isansFont">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-have" type="radio" name="militaryservice" value="have">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-donthave" type="radio" name="militaryservice" value="donthave">
            <label for="militaryservice-have" class="militaryservice-holder" :class="[{'holder--selected': selectedEducationalGapStatus == 'have'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'have'">done</i>
                <img draggable="false" src="/sneedsAssets/img/we.svg" class="militaryservice-holder-image" alt="دارای سابقه کار مرتبط">
                <p class="militaryservice-holder-text">دارم</p>
            </label>
            <label for="militaryservice-donthave" class="militaryservice-holder" :class="[{'holder--selected': selectedEducationalGapStatus == 'donthave'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'donthave'">done</i>
                <img draggable="false" src="/sneedsAssets/img/no-we.svg" class="militaryservice-holder-image" alt="عدم سابقه کار مرتبط">
                <p class="militaryservice-holder-text">ندارم!</p>
            </label>
        </div>
        <div class="inputs" v-if="selectedEducationalGapStatus == 'have'">
            <c-number-input class="edu-gap" :step="1" @set-number="setGapYears" label="ماه سابقه کار" />
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    export default {
        name: 'WorkExperienceInput',
        components: {
            "c-number-input": NumberInput
        },
        data() {
            return {
                selectedEducationalGapStatus: null,
                gapYears: null
            }
        },
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = newGapYear;
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

    .form-militaryservice {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* padding-right: 50px; */
    }

    .militaryservice-wrapper  {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .militaryservice-holder {
        width: 50%;
        max-width: 335px;
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

    .militaryservice-holder-text {
        margin: 20px 0 10px 0;
        color: #9B9999;
    }

    .holder--selected {
        position: relative;
        box-shadow: none;
        border: 3px solid #00BFD6;
    }

    .militaryservice-holder-image {
        opacity: 0.5;
    }

    .holder--selected .militaryservice-holder-text {
        color: #00BFD6;
    }

    .holder--selected .militaryservice-holder-image {
        opacity: 1;
    }

    .militaryservice-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .inputs {
        margin: 20px;
    }

    .edu-gap {
        width: calc(50% - 27px);
    }

    @media only screen and (max-width: 767.8px) {
        .militaryservice-wrapper {
            margin: 0 20px;
            flex-wrap: nowrap;
        }

        .militaryservice-holder {
            margin: 0;
            padding: 10px;
            width: calc(50%);
        }

        .militaryservice-holder[for*="-have"] {
            margin-left: 10px;
        }

        .militaryservice-holder[for*="-donthave"] {
            margin-right: 10px;
        }

        .militaryservice-holder-image {
            width: 80%;
        }

        .edu-gap {
            width: auto;
            height: 50px;
        }
    }
</style>