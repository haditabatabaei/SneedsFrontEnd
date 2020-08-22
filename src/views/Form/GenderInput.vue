<template>
    <section class="form-militaryservice">
        <h1 class="militaryservice-title isansFont">
            مشخصات فردی
            <i class="material-icons">help_outline</i>
        </h1>
        <div class="militaryservice-wrapper isansFont">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-have" type="radio" name="militaryservice"
                   value="female">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-donthave" type="radio"
                   name="militaryservice" value="male">
            <label for="militaryservice-have" class="militaryservice-holder"
                   :class="[{'holder--selected': selectedEducationalGapStatus == 'female'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'female'">done</i>
                <img draggable="false" src="/sneedsAssets/img/female.svg" class="militaryservice-holder-image"
                     alt="دارای وقفه تحصیلی">
                <p class="militaryservice-holder-text">خانم</p>
            </label>
            <label for="militaryservice-donthave" class="militaryservice-holder"
                   :class="[{'holder--selected': selectedEducationalGapStatus == 'male'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'male'">done</i>
                <img draggable="false" src="/sneedsAssets/img/male.svg" class="militaryservice-holder-image"
                     alt="عدم وقفه تحصیلی">
                <p class="militaryservice-holder-text">آقا</p>
            </label>
        </div>
        <div class="inputs">
            <c-number-input class="edu-gap" :step="1"
                            :error="$v.gapYears.$error"
                            error-text="سن باید عدد صحیح بین 15 تا 100 باشد."
                            v-model="gapYears"
                            label="سال سن"/>
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    import {required, minValue, maxValue, integer} from 'vuelidate/lib/validators'
    export default {
        name: 'GenderInput',
        components: {
            "c-number-input": NumberInput
        },
        validations: {
            gapYears: {required, integer, minValue: minValue(15), maxValue: maxValue(100)}
        },
        data() {
            return {
                selectedEducationalGapStatus: null,
                gapYears: 18
            }
        },
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = Number(newGapYear);
            },
            init() {
                console.log('in ms input', this.detailedForm);
                if (this.detailedForm) {
                    this.selectedEducationalGapStatus = this.detailedForm.gender == "MALE" ? 'male' : 'female'
                    this.setGapYears(this.detailedForm.age)
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
                this.$v.$touch();
                this.$store.commit('setDetailedFormProperty', {prop: 'age', value: newVal})
                this.$store.commit('setAgeIsValid', !this.$v.gapYears.$error)
            },
            selectedEducationalGapStatus(newVal) {
                console.log(newVal);
                if(newVal != null) {
                    this.$store.commit('setDetailedFormProperty', {prop: 'gender', value: newVal == 'male' ? 'MALE' : 'FEMALE'})
                } else {
                    this.$store.commit('setDetailedFormProperty', {prop: 'gender', value: null})
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
    }

    .militaryservice-wrapper {
        display: flex;
    }

    .militaryservice-holder {
        width: calc(100% - 360px);
        max-width: 335px;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 3px 26px rgba(0, 0, 0, 0.1);
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

    .militaryservice-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
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