<template>
    <section class="package-form itemBlock">
        <div class="warn">
            <i class="material-icons warn-icon">
                info
            </i>
            <div class="warn-content">
                <h1 class="warn-content-title isansFont--faNum">
                    لطفاً فرم زیر رو به صورت دقیق کامل کنید تا درخواست شما برای مشاوران اسنیدز ارسال بشه.
                </h1>
                <h5 class="warn-content-text isansFont--faNum">
                    حداکثر 4 روز بعد از ارسال فرم، مشاورانی که برای انجام پروژه شما اعلام آمادگی کرده اند، در پروفایلتان
                    نمایش داده می شود و شما با انجام مشاوره تصویری رایگان می توانید از بین این مشاوران، مناسب ترین مشاور
                    رو
                    انتخاب کنید.
                </h5>
            </div>
        </div>
        <section class="form-section isansFont--faNum">
            <h1 class="form-section-title isansFont--faNum">
                <span class="section-title-number">
                    1
                </span>
                اطلاعات شخصی
            </h1>
            <div class="form-section-inputs">
                <div class="form-input">
                    <label class="form-input-label" for="personal.firstName">نام <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" :class="[{'form-input-control--invalid': firstNameIsInvalid}]" type="text" placeholder="نام" id="personal.firstName" v-model.trim="$v.packageForm.personal.firstName.$model">
                </div>
                <div class="form-input">
                    <label class="form-input-label" for="personal.lastName">نام خانوادگی <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="text" :class="[{'form-input-control--invalid': lastNameIsInvalid}]" placeholder="نام خانوادگی" id="personal.lastName" v-model.trim="$v.packageForm.personal.lastName.$model">
                </div>
                <div class="form-input form-input--smaller">
                    <label class="form-input-label" for="personal.age">سن <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="number" :class="[{'form-input-control--invalid': ageIsInvalid}]" placeholder="##" id="personal.age" v-model.trim="$v.packageForm.personal.age.$model">
                </div>
                <div class="form-input form-input--radio">
                    <p class="form-input--radio--title">وضعیت تاهل</p>
                    <div class="form-input-wrapper" :class="[{'form-input-wrapper--invalid': marriageIsInvalid}]">
                        <input v-for="status in marriageStatus"
                               class="form-input-control--radio"
                               type="radio"
                               :id="`personal.marriage.${status.value}`"
                               name="personal.marriage"
                               :value="status.value"
                               v-model="$v.packageForm.personal.marriage.$model">
                        <label class="form-input-label--radio"
                               v-for="status in marriageStatus"
                               :for="`personal.marriage.${status.value}`">
                        <span class="input-label--radio_box">
                            <i class="material-icons" v-if="packageForm.personal.marriage === status.value">done</i>
                        </span>
                            {{status.name}}
                        </label>
                    </div>
                </div>
            </div>
        </section>
        <section class="form-section isansFont--faNum">
            <h1 class="form-section-title isansFont--faNum">
                <span class="section-title-number">
                    2
                </span>
                اطلاعات آخرین مقطع تحصیلی
            </h1>
            <div class="form-section-inputs">
                <div class="form-input">
                    <label class="form-input-label" for="education.gradLevel">مقطع تحصیلی <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="education.gradLevel" id="education.gradLevel" v-model="$v.packageForm.education.gradLevel.$model">
                        <option class="form-input-select-option" :value="level.name"
                                v-for="(level, index) in gradLevels" :key="index">
                            {{level.name}}
                        </option>
                    </select>
                </div>
                <div class="form-input">
                    <label class="form-input-label" for="education.university">دانشگاه محل تحصیل <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="text" placeholder="نام کامل دانشگاه محل تحصیل"
                           id="education.university" :class="[{'form-input-control--invalid': universityIsInvalid}]" v-model.trim="$v.packageForm.education.university.$model">
                </div>
                <div class="form-input form-input--small">
                    <label class="form-input-label" for="education.gpa">معدل کل <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="number" placeholder="##.##" id="education.gpa"
                    v-model.trim="$v.packageForm.education.gpa.$model" :class="[{'form-input-control--invalid': gpaIsInvalid}]">
                </div>
                <div class="form-input form-input--medium">
                    <label class="form-input-label" for="education.gradYear"> سال فراغت از تحصیل <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="number" placeholder="####" id="education.gradYear"
                    v-model.trim="$v.packageForm.education.gradYear.$model" :class="[{'form-input-control--invalid': gradYearIsInvalid}]">
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="education.field"> رشته <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="text" placeholder="رشته" id="education.field"
                    v-model.trim="$v.packageForm.education.field.$model" :class="[{'form-input-control--invalid': fieldInEducationIsInvalid}]">
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="education.paperTitle">عنوان پایان نامه</label>
                    <input class="form-input-control" type="text" placeholder="عنوان پایان نامه"
                           id="education.paperTitle" v-model.trim="$v.packageForm.education.paperTitle.$model" :class="[{'form-input-control--invalid': paperTitleIsInvalid}]">
                </div>

                <div class="form-input form-input--medium">
                    <label class="form-input-label" for="languageLevel.title">مدرک زبان <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="languageLevel.title" id="languageLevel.title" v-model="$v.packageForm.languageLevel.title.$model">
                        <option class="form-input-select-option" :value="title.name"
                                v-for="(title, index) in languageLevels" :key="index">
                            {{title.name}}
                        </option>
                    </select>
                </div>

                <div class="form-input form-input--small" :class="[{'form-input--disabled': packageForm.languageLevel.title === 'ندارم'}]">
                    <label class="form-input-label" for="languageLevel.listening">Listening</label>
                    <input v-model.trim="$v.packageForm.languageLevel.listening.$model" class="form-input-control" type="text" id="languageLevel.listening" :class="[{'form-input-control--invalid': listeningIsInvalid}]" :disabled="packageForm.languageLevel.title === 'ندارم'">
                </div>

                <div class="form-input form-input--small" :class="[{'form-input--disabled': packageForm.languageLevel.title === 'ندارم'}]">
                    <label class="form-input-label" for="languageLevel.speaking">Speaking</label>
                    <input v-model.trim="$v.packageForm.languageLevel.speaking.$model" class="form-input-control" type="text" id="languageLevel.speaking" :class="[{'form-input-control--invalid': speakingIsInvalid}]" :disabled="packageForm.languageLevel.title === 'ندارم'">
                </div>

                <div class="form-input form-input--small" :class="[{'form-input--disabled': packageForm.languageLevel.title === 'ندارم'}]">
                    <label class="form-input-label" for="languageLevel.reading">Reading</label>
                    <input v-model.trim="$v.packageForm.languageLevel.reading.$model" class="form-input-control" type="text" id="languageLevel.reading" :class="[{'form-input-control--invalid': readingIsInvalid}]" :disabled="packageForm.languageLevel.title === 'ندارم'">
                </div>

                <div class="form-input form-input--small" :class="[{'form-input--disabled': packageForm.languageLevel.title === 'ندارم'}]">
                    <label class="form-input-label" for="languageLevel.writing">Writing</label>
                    <input v-model.trim="$v.packageForm.languageLevel.writing.$model" class="form-input-control" type="text" id="languageLevel.writing" :class="[{'form-input-control--invalid': writingIsInvalid}]" :disabled="packageForm.languageLevel.title === 'ندارم'">
                </div>
            </div>
        </section>
        <section class="form-section isansFont--faNum">
            <h1 class="form-section-title isansFont--faNum">
                <span class="section-title-number">
                    3
                </span>
                اطلاعات مورد نظر برای اپلای
            </h1>
            <div class="form-section-inputs">
                <div class="form-input">
                    <label class="form-input-label" for="applyInfo.continent">قاره مورد نظر <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="education.gradLevel" id="applyInfo.continent" @change="setFirstSelectedCountry" v-model="$v.packageForm.applyInfo.continent.$model">
                        <option class="form-input-select-option" :value="continent.name"
                                v-for="continent in continents">
                            {{continent.name}}
                        </option>
                    </select>
                </div>
                <div class="form-input">
                    <label class="form-input-label" for="applyInfo.country">کشور مورد نظر <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="education.gradLevel" id="applyInfo.country" v-model="$v.packageForm.applyInfo.country.$model" :class="[{'form-input-control--invalid': countryIsInvalid}]">
                        <option class="form-input-select-option" :value="country.name"
                                v-for="country in countriesForCurrentContinent">
                            {{country.name}}
                        </option>
                    </select>
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="applyInfo.gradLevel">مقطع تحصیلی <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="education.gradLevel" id="applyInfo.gradLevel" v-model="$v.packageForm.applyInfo.gradLevel.$model">
                        <option class="form-input-select-option" :value="level.name"
                                v-for="level in gradLevels">
                            {{level.name}}
                        </option>
                    </select>
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="applyInfo.semester">ترم مورد نظر <span
                            class="form-input--required">*</span></label>
                    <select class="form-input-select" name="education.semester" id="applyInfo.semester" v-model="$v.packageForm.applyInfo.semester.$model">
                        <option class="form-input-select-option" :value="semester.name"
                                v-for="semester in semesters">
                            {{semester.name}}
                        </option>
                    </select>
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="applyInfo.field"> رشته مورد نظر <span
                            class="form-input--required">*</span></label>
                    <input class="form-input-control" type="text" placeholder="رشته مورد نظر" id="applyInfo.field" v-model.trim="$v.packageForm.applyInfo.field.$model" :class="[{'form-input-control--invalid': fieldInApplyInfoIsInvalid}]">
                </div>

                <div class="form-input form-input--full">
                    <label class="form-input-label" for="description">توضیحات (اختیاری)</label>
                    <textarea rows="7" class="form-input-control form-input-control--noresize" type="text"
                              id="description" v-model.trim="$v.packageForm.description.$model" :class="[{'form-input-control--invalid': descriptionIsInvalid}]">
                    </textarea>
                </div>

                <div class="form-input">
                    <label class="form-input-label" for="files">آپلود رزومه (اختیاری)</label>
                    <input class="form-input-control" type="file" id="files">
                </div>
            </div>
        </section>
        <button class="package-form-submit isansFont" @click="updateForm">
            تایید و ارسال برای مشاوران
        </button>
    </section>
