<template>
    <section class="form-destination">
        <h1 class="destination-title isansFont">
            کجا می خوای بری؟
            <i class="material-icons">info</i>
        </h1>
        <div class="form-destination-wrapper">
            <c-searchable-input class="dest-input"
                                :error="$v.selectedCountries.$error"
                                error-text="انتخاب حداقل یک کشور اجباری است."
                                :clearselect="true"
                                :loading="countryLoading"
                                @input="searchCountryByVal"
                                label="کشور مقصد"
                                :dataset="availableCountries"
                                @select-option="addCountry"/>

            <c-dropdown class="dest-input"
                        :clear-select="true"
                        label="مقطع مورد نظر"
                        :options="gradeOptions"
                        @select-option="addGrade"/>

            <c-dropdown class="dest-input"
                        :error="$v.selectedSemesters.$error"
                        error-text="انتخاب حداقل یک ترم تحصیلی اجباری است."
                        :clear-select="true"
                        label="ترم مورد نظر"
                        :options="semesterOptions"
                        @select-option="addSemester"/>

            <c-searchable-input class="dest-input"
                                :loading="majorLoading"
                                :clearselect="true"
                                @input="searchMajorByVal"
                                label="رشته"
                                :dataset="availableMajors"
                                @select-option="addMajor"/>

            <c-searchable-input class="dest-input"
                                :loading="uniLoading"
                                :clearselect="true"
                                @input="searchUniversityByVal"
                                label="دانشگاه"
                                :dataset="availableUniversities"
                                @select-option="addSelectedUniversity"/>
        </div>
        <div class="selected-items isansFont" v-if="selectedMajors.length > 0">
            <h3 class="selected-items-title isansFont">رشته های انتخاب شده:</h3>
            <div class="selected-items-list">
                <p class="selected-item item--valid" v-for="major in selectedMajors">
                    {{major.name}}
                    <button class="selected-item-remove" @click="removeSelectedMajor(major)"><i class="material-icons">close</i>
                    </button>
                </p>
            </div>
        </div>
        <div class="selected-items isansFont" v-if="selectedUniversities.length > 0">
            <h3 class="selected-items-title isansFont">دانشگاه های انتخاب شده:</h3>
            <div class="selected-items-list">
                <p class="selected-item item--valid" v-for="uni in selectedUniversities">
                    {{uni.name}}
                    <button class="selected-item-remove" @click="removeSelectedUni(uni)"><i
                            class="material-icons">close</i></button>
                </p>
            </div>
        </div>
        <div class="selected-items isansFont" v-if="selectedCountries.length > 0">
            <h3 class="selected-items-title isansFont">کشور های انتخاب شده:</h3>
            <div class="selected-items-list">
                <p class="selected-item item--valid" v-for="country in selectedCountries">
                    {{country.name}}
                    <button class="selected-item-remove" @click="removeSelectedCountry(country)"><i
                            class="material-icons">close</i></button>
                </p>
            </div>
        </div>
        <div class="selected-items isansFont" v-if="selectedGrades.length > 0">
            <h3 class="selected-items-title isansFont">مقاطع انتخاب شده:</h3>
            <div class="selected-items-list">
                <p class="selected-item item--valid" v-for="grade in selectedGrades">
                    {{grade.name}}
                    <button class="selected-item-remove" @click="removeSelectedGrade(grade)"><i class="material-icons">close</i>
                    </button>
                </p>
            </div>
        </div>
        <div class="selected-items isansFont" v-if="selectedSemesters.length > 0">
            <h3 class="selected-items-title isansFont">ترم های انتخاب شده:</h3>
            <div class="selected-items-list">
                <p class="selected-item item--valid" v-for="semester in selectedSemesters">
                    {{semester.year}} {{semester.semester}}
                    <button class="selected-item-remove" @click="removeSelectedSemester(semester)"><i
                            class="material-icons">close</i></button>
                </p>
            </div>
        </div>
    </section>

</template>

