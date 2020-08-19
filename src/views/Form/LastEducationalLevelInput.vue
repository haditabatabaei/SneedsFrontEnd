<template>
    <section class="form-edulevel">
        <h1 class="edulevel-title isansFont">
            مقطع تحصیلی
            <i class="material-icons">info</i>
        </h1>
        <div class="edulevel-wrapper">
            <c-dropdown-input class="edulevel-input" label="مقطع تحصیلی"
                              :error="$v.selectedGrade.$error"
                              error-text="لطفاً یک مقطع تحصیلی معتبر وارد کنید."
                              :options="gradeOptions"
                              @select-option="gradeSelected" />

            <c-searchable-input class="edulevel-input" :loading="majorLoading"
                                :error="$v.selectedMajor.$error"
                                error-text="لطفاً یک رشته معتبر وارد کنید."
                                @input="searchMajorByVal"
                                label="رشته"
                                :dataset="availableMajors"
                                @select-option="setSelectedMajor" />

            <c-searchable-input class="edulevel-input" :loading="uniLoading"
                                :error="$v.selectedUniversity.$error"
                                error-text="لطفاً یک دانشگاه معتبر وارد کنید."
                                @input="searchUniversityByVal"
                                label="دانشگاه"
                                :dataset="availableUniversities"
                                @select-option="setSelectedUniversity" />

            <c-number-input class="edulevel-input"
                            :error="$v.gpa.$error"
                            error-text="معدل کل باید عدد بین 0 تا 20 باشد."
                            :defaultValue="gpa"
                            :step="0.25"
                            label="معدل از 20"
                            :has-keys="false"
                            v-model="gpa"
                            />

            <c-number-input class="edulevel-input" :defaultValue="2020"
                            :error="$v.graduateIn.$error"
                            error-text="سال فارغ التحصیلی باید به میلادی و عدد صحیح بین 1980 و 2100 باشد."
                            label="سال فراغت از تحصیل"
                            :max-value="2100"
                            :default-value="graduateIn"
                            v-model="graduateIn"
                            />

            <c-simple-input class="edulevel-input" label="عنوان پایان نامه"
                            :error="$v.thesisTitle.$error"
                            error-text="عنوان پایان نامه باید حداکثر 512 کاراکتر باشد."
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
                    {name: 'کارشناسی', nameEnglish: 'BACHELOR'},
                    {name: 'کارشناسی ارشد', nameEnglish: 'MASTER'},
                    {name: 'دکتری', nameEnglish: 'PHD'},
                    {name: 'پسا دکتری', nameEnglish: 'POST_DOC'}
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
            createPayload() {
                //check if form is empty
                console.log('is this empty? ', this.isFormEmpty)
                if(this.isFormEmpty) {
                    if(window.confirm('شما اطلاعات مقطع خود را وارد نکردید، می توانید آن را وارد کنید و یا به مرحله بعد بروید، در هر حالت می توانید باز به این صفحه برگردید، برای پریدن از روی این صفحه مطمئنید؟')) {
                        this.$store.commit('setWantsToAddEducation', false);
                        this.$store.commit('setIsEducationValid', false);
                        this.$store.commit('setEducationToAdd', null)
                    } else {
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
                    }
                } else {
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
                }

            },

            pingEducationHandler() {
                this.$emit("education-add")
            },

            async addUniversityThrough() {
                //TODO:
                /*
                Handle university through like certs and destination by creating a default store, set payload and then ping analysis layout for action.
                 */
                // if(this.detailedForm && this.gpa != null && this.graduateIn != null && this.selectedGrade != null && this.selectedMajor != null && this.selectedUniversity != null) {
                //     let payload = {
                //         student_detailed_info: this.detailedForm.id,
                //         university: this.selectedUniversity.id,
                //         grade: this.selectedGrade.nameEnglish,
                //         major: this.selectedMajor.id,
                //         thesis_title: this.thesisTitle,
                //         graduate_in: this.graduateIn,
                //         gpa: this.gpa
                //     }
                //     console.log(payload)
                //     try {
                //         let res = await this.$api.post(`${this.api}/account/student-detailed-university-throughs/`, payload, this.httpConfig);
                //         this.$emit('edulevel-add', res);
                //     } catch (e) {
                //         console.log(e);
                //     } finally {
                //
                //     }
                // }
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
        margin-right: 5px;
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