</template>

<script>
    import {required, decimal, between, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "PackageForm",
        validations: {
            packageForm: {
                personal: {
                    firstName: {required, minLength: minLength(1), maxLength: maxLength(100)},
                    lastName: {required, minLength: minLength(1), maxLength: maxLength(100)},
                    age: {required, decimal, between: between(18, 100)},
                    marriage: {required}
                },
                education: {
                    gradLevel: {required},
                    university: {required, maxLength: maxLength(100)},
                    gpa: {required, decimal, between: between(0, 20)},
                    gradYear: {required, decimal, between: between(0, 9999)},
                    field: {required, maxLength: maxLength(100)},
                    paperTitle: {maxLength: maxLength(100)}
                },
                languageLevel: {
                    title: {required},
                    listening: {decimal, between: between(0, 1000)},
                    speaking: {decimal, between: between(0, 1000)},
                    reading: {decimal, between: between(0, 1000)},
                    writing: {decimal, between: between(0, 1000)}
                },
                applyInfo: {
                    continent: {required},
                    country: {required},
                    gradLevel: {required},
                    semester: {required},
                    field: {required, minLength: minLength(1), maxLength: maxLength(100)}
                },
                description: {maxLength: maxLength(1024)},
                files: {maxLength: maxLength(1)}
            }
        },
        data() {
            return {
                submitted: false,

                marriageStatus: [
                    {name: 'متاهل', value: 'married'},
                    {name: 'مجرد', value: 'single'},
                ],

                gradLevels: [
                    {name: 'کارشناسی', value: 'bs'},
                    {name: 'کارشناسی ارشد', value: 'ms'},
                    {name: 'دکترا', value: 'doc'},
                    {name: 'پست دکتری', value: 'postDoc'},
                    {name: 'کالج', value: 'college'},
                ],

                languageLevels: [
                    {name: 'ندارم', value: 'none'},
                    {name: 'آیلتس آکادمکی', value: 'ielts'},
                    {name: 'آیلتس جنرال', value: 'ielts'},
                    {name: 'تافل', value: 'toefl'},
                    {name: 'دولینگو', value: 'duolingo'},
                    {name: 'GRE', value: 'gre'},
                    {name: 'IAESTE', value: 'iaeste'},
                    {name: 'GMAT', value: 'gmat'},
                ],

                continents: [
                    {name: 'اروپا', value: 'europe', countries: [
                            {name: 'آلمان', value: 'germany'},
                            {name: 'ایتالیا', value: 'italy'},
                            {name: 'فرانسه', value: 'france'},
                            {name: 'اتریش', value: 'austria'},
                            {name: 'هلند', value: 'netherlands'},
                            {name: 'پرتغال', value: 'portugal'},
                            {name: 'سوئد', value: 'sweden'},
                            {name: 'اسپانیا', value: 'spain'},
                            {name: 'استونی', value: 'estonia'}
                        ]},
                    {name: 'آمریکای شمالی', value: 'northAmerica', countries: [
                            {name: 'کانادا', value: 'canada'},
                            {name: 'آمریکا', value: 'us'}
                        ]},
                    {name: 'استرالیا', value: 'australia', countries: [
                            {name: ' استرالیا', value: 'australia'}
                        ]},
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
                        marriage: ''
                    },
                    education: {
                        gradLevel: 'کارشناسی',
                        university: '',
                        gpa: '',
                        gradYear: '',
                        field: '',
                        paperTitle: ''
                    },
                    languageLevel: {
                        title: 'ندارم',
                        listening: '',
                        speaking: '',
                        reading: '',
                        writing: ''
                    },
                    applyInfo: {
                        continent: 'آمریکای شمالی',
                        country: 'کانادا',
                        gradLevel: 'کارشناسی ارشد',
                        semester: 'پاییز 2020',
                        field: ''
                    },
                    description: '',
                    files: []
                }
            }
        },
        methods: {
            updateForm() {
                this.submitted = true;
                this.$v.$touch();
                console.log(`form is invalid ${this.formIsInvalid}`);
                console.log('update form:', this.$v.packageForm);
                if(!this.formIsInvalid) {
                    //form is valid, continue
                } else {
                    //form is invalid, show notification
                    this.$notify({
                        group: 'notif',
                        type: 'error',
                        title: 'فرم پکیج: اخطار',
                        text: 'لطفا اطلاعات فرم را به درست پر کنید. موارد خطا با رنگ قرمز مشخص شده اند.'
                    })
                }

            },
            setFirstSelectedCountry() {
                this.packageForm.applyInfo.country = this.countriesForCurrentContinent[0].name;
            }
        },
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
            marriageIsInvalid() {
                return this.submitted && this.$v.packageForm.personal.marriage.$error;
            },

            //Education invalidity
            gradLevelIsInvalid() {
                return this.submitted && this.$v.packageForm.education.gradLevel.$error;
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
            fieldInEducationIsInvalid() {
                return this.submitted && this.$v.packageForm.education.field.$error;
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
            gradLevelInApplyInfoIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.gradLevel.$error;
            },
            semesterIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.semester.$error;
            },
            applyFieldIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.field.$error;
            },
            fieldInApplyInfoIsInvalid() {
                return this.submitted && this.$v.packageForm.applyInfo.field.$error;
            },

            descriptionIsInvalid() {
                return this.submitted && this.$v.packageForm.description.$error;
            },

            filesIsInvalid() {
                return this.submitted && this.$v.packageForm.files.$error;
            },

            formIsInvalid() {
                return this.submitted && this.$v.packageForm.$invalid;
            },

            countriesForCurrentContinent() {
                return this.continents.find((continent) => continent.name === this.packageForm.applyInfo.continent).countries;
            }


        }
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .warn {
        background-color: #FFFCF4;
        color: #8C6D1F;
        display: flex;
        align-items: center;
        margin: 0 15px;
        padding: 15px;
        border-radius: 5px;
    }

    .warn-content {
        display: flex;
        flex-direction: column;
    }

    .warn-content-title {
        color: #8C6D1F;
        font-size: 15px;
        font-weight: bold;
        margin: 0;
    }

    .warn-content-text {
        color: #8C6D1F;
        font-size: 14px;
        margin: 10px 0 0 0;
    }

    .warn-icon {
        color: #CAA53D;
        margin-left: 10px;
        font-size: 32px;
    }

    .package-form {
        display: flex;
        flex-direction: column;
    }

    .form-section {
        display: flex;
        flex-direction: column;
        margin: 15px;
    }

    .form-section-title {
        font-size: 16px;
        color: #585858;
        border-bottom: 2px solid #F2F2F2;
        justify-self: stretch;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .section-title-number {
        border: 2px solid #A347FF;
        border-radius: 50%;
        color: #A347FF;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        margin-left: 10px;
        font-size: 14px;
    }

    .form-section-inputs {
        justify-self: stretch;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .form-input {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 250px;
        margin: 10px;
    }

    .form-input--smaller {
        max-width: 50px;
    }

    .form-input--small {
        max-width: 100px;
    }

    .form-input--medium {
        max-width: 150px;
    }

    .form-input--full {
        max-width: 100%;
    }

    .form-input-label {
        color: #707070;
        position: relative;
    }

    .form-input--required {
        color: #E46464;
        position: absolute;
    }

    .form-input-control {
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        min-height: 40px;
        padding-right: 5px;
        border-radius: 10px;
        color: #B3B3B3;
        margin-top: 5px;
    }

    .form-input-control:focus {
        color: #9B9999;
    }

    .form-input-control--radio {
        display: none;
    }

    .input-label--radio_box {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
    }

    .input-label--radio_box i {
        font-size: 16px;
        color: #8C3DDB;
    }

    .form-input-label--radio {
        display: flex;
        cursor: pointer;
        margin: 0;
    }

    .form-input--radio--title {
        color: #707070;
    }

    .form-input-wrapper {
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 10px;
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        color: #B3B3B3;
        width: 180px;
        min-width: auto;
    }

    .form-input-select {
        margin-top: 5px;
        min-height: 40px;
        border-radius: 10px;
        border: 1px solid #F2F2F2;
        background-color: #F8F8F8;
        color: #707070;
    }

    .form-input-control--noresize {
        resize: none;
    }

    .form-section:last-child {
        border-bottom: 2px solid #F2F2F2;
        padding-bottom: 30px;
    }

    .package-form-submit {
        background-color: #8C3DDB;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        padding: 0 20px;
        border: none;
        color: white;
        border-radius: 10px;
    }

    .form-input--disabled .form-input-label {
        color: #D2D2D2;
    }

    .form-input--disabled .form-input-control {
        border: none;
        background-color: #FCFCFC;
    }

    .form-input-control--invalid {
        border-color: #E46464;
    }

    .form-input-wrapper--invalid {
        border-color: #E46464;
    }


</style>