<script>
    import SearchableInput from "@/components/Form/SearchableInput.vue";
    import DropdownInput from "@/components/Form/DropdownInput.vue";
    import {minLength, required} from 'vuelidate/lib/validators'

    export default {
        name: "DestinationInput",
        components: {
            "c-searchable-input": SearchableInput,
            "c-dropdown": DropdownInput
        },
        validations: {
            selectedCountries: {required, minLength: minLength(1)},
            selectedSemesters: {required, minLength: minLength(1)}
        },
        data() {
            return {
                availableMajors: [],
                availableUniversities: [],
                availableCountries: [],
                semesterOptions: [],
                gradeOptions: [
                    {name: 'کارشناسی', nameEnglish: 'BACHELOR'},
                    {name: 'کارشناسی ارشد', nameEnglish: 'MASTER'},
                    {name: 'دکتری', nameEnglish: 'PHD'},
                    {name: 'پسا دکتری', nameEnglish: 'POST_DOC'}
                ],
                selectedGrades: [],
                selectedMajors: [],
                selectedCountries: [],
                selectedSemesters: [],
                selectedUniversities: [],

                majorLoading: false,
                uniLoading: false,
                countryLoading: false,
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
            },

            destinationAddPermission() {
                return this.$store.getters.destinationAddPermission
            },

            isDestinationValid() {
                return this.$store.getters.isDestinationValid
            }
        },
        watch: {
            destinationAddPermission(newValue, oldValue) {
                console.log(`change from ${oldValue} to ${newValue}`)
                if(oldValue == false && newValue == true) {
                    this.createPayload();
                    if(this.isDestinationValid) {
                        this.pingDestinationHandler()
                    } else {
                        this.$notify({
                            group: 'notif',
                            title: 'مقصد: اخطار',
                            text: 'لطفاً ورودی های مقصد را کنترل کنید.',
                            type: 'warn',
                            duration: 3000
                        })
                    }
                }
                this.$store.commit('setDestinationAddPermission', false)
            }
        },
        methods: {
            pingDestinationHandler() {
                this.$emit('destination-add');
            },

            createPayload() {
                this.$v.$touch();
                if(!this.$v.$error) {
                    this.$store.commit('setIsDestinationValid', true)
                    let payload = {
                        student_detailed_info: this.detailedFormId,
                        countries: this.selectedCountries.map(country => country.id),
                        universities: this.selectedUniversities.map(uni => uni.id),
                        grades: this.selectedGrades.map(grade => grade.nameEnglish),
                        majors: this.selectedMajors.map(major => major.id),
                        semester_years: this.selectedSemesters.map(semester => semester.id)
                    }
                    this.$store.commit('setDestination', payload);
                    console.log('destination payload ', payload);
                } else {
                    this.$store.commit('setIsDestinationValid', false)
                }
            },

            async searchCountryByVal(query) {
                try {
                    if (!!query && query.length > 1) {
                        this.countryLoading = true;
                        this.availableCountries = (await this.$api.get(`${this.api}/account/countries/?&search=${query}`, this.httpConfig)).data;
                    } else {
                        return this.availableCountries = [];
                    }
                } catch (e) {

                } finally {
                    this.countryLoading = false;
                }
            },
            async searchMajorByVal(query) {
                try {
                    if (!!query && query.length > 1) {
                        this.majorLoading = true;
                        this.availableMajors = (await this.$api.get(`${this.api}/account/form-field-of-studies/?&search=${query}`, this.httpConfig)).data;
                    } else {
                        return this.availableMajors = [];
                    }
                } catch (e) {

                } finally {
                    this.majorLoading = false;
                }
            },
            async searchUniversityByVal(query) {
                try {
                    if (!!query && query.length > 1) {
                        this.uniLoading = true;
                        this.availableUniversities = (await this.$api.get(`${this.api}/account/form-universities/?&search=${query}`, this.httpConfig)).data;
                    } else {
                        return this.availableUniversities = [];
                    }
                } catch (e) {

                } finally {
                    this.uniLoading = false;
                }
            },
            addCountry(country) {
                let dupIndex = this.selectedCountries.findIndex(currentCountry => currentCountry.id == country.id);
                if (dupIndex === -1) {
                    this.selectedCountries.push(country)
                } else {
                    console.log('duplicate country')
                }
            },
            addGrade(grade) {
                let dupIndex = this.selectedGrades.findIndex(currentGrade => currentGrade.nameEnglish == grade.nameEnglish);
                if (dupIndex === -1) {
                    this.selectedGrades.push(grade)
                } else {
                    console.log('duplicate grade')
                }
            },

            removeSelectedGrade(grade) {
                this.selectedGrades = this.selectedGrades.filter(currentGrade => currentGrade.nameEnglish != grade.nameEnglish);
            },

            removeSelectedSemester(semester) {
                this.selectedSemesters = this.selectedSemesters.filter(currentSemester => currentSemester.id != semester.id);
            },

            removeSelectedCountry(country) {
                this.selectedCountries = this.selectedCountries.filter(currentCountry => currentCountry.id != country.id);
            },

            removeSelectedMajor(major) {
                this.selectedMajors = this.selectedMajors.filter(currentMajor => currentMajor.id != major.id);
            },


            addMajor(major) {
                let dupIndex = this.selectedMajors.findIndex(currentMajor => currentMajor.id == major.id);
                if (dupIndex === -1) {
                    this.selectedMajors.push(major)
                } else {
                    console.log('duplicate major')
                }
            },

            addSemester(semester) {
                let dupIndex = this.selectedSemesters.findIndex(currentSemester => currentSemester.id == semester.id);
                if (dupIndex === -1) {
                    this.selectedSemesters.push(semester)
                } else {
                    console.log('duplicate semester')
                }
            },


            addSelectedUniversity(uni) {
                let dupIndex = this.selectedUniversities.findIndex(currentUni => currentUni.id == uni.id);
                if (dupIndex == -1) {
                    this.selectedUniversities.push(uni)
                } else {
                    console.log('duplicate uni to add')
                }
            },
            removeSelectedUni(uni) {
                this.selectedUniversities = this.selectedUniversities.filter(currentUni => currentUni.id != uni.id);
            },
            async getSemesters() {
                try {
                    let result = await this.$api.get(`${this.api}/account/apply-semester-years/`, this.httpConfig);
                    this.semesterOptions = result.data.map(semesterObj => {
                        return {
                            ...semesterObj,
                            name: `${semesterObj.semester} ${semesterObj.year}`
                        }
                    })
                    console.log(this.semesterOptions);
                } catch (e) {

                } finally {

                }
            }
        },
        created() {
            this.getSemesters();
            this.$store.commit('setWantsToAddCert', false);
        }
    }
