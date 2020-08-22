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
            <c-number-input class="edu-gap" :step="1"
                            :error="$v.gapYears.$error"
                            error-text="سابقه کاری باید عدد صحیح بالای صفر باشد."
                            v-model="gapYears"
                            label="ماه سابقه کار" />
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    import {minValue, maxValue, integer} from 'vuelidate/lib/validators'
    export default {
        name: 'WorkExperienceInput',
        components: {
            "c-number-input": NumberInput
        },
        validations: {
            gapYears: {minValue: minValue(0), integer, maxValue: maxValue(2147483647)}
        },
        data() {
            return {
                selectedEducationalGapStatus: null,
                gapYears: 1
            }
        },
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = Number(newGapYear);
            },
            init() {
                console.log('in ms input', this.detailedForm);
                if(this.detailedForm) {
                    this.selectedEducationalGapStatus = !!this.detailedForm.related_work_experience ? 'have' : 'donthave'
                    if(this.selectedEducationalGapStatus == 'have') {
                        this.setGapYears(this.detailedForm.related_work_experience)
                    }
                }
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
            }
        },
        watch: {
            gapYears(newVal) {
                console.log(newVal);
                this.$store.commit('setDetailedFormProperty', {prop: 'related_work_experience', value: newVal})
                this.$v.$touch();
                this.$store.commit('setWorkExperienceIsValid', !this.$v.gapYears.$error)
            },
            selectedEducationalGapStatus(newVal) {
                if(newVal == null || newVal == 'donthave') {
                    this.$store.commit('setDetailedFormProperty', {prop: 'related_work_experience', value: 0 })
                    this.$store.commit('setWorkExperienceIsValid', true)
                }
            },
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.init();
            }
        },
        created() {
            this.init();
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

    }

    .militaryservice-holder {
        width: calc(100% - 360px);
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

    @media only screen and (max-width: 991.8px) and (min-width: 767.8px) {
        .militaryservice-wrapper {
            flex-wrap: nowrap;
            justify-content: flex-start;
        }

        .militaryservice-holder {
            max-width: initial;
            height: 296px;
        }
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