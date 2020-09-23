<template>
    <section class="form-destination gadugiFont">
        <transition name="fade">
            <div class="modal-confirm-overlay" v-if="showConfirm" @click.self="showConfirm = false">
                <div class="modal-confirm">
                    <button class="modal-confirm-close" @click="showConfirm = false"><i class="material-icons">close</i></button>
                    <h2 class="modal-confirm-title">
                        <i class="material-icons-outlined">info</i>
                        Notice, your form is empty!
                    </h2>
                    <p class="modal-confirm-text">
                        You are about to leave this page without submitting a destination, you can add and edit multiple destinations later.
                    </p>
                    <div class="modal-confirm-action">
                        <button class="modal-confirm-button confirm--close" @click="startPayloadProcess">No!, Stay, I want to add</button>
                        <button class="modal-confirm-button confirm--next" @click="bypassDestination">I consent, continue</button>
                    </div>
                </div>
            </div>
        </transition>
        <h1 class="destination-title">
            <i class="material-icons">help_outline</i>
            Where is your destination?
        </h1>
        <div class="form-destination-wrapper">
            <div class="destination-input-wrapper">
                <c-searchable-input class="dest-input"
                                    :error="$v.selectedCountries.$error"
                                    error-text="Please select at least one country."
                                    :clearselect="true"
                                    :loading="countryLoading"
                                    @input="searchCountryByVal"
                                    label="Destination country"
                                    :dataset="availableCountries"
                                    @select-option="addCountry"/>
                <div class="selected-items isansFont" v-if="selectedCountries.length > 0">
                    <div class="selected-items-list">
                        <p class="selected-item item--valid" v-for="country in selectedCountries">
                            {{country.name}}
                            <button class="selected-item-remove" @click="removeSelectedCountry(country)"><i
                                    class="material-icons">close</i></button>
                        </p>
                    </div>
                </div>
            </div>

            <div class="destination-input-wrapper">
                <c-dropdown class="dest-input"
                            :clear-select="true"
                            label="Destination academic level"
                            :options="gradeOptions"
                            @select-option="addGrade"/>
                <div class="selected-items" v-if="selectedGrades.length > 0">
                    <div class="selected-items-list">
                        <p class="selected-item item--valid" v-for="grade in selectedGrades">
                            {{grade.name}}
                            <button class="selected-item-remove" @click="removeSelectedGrade(grade)"><i class="material-icons">close</i>
                            </button>
                        </p>
                    </div>
                </div>

            </div>


            <div class="destination-input-wrapper">
                <c-dropdown class="dest-input"
                            :error="$v.selectedSemesters.$error"
                            error-text="Please select at least one semester."
                            :clear-select="true"
                            label="Apply semester"
                            :options="semesterOptions"
                            @select-option="addSemester"/>

                <div class="selected-items" v-if="selectedSemesters.length > 0">
                    <div class="selected-items-list">
                        <p class="selected-item item--valid" v-for="semester in selectedSemesters">
                            {{semester.year}} {{semester.semester}}
                            <button class="selected-item-remove" @click="removeSelectedSemester(semester)"><i
                                    class="material-icons">close</i></button>
                        </p>
                    </div>
                </div>
            </div>

            <div class="destination-input-wrapper">
                <c-searchable-input class="dest-input"
                                    :loading="majorLoading"
                                    :clearselect="true"
                                    @input="searchMajorByVal"
                                    label="Destination major"
                                    :dataset="availableMajors"
                                    @select-option="addMajor"/>
                <div class="selected-items" v-if="selectedMajors.length > 0">
                    <div class="selected-items-list">
                        <p class="selected-item item--valid" v-for="major in selectedMajors">
                            {{major.name}}
                            <button class="selected-item-remove" @click="removeSelectedMajor(major)"><i class="material-icons">close</i>
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div class="destination-input-wrapper">
                <c-searchable-input class="dest-input"
                                    :loading="uniLoading"
                                    :clearselect="true"
                                    @input="searchUniversityByVal"
                                    label="Destination university"
                                    :dataset="availableUniversities"
                                    @select-option="addSelectedUniversity"/>
                <div class="selected-items" v-if="selectedUniversities.length > 0">
                    <div class="selected-items-list">
                        <p class="selected-item item--valid" v-for="uni in selectedUniversities">
                            {{uni.name}}
                            <button class="selected-item-remove" @click="removeSelectedUni(uni)"><i
                                    class="material-icons">close</i></button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import SearchableInput from "@/components/Form/SearchableInput.vue";
    import DropdownInput from "@/components/Form/DropdownInput.vue";
    import {minLength, required} from 'vuelidate/lib/validators'
    import destination from "../../state/destination";

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
                gradeOptions: [],
                selectedGrades: [],
                selectedMajors: [],
                selectedCountries: [],
                selectedSemesters: [],
                selectedUniversities: [],

                destination: null,

                majorLoading: false,
                uniLoading: false,
                countryLoading: false,

                showConfirm: false
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
            },

            wantsToAddDestination() {
                return this.$store.getters.wantsToAddDestination;
            },

            isFormEmpty() {
                return this.selectedSemesters.length == 0 &&
                        this.selectedCountries.length == 0 &&
                        this.selectedUniversities.length == 0 &&
                        this.selectedMajors.length == 0 &&
                        this.selectedGrades.length == 0
            }
        },
        watch: {
            destinationAddPermission(newValue, oldValue) {
                console.log(`change from ${oldValue} to ${newValue}`)
                if(oldValue == false && newValue == true) {
                    this.createPayload();
                    if(this.wantsToAddDestination) {
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
                    } else {
                        this.pingEducationHandler();
                    }
                }
                this.$store.commit('setDestinationAddPermission', false)
            }
        },
        methods: {
            startPayloadProcess() {
                this.showConfirm = false;
                this.$v.$touch();
                this.$store.commit('setWantsToAddDestination', true)
                if(!this.$v.$error) {
                    this.$store.commit('setIsDestinationValid', true)
                    let payload = {
                        student_detailed_info: this.detailedFormId,
                        countries: this.selectedCountries.map(country => country.id),
                        universities: this.selectedUniversities.map(uni => uni.id),
                        grades: this.selectedGrades.map(grade => grade.id),
                        majors: this.selectedMajors.map(major => major.id),
                        semester_years: this.selectedSemesters.map(semester => semester.id),
                    }
                    if(this.destination) {
                        //if has prev destination, we should add id for put http request locator. this equals to this.$store.getters.hasPrevDestination
                        payload.id = this.destination.id
                    }
                    this.$store.commit('setDestination', payload);
                    console.log('destination payload ', payload);
                } else {
                    this.$store.commit('setIsDestinationValid', false)
                }
            },

            bypassDestination() {
                this.$store.commit('setWantsToAddDestination', false);
                this.$store.commit('setIsDestinationValid', false);
                this.$store.commit('setDestination', null);
                this.pingDestinationHandler();
            },

            pingDestinationHandler() {
                this.$emit('destination-add');
            },

            createPayload() {
                if(this.isFormEmpty) {
                    this.showConfirm = true;
                } else {
                    this.startPayloadProcess();
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
                let dupIndex = this.selectedGrades.findIndex(currentGrade => currentGrade.id == grade.id);
                if (dupIndex === -1) {
                    this.selectedGrades.push(grade)
                } else {
                    console.log('duplicate grade')
                }
            },

            removeSelectedGrade(grade) {
                this.selectedGrades = this.selectedGrades.filter(currentGrade => currentGrade.id != grade.id);
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
            },

            async getDestination() {
                // this.loading = true;
                try {
                    let result = await this.$api.get(`${this.api}/account/want-to-applies/?student-detailed-info=${this.detailedFormId}`, this.httpConfig);
                    this.destination = result.data[0];
                    this.selectedCountries = this.destination.countries;
                    this.selectedMajors = this.destination.majors;
                    this.selectedGrades = this.destination.grades;
                    this.selectedUniversities = this.destination.universities;
                    this.selectedSemesters = this.destination.semester_years;

                    this.$store.commit('setHasPrevDestination', !!this.destination)

                    console.log('destination result ', result.data)
                } catch (e) {
                    console.log(e)
                } finally {
                    // this.loading = false;
                }
            },

            async getGrades() {
                try {
                    let result = await this.$api.get(`${this.api}/account/grades/`, this.httpConfig);
                    this.gradeOptions = result.data;
                    console.log(result);
                } catch (e) {

                } finally {

                }
            }
        },
        created() {
            this.getSemesters();
            this.getGrades();
            this.getDestination();
            this.$store.commit('setWantsToAddDestination', true);
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

    .destination-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
    }

    .form-destination-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .destination-input-wrapper {
        width: calc(50% - 40px);
        display: flex;
        flex-direction: column;
        margin: 0 20px 20px 0;
    }

    .dest-input {
    }

    .selected-items {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        margin: 5px 0;
    }

    .selected-items-title {
        font-size: 14px;
        color: #0F4775;
        margin: 0 0 10px 0;
    }

    .selected-items-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .selected-item {
        border-radius: 10px;
        padding: 1px 5px 1px 17px;
        font-size: 12px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        margin: 5px 0 0 5px;
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

    .modal-confirm-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 14;
        background: rgba(0,0,0,0.3);
    }

    .modal-confirm {
        width: 80%;
        max-width: 800px;
        background-color: white;
        border-radius: 8px;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .modal-confirm-close {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #B3B3B3;
        background: none;
        border: none;
    }

    .modal-confirm-title {
        color: #303143;
        display: flex;
        align-items: center;
        font-size: 22px;
        margin: 50px 60px 0 60px;
        font-weight: bold;
    }

    .modal-confirm-title i {
        color: #585858;
        margin-left: 5px;
    }

    .modal-confirm-text {
        margin: 10px 60px 0 60px;
        color: #9B9999;
    }

    .modal-confirm-action {
        display: flex;
        align-self: flex-end;
        margin: 20px;
    }

    .modal-confirm-button {
        background: none;
        border: none;
        color: #707070;
        padding: 5px 17px;
        border-radius: 5px;
    }

    .confirm--next {
        color: white;
        background-color: #A347FF;
    }


    @media only screen and (max-width: 767.8px) {
        .form-destination-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
        }

        .destination-input-wrapper {
            width: calc(100% - 40px);
            margin: 0 20px 20px 20px;
        }

        .dest-input {
            width: auto;
        }
    }
</style>