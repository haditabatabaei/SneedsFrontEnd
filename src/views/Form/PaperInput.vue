<template>
    <section class="form-militaryservice">
        <h1 class="militaryservice-title isansFont">
            مقاله علمی داری؟
            <i class="material-icons">info</i>
        </h1>
        <div class="militaryservice-wrapper isansFont">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-have" type="radio" name="militaryservice" value="have">
            <input v-model="selectedEducationalGapStatus" id="militaryservice-donthave" type="radio" name="militaryservice" value="donthave">
            <label for="militaryservice-have" class="militaryservice-holder" :class="[{'holder--selected': selectedEducationalGapStatus == 'have'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'have'">done</i>
                <img draggable="false" src="/sneedsAssets/img/paper.svg" class="militaryservice-holder-image" alt="مقاله علمی دارم">
                <p class="militaryservice-holder-text">مقاله دارم</p>
            </label>
            <label for="militaryservice-donthave" class="militaryservice-holder" :class="[{'holder--selected': selectedEducationalGapStatus == 'donthave'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedEducationalGapStatus == 'donthave'">done</i>
                <img draggable="false" src="/sneedsAssets/img/no-paper.svg" class="militaryservice-holder-image" alt="مقاله علمی ندارم">
                <p class="militaryservice-holder-text">مقاله ندارم</p>
            </label>
        </div>
        <div class="inputs" v-if="selectedEducationalGapStatus == 'have'">
            <c-dropdown-input class="edu-gap" label="نوع مقاله"
                              :error="$v.selectedType.$invalid"
                              error-text="لطفاً نوع مقاله را به درستی انتخاب کنید."
                              :options="typeOptions" @select-option="setType" />
            <c-simple-input class="edu-gap" label="عنوان مقاله" @
                            :error="$v.title.$invalid"
                            error-text="عنوان مقاله الزامی است."
                            @input="setTitle" />
            <c-number-input class="edu-gap" :step="1"
                            :error="$v.gapYears.$invalid"
                            error-text="مقدار وارد شده باید عدد صحیح بین 1900 و 2100 باشد."
                            :default-value="gapYears"
                            @set-number="setGapYears" label="سال پابلیش مقاله"  />
            <c-radio-group direction="column" :items="authorOptions"
                            :error="$v.selectedAuthor.$invalid"
                            error-text="لطفاً نوبت نویسنده را به درستی انتخاب کنید."
                            @select-option="setAuthor" />
            <c-dropdown-input class="edu-gap" label="شاخص تاثیر"
                              :error="$v.selectedReputation.$invalid"
                              error-text="لطفاً شاخص تاثیر مقاله را به درستی انتخاب کنید."
                              :options="reputationOptions" @select-option="setReputation" />
            <button @click="addNewPublication" class="publication-add isansFont">ایجاد مقاله جدید</button>
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    import DropdownInput from "@/components/Form/DropdownInput";
    import SimpleInput from "@/components/Form/SimpleInput";
    import RadioGroupInput from "@/components/Form/RadioGroupInput";
    import {required, between, integer, maxLength} from 'vuelidate/lib/validators';

    const validType = (input, vm) => {
        return vm.typeOptions.some(option => option.nameEnglish === input.nameEnglish)
    }

    const validReputation = (input, vm) => {
        return vm.reputationOptions.some(option => option.nameEnglish === input.nameEnglish)
    }

    const validAuthor = (input, vm) => {
         return vm.authorOptions.some(item => item.nameEnglish === input.nameEnglish);
    }

    export default {
        name: 'PaperInput',
        components: {
            "c-number-input": NumberInput,
            "c-dropdown-input": DropdownInput,
            "c-simple-input": SimpleInput,
            "c-radio-group": RadioGroupInput
        },
        validations: {
            gapYears: {required, integer, between: between(1900, 2100)},
            title: {required, maxLength: maxLength(100)},
            selectedType: {required, validType},
            selectedReputation: {required, validReputation},
            selectedAuthor: {required, validAuthor}
        },
        data() {
            return {
                selectedEducationalGapStatus: null,
                gapYears: 1900,
                selectedType: null,
                selectedAuthor: null,
                selectedReputation: null,
                title: null,
                typeOptions: [
                    {name: 'ژورنالی', nameEnglish: 'JOURNAL'},
                    {name: 'کنفرانسی', nameEnglish: 'CONFERENCE'}
                ],

                authorOptions: [
                    {name: 'نویسنده اول', nameEnglish: 'FIRST'},
                    {name: 'نویسنده دوم', nameEnglish: 'SECOND'},
                    {name: 'نویسنده سوم', nameEnglish: 'THIRD'},
                    {name: 'نویسنده چهارم به بعد', nameEnglish: 'FOURTH_OR_MORE'},
                ],

                reputationOptions: [
                    {name: 'یک تا سه', nameEnglish: 'ONE_TO_THREE'},
                    {name: 'چهار تا ده', nameEnglish: 'FOUR_TO_TEN'},
                    {name: 'بیش از 10', nameEnglish: 'ABOVE_TEN'},
                ]
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            detailedFormId() {
                return this.$store.getters.detailedFormId;
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
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = Number(newGapYear);
            },
            async addNewPublication() {
                if(this.selectedAuthor != null && this.selectedReputation != null && this.selectedType != null) {
                    let payload = {
                        student_detailed_info: this.detailedFormId,
                        title: this.title,
                        publish_year: this.gapYears,
                        which_author: this.selectedAuthor.nameEnglish,
                        type: this.selectedType.nameEnglish,
                        journal_reputation: this.selectedReputation.nameEnglish
                    }
                    console.log('add new publication' , payload)
                    let result = await this.$api.post(`${this.api}/account/publications/`, payload, this.httpConfig)
                    console.log(result);
                } else {
                    console.log('bad input')
                }
            },
            setType(type) {
                this.selectedType = type;
            },
            setTitle(title) {
                this.title = title;
            },
            setAuthor(authorType) {
                this.selectedAuthor = authorType
            },
            setReputation(reputation) {
                this.selectedReputation = reputation;
            },
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
        display: flex;
        flex-direction: column;
        width: calc(50% - 45px);
    }

    .edu-gap {
        width: 100%;
        margin-top: 10px;
    }

    .edu-gap:first-child {
        margin-top: 0;
    }

    .publication-add {
        color: white;
        background-color: #00bfa5;
        border-radius: 5px;
        border: none;
        padding: 7px 30px;
        transition: all 200ms ease-in-out;
        margin-top: 10px;
    }

    .publication-add:hover {
        border-bottom: 3px solid #00a992;
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

        .inputs {
            width: auto;
        }
    }
</style>