</script>

<style scoped>
    .form-destination {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .destination-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .form-destination-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .dest-input {
        width: calc(50% - 40px);
        margin: 0 20px 20px 20px;
    }

    .selected-items {
        width: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 5px 20px;
    }

    .selected-items-title {
        font-size: 14px;
        color: #0F4775;
        margin: 0 0 10px 0;
    }

    .selected-items-list {
        display: flex;
        align-items: center;
    }

    .selected-item {
        border-radius: 10px;
        padding: 1px 5px 1px 17px;
        font-size: 12px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        margin: 0 5px;
    }

    .selected-item.item--valid {
        background-color: #DDF3FC;
        border: 1px solid #00D4ED;
        color: #009FB3;
    }

    .selected-item-remove {
        border: none;
        background: none;
        color: #00BFD6;
    }

    .selected-item-remove i {
        font-size: 18px;
    }

    .destination-add {
        align-self: flex-end;
        margin-left: 20px;
        border-radius: 5px;
        border: none;
        padding: 7px 30px;
        color: white;
        background-color: #00bfa5;
        transition: all 200ms ease-in-out;
    }

    .destination-add:hover {
        border-bottom: 3px solid #00a992;
    }

    @media only screen and (max-width: 767.8px) {
        .form-destination-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
        }

        .dest-input {
            width: auto;
        }
    }
</style>