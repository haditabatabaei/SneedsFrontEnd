<template>
    <section class="package-form">

    </section>
</template>

<script>
    import {required, decimal, between, minLength, maxLength} from 'vuelidate/lib/validators'

    const isBoolean = (value, vm) => typeof value === 'boolean';
    const gradLevels = (value, vm) => vm.gradeLevels.some(level => level.value === value);
    const continent = (value, vm) => vm.continents.some(level => level.value === value);
    const languageLevel = (value, vm) => vm.languageLevels.some(level => level.value === value);
    const semester = (value, vm) => vm.semesters.some(semester => semester.value === value);
    export default {
        name: "PackageForm",
        validations: {
            packageForm: {
                personal: {
                    firstName: {required, minLength: minLength(1), maxLength: maxLength(100)},
                    lastName: {required, minLength: minLength(1), maxLength: maxLength(100)},
                    age: {required, decimal, between: between(18, 100)},
                    married: {required, isBoolean}
                },
                education: {
                    gradeLevel: {required, gradLevels},
                    university: {required, maxLength: maxLength(100)},
                    gpa: {required, decimal, between: between(0, 20)},
                    gradYear: {required, decimal, between: between(0, 9999)},
                    field: {required, maxLength: maxLength(100)},
                    paperTitle: {maxLength: maxLength(100)}
                },
                languageLevel: {
                    title: {required, languageLevel},
                    listening: {decimal, between: between(0, 1000)},
                    speaking: {decimal, between: between(0, 1000)},
                    reading: {decimal, between: between(0, 1000)},
                    writing: {decimal, between: between(0, 1000)}
                },
                applyInfo: {
                    continent: {required, continent},
                    country: {required},
                    gradLevel: {required},
                    semester: {required, semester},
                    field: {required, minLength: minLength(1), maxLength: maxLength(100)}
                },
                description: {maxLength: maxLength(300)},
                files: {maxLength: maxLength(10)}
            }
        },
        data() {
            return {
                submitted: false,

                gradeLevels: [
                    {name: 'کارشناسی', value: 'bs'},
                    {name: 'کارشناسی ارشد', value: 'ms'},
                    {name: 'دکترا', value: 'phd'},
                ],

                languageLevels: [
                    {name: 'ندارم' , value: 'none'},
                    {name: 'آیلتس', value: 'ielts'},
                    {name: 'تافل', value: 'tofel'},
                ],

                continents: [
                    {name: 'آسیا', value: 'asia', countries: []},
                    {name: 'اروپا', value: 'europe', countries: []},
                    {name: 'آمریکای شمالی', value: 'northAmerica', countries: []},
                    {name: 'استرالیا', value: 'australia', countries: []},
                ],

                semesters: [
                    {name: 'پاییز 2020', value: 'fall2020'},
                    {name: 'پاییز 2021', value: 'fall2021'},
                ],

                packageForm: {
                    personal: {
                        firstName: '',
                        lastName: '',
                        age: '',
                        married: ''
                    },
                    education: {
                        levelGrade: '',
                        university: '',
                        gpa: '',
                        gradYear: '',
                        field: '',
                        paperTitle: ''
                    },
                    languageLevel: {
                        title: '',
                        listening: '',
                        speaking: '',
                        reading: '',
                        writing: ''
                    },
                    applyInfo: {
                        continent: '',
                        country: '',
                        gradLevel: '',
                        semester: '',
                        field: ''
                    },
                    description: '',
                    files: []
                }
            }
        },
        methods: {},
        computed: {
            //Personal invalidity
            firstNameIsInvalid() {
                return this.submitted && this.$v.packageForm.personal.firstName.$error;
            },
            lastNameIsInvalid() {
                return this.submitted && this.$v.packageForm.personal.lastName.$error;
            },
            ageIsInvalid() {
                return this.submitted && this.$v.packageForm.personal.age.$error;
            },
            marriedIsInvalid() {
                return this.submitted && this.$v.packageForm.personal.married.$error;
            },

            //Education invalidity
            gradeLevelIsInvalid() {
                return this.submitted && this.$v.packageForm.education.gradeLevel.$error;
            },
            universityIsInvalid() {
                return this.submitted && this.$v.packageForm.education.university.$error;
            },
            gpaIsInvalid() {
                return this.submitted && this.$v.packageForm.education.gpa.$error;
            },
            gradYearIsInvalid() {
                return this.submitted && this.$v.packageForm.education.gradYear.$error;
            },
            fieldIsInvalid() {
                return this.submitted && this.$v.packageForm.education.field.$error;
            },
            paperTitleIsInvalid() {
                return this.submitted && this.$v.packageForm.education.paperTitle.$error;
            },

            //English invalidity
            titleIsInvalid() {
                return this.submitted && this.$v.packageForm.languageLevel.title.$error;
            },
            listeningIsInvalid() {
                return this.submitted && this.$v.packageForm.languageLevel.listening.$error;
            },
            speakingIsInvalid() {
                return this.submitted && this.$v.packageForm.languageLevel.speaking.$error;
            },
            readingIsInvalid() {
                return this.submitted && this.$v.packageForm.languageLevel.reading.$error;
            },
            writingIsInvalid() {
                return this.submitted && this.$v.packageForm.languageLevel.writing.$error;
            },

            //Applu Info invalidity
            continentIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.continent.$error;
            },
            countryIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.country.$error;
            },
            gradLevelIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.gradLevel.$error;
            },
            semesterIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.semester.$error;
            },
            applyFieldIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.field.$error;
            },

            descriptionIsInvalid() {
                return this.submitted && this.$v.packageForm.description.$error;
            },

            filesIsInvalid() {
                return this.submitted && this.$v.packageForm.files.$error;
            }


        }
    }
</script>

<style scoped>

</style>