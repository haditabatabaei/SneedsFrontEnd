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
                                @input="searchMajorByVal"
                                label="رشته"
                                :dataset="availableMajors"
                                @select-option="setSelectedMajor" />

            <c-searchable-input class="edulevel-input" :loading="uniLoading"
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
        <button @click="addUniversityThrough" class="edulevel-add isansFont">ایجاد مقطع</button>
    </section>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput";
    import NumberInput from "@/components/Form/NumberInput";
    import SearchableInput from "@/components/Form/SearchableInput";
    import SimpleInput from "@/components/Form/SimpleInput";
    import {required, minValue, maxValue, integer, maxLength} from 'vuelidate/lib/validators'
    const gradeValidator = (input, vm) => {
        return vm.gradeOptions.some(item => item.nameEnglish === input.nameEnglish);
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
            graduateIn: {required, integer, minValue: minValue(1980), maxValue: maxValue(2100)},
            thesisTitle: {maxLength: maxLength(512)},
            gpa: {required, minValue: minValue(0), maxValue: maxValue(20)},
            selectedMajor: {required, }
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
            }
        },
        methods: {
            async addUniversityThrough() {
                if(this.detailedForm && this.gpa != null && this.graduateIn != null && this.selectedGrade != null && this.selectedMajor != null && this.selectedUniversity != null) {
                    let payload = {
                        student_detailed_info: this.detailedForm.id,
                        university: this.selectedUniversity.id,
                        grade: this.selectedGrade.nameEnglish,
                        major: this.selectedMajor.id,
                        thesis_title: this.thesisTitle,
                        graduate_in: this.graduateIn,
                        gpa: this.gpa
                    }
                    console.log(payload)
                    try {
                        let res = await this.$api.post(`${this.api}/account/student-detailed-university-throughs/`, payload, this.httpConfig);
                        this.$emit('edulevel-add', res);
                    } catch (e) {
                        console.log(e);
                    } finally {

                    }
                }
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

            setGpa(gpa) {
                this.gpa = gpa;
            },

            setGraduateIn(graduateIn) {
                this.graduateIn = graduateIn;
            },

            setThesisTitle(title) {
                this.thesisTitle = title;
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