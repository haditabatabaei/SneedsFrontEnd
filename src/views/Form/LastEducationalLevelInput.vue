<template>
    <section class="form-edulevel">
        <transition name="fade">
            <div class="modal-confirm-overlay" v-if="showConfirm" @click.self="showConfirm = false">
                <div class="modal-confirm">
                    <button class="modal-confirm-close" @click="showConfirm = false"><i class="material-icons">close</i></button>
                    <h2 class="modal-confirm-title">
                        <i class="material-icons-outlined">info</i>
                        Notice, Your form is empty.
                    </h2>
                    <p class="modal-confirm-text">
                        You are about to leave this page without adding an academic degree, you can add and edit multiple academic degrees later.
                    </p>
                    <div class="modal-confirm-action">
                        <button class="modal-confirm-button confirm--close" @click="startPayloadProcess">No!, Stay, I want to add</button>
                        <button class="modal-confirm-button confirm--next" @click="bypassEducation">I consent, continue</button>
                    </div>
                </div>
            </div>
        </transition>

        <h1 class="edulevel-title">
            <i class="material-icons">help_outline</i>
            Add an academic degree
        </h1>
        <div class="edulevel-wrapper">
            <c-dropdown-input class="edulevel-input" label="Academic degree level"
                              :error="$v.selectedGrade.$error"
                              error-text="Please provide a valid option."
                              :options="gradeOptions"
                              @select-option="gradeSelected" />

            <c-searchable-input class="edulevel-input" :loading="majorLoading"
                                :error="$v.selectedMajor.$error"
                                error-text="Please provide a valid option."
                                @input="searchMajorByVal"
                                label="Major"
                                :dataset="availableMajors"
                                @select-option="setSelectedMajor" />

            <c-searchable-input class="edulevel-input" :loading="uniLoading"
                                :error="$v.selectedUniversity.$error"
                                error-text="Please provide a valid university"
                                @input="searchUniversityByVal"
                                label="University"
                                :dataset="availableUniversities"
                                @select-option="setSelectedUniversity" />

            <c-number-input class="edulevel-input"
                            @set-parent-value="val => gpa = val"
                            :error="$v.gpa.$error"
                            error-text="GPA must be a number between 0 and 20"
                            :defaultValue="gpa"
                            :step="0.25"
                            label="GPA (out of 20)"
                            :has-keys="false"
                            v-model="gpa"
                            />

            <c-number-input class="edulevel-input" :defaultValue="2020"
                            @set-parent-value="val => graduateIn = val"
                            :error="$v.graduateIn.$error"
                            error-text="Your graduate year must be an integer between 1980 and 2100"
                            label="Graduate year"
                            :max-value="2100"
                            :default-value="graduateIn"
                            v-model="graduateIn"
                            />

            <c-simple-input class="edulevel-input"
                            label="Thesis title"
                            :externalLabel="false"
                            :error="$v.thesisTitle.$error"
                            error-text="Thesis title can have 512 characters at max."
                            v-model="thesisTitle"
                            />
        </div>
    </section>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput";
    import NumberInput from "@/components/Form/NumberInput";
    import SearchableInput from "@/components/Form/SearchableInput";
    import SimpleInput from "@/components/Form/SimpleInput";
    import {required, minValue, maxValue, integer, maxLength} from 'vuelidate/lib/validators'
    const gradeValidator = (input, vm) => {
        return input != null && vm.gradeOptions.some(item => item.nameEnglish === input.nameEnglish);
    }
    export default {
        name: "LastEducationalLevel",
        components: {
            "c-number-input": NumberInput,
            "c-dropdown-input": DropdownInput,
            "c-searchable-input": SearchableInput,
            "c-simple-input": SimpleInput
        },
        validations: {
            selectedGrade: {required, gradeValidator},
            selectedMajor: {required},
            selectedUniversity: {required},
            graduateIn: {required, integer, minValue: minValue(1980), maxValue: maxValue(2100)},
            thesisTitle: {maxLength: maxLength(512)},
            gpa: {required, minValue: minValue(0), maxValue: maxValue(20)},
        },
        data() {
            return {
                hasLevel: true,
                availableMajors: [],
                availableUniversities: [],
                selectedGrade: null,
                selectedMajor: null,
                selectedUniversity: null,
                thesisTitle: null,
                gpa: 16.5,
                graduateIn: 2021,
                majorLoading: false,
                uniLoading: false,
                gradeOptions: [
                    {name: 'Bachelor', nameEnglish: 'BACHELOR'},
                    {name: 'Master', nameEnglish: 'MASTER'},
                    {name: 'Doctorate', nameEnglish: 'PHD'},
                    {name: 'Ph.D', nameEnglish: 'POST_DOC'}
                ],

                showConfirm: false,
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

            isEducationValid() {
                return this.$store.getters.isEducationValid
            },

            addEducationPermission() {
                return this.$store.getters.addEducationPermission
            },

            educationToAdd() {
                return this.$store.getters.educationToAdd
            },

            wantsToAddEducation() {
                return this.$store.getters.wantsToAddEducation
            },

            isFormEmpty() {
                return this.selectedMajor == null && this.selectedGrade == null && this.selectedUniversity == null;
            }
        },
        watch: {
            addEducationPermission(newVal, oldVal) {
                if(newVal == true && oldVal == false) {
                    console.log('add educational level permission toggled to true')
                    this.createPayload();
                    if(this.wantsToAddEducation) {
                        console.log('wants to add education')
                        if(this.isEducationValid) {
                            console.log('payload is set and is valid, ping education handler')
                            this.pingEducationHandler();
                        } else {
                            //show warn notif on bad input
                            this.$notify({
                                group: 'notif',
                                title: 'مقطع تحصیلی: اخطار',
                                text: 'لطفاً ورودی های مقطع تحصیلی را کنترل کنید.',
                                type: 'warn',
                                duration: 3000
                            })
                        }
                    } else {
                        this.pingEducationHandler();
                    }
                }
                this.$store.commit('setAddEducationPermission', false)
            }
        },
        methods: {
            bypassEducation() {
                this.$store.commit('setWantsToAddEducation', false);
                this.$store.commit('setIsEducationValid', false);
                this.$store.commit('setEducationToAdd', null);
                this.pingEducationHandler();
            },

            startPayloadProcess() {
                this.showConfirm = false;
                this.$v.$touch();
                this.$store.commit('setWantsToAddEducation', true)
                console.log('is form error ?', this.$v.$error)
                if(!this.$v.$error) {
                    let payload = {
                        student_detailed_info: this.detailedForm.id,
                        university: this.selectedUniversity.id,
                        grade: this.selectedGrade.nameEnglish,
                        major: this.selectedMajor.id,
                        thesis_title: this.thesisTitle,
                        graduate_in: this.graduateIn,
                        gpa: this.gpa
                    }
                    this.$store.commit('setIsEducationValid', true);
                    this.$store.commit('setEducationToAdd', payload);
                } else {
                    this.$store.commit('setIsEducationValid', false)
                }
            },
            createPayload() {
                //check if form is empty
                console.log('is this empty? ', this.isFormEmpty)
                if(this.isFormEmpty) {
                    this.showConfirm = true;
                } else {
                    this.startPayloadProcess();
                }

            },

            pingEducationHandler() {
                this.$emit("education-add")
            },

            async searchMajorByVal(query) {
                try {
                    if(!!query && query.length > 3) {
                        console.log('search by ', query);
                        this.majorLoading = true;
                        this.availableMajors = (await this.$api.get(`${this.api}/account/form-field-of-studies/?&search=${query}`, this.httpConfig)).data;
                        // this.dataset.filter(item => item.name.includes(query));
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
                    if(!!query && query.length > 3) {
                        this.uniLoading = true;
                        console.log('search by ', query);
                        this.availableUniversities = (await this.$api.get(`${this.api}/account/form-universities/?&search=${query}`, this.httpConfig)).data;
                        // this.dataset.filter(item => item.name.includes(query));
                    } else {
                        return this.availableUniversities = [];
                    }
                } catch (e) {

                } finally {
                    this.uniLoading = false;
                }
            },

            setSelectedMajor(item) {
                this.selectedMajor = item;
                console.log(item);
            },

            setSelectedUniversity(item) {
                this.selectedUniversity = item;
                console.log(item)
            },

            gradeSelected(grade) {
                this.selectedGrade = grade;
                console.log(this.selectedGrade);
            }
        },
        created() {
            this.$store.commit('setWantsToAddEducation', true)
        }
    }
</script>

<style scoped>
    .form-edulevel {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .edulevel-title {
        color: #173F5F;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin: 20px;
    }

    .edulevel-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
    }

    .edulevel-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .edulevel-input {
        width: calc(50% - 40px);
        margin: 10px 20px;
    }

    .edulevel-add {
        align-self: flex-end;
        margin-left: 20px;
        border-radius: 5px;
        border: none;
        padding: 7px 30px;
        color: white;
        background-color: #00bfa5;
        transition: all 200ms ease-in-out;
    }

    .edulevel-add:hover {
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
        .edulevel-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
            align-items: stretch;
        }

        .edulevel-input {
            width: auto;
            matgin: 10px 0;
        }
    }
</style>