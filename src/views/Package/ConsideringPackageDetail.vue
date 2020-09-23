<template>
    <section class="package">
        <div class="package-overlay"></div>
        <div class="package-detail">
            <router-link to="/user/conspackages" class="package-detail-back isansFont">
                بازگشت به پکیج ها
                <i class="material-icons">keyboard_arrow_left</i>
            </router-link>
            <section class="package-detail-box" v-if="userForm.id">
                <div class="package-detail-box-title">
                    <h1 class="package-detail-box-title-text isansFont">درخواست {{package.title}}</h1>
                </div>
                <div class="package-detail-box-intro">
                    <div class="detail-box-intro-personal">
                        <h2 class="isansFont detail-box-intro-personal-name">
                            {{`${userForm.user.first_name} ${userForm.user.last_name}`}}
                        </h2>
                        <h3 class="isansFont detail-box-intro-personal-info">
                            {{studentSmallDescription}}
                        </h3>
                    </div>
                    <div class="detail-box-intro-actions">
                        <a download :href="userForm.resume" class="isansFont detail-box-intro-actions-resume" v-if="userForm.resume">
                            دانلود رزومه
                        </a>
                        <button @click="acceptCurrentPackage" class="isansFont detail-box-intro-actions-accept">
                            اعلام آمادگی برای قبول درخواست
                            <i class="material-icons">
                                done
                            </i>
                        </button>
                    </div>
                </div>

                <div class="package-body-switcher no--mobile isansFont">
                    <ul class="package-body-switcher-items">
                        <li class=" package-body-switcher-item" v-for="tab in tabs">
                            <button class="switcher-item-button"
                                    :class="[{'switcher-item-button--active': currentTab === tab}]"
                                    @click="currentTab = tab">
                                {{tab.name}}
                            </button>
                        </li>
                    </ul>
                </div>
                <c-dropdown-input
                    class="mobile-switcher"
                    label="بخش مورد نظر فرم را انتخاب کنید:"
                    :options="tabs"
                    :defaultSelectedIndex="0"
                    @select-option="selectTab">
                </c-dropdown-input>
                <div class="package-detail-box-form isansFont--faNum" v-if="hasDestination && currentTab.value === 'dest'">
                        <div class="package-detail-box-form-info">
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                کشور های مورد نظر:
                            </span>
                                <span v-for="country in destination.countries" class="form-info-field-multivalue isansFont">
                                {{country.name}}
                            </span>
                                <span v-if="destination.countries.length == 0" class="form-info-field-value">
                                محدودیتی ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                رشته های مورد نظر:
                            </span>
                                <span v-for="major in destination.majors" class="form-info-field-multivalue isansFont">
                                {{major.name}}
                            </span>
                                <span v-if="destination.majors.length == 0" class="form-info-field-value">
                                محدودیتی ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                مقاطع مورد نظر:
                            </span>
                                <span v-for="grade in destination.grades" class="form-info-field-multivalue isansFont">
                                {{grade.name}}
                            </span>
                                <span v-if="destination.grades.length == 0" class="form-info-field-value">
                                محدودیتی ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                ترم های مورد نظر:
                            </span>
                                <span v-for="semester in destination.semester_years" class="form-info-field-multivalue isansFont--faNum">
                                {{semester.semester}} {{semester.year}}
                            </span>
                                <span v-if="destination.semester_years.length == 0" class="form-info-field-value">
                                محدودیتی ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                فاند های مورد نظر:
                            </span>
                                <span v-for="fund in funds" class="form-info-field-multivalue isansFont--faNum">
                                {{fund}}
                            </span>
                                <span v-if="funds.length == 0" class="form-info-field-value">
                                محدودیتی ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                توانایی مالی:
                            </span>
                                <span class="form-info-field-value">
                                {{affordability}}
                            </span>
                            </p>
                        </div>
                    </div>
                <div class="package-detail-box-form isansFont--faNum" v-if="hasEducation && currentTab.value === 'edu'">
                        <div class="package-detail-box-form-info">
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                مقطع:
                            </span>
                                <span class="form-info-field-value">
                                {{getReadableGrade(lastEducation.grade)}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                رشته:
                            </span>
                                <span class="form-info-field-value">
                                {{lastEducation.major.name}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                دانشگاه:
                            </span>
                                <span class="form-info-field-value">
                                {{lastEducation.university.name}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                معدل کل:
                            </span>
                                <span class="form-info-field-value">
                                {{lastEducation.gpa}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                سال فارغ التحصیلی:
                            </span>
                                <span class="form-info-field-value">
                                {{lastEducation.graduate_in}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                وقفه تحصیلی:
                            </span>
                                <span v-if="userForm.academic_break" class="form-info-field-value">
                                سال دارد - {{userForm.academic_break}}
                            </span>
                                <span v-else class="form-info-field-value">
                                ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                توصیه نامه قوی:
                            </span>
                                <span v-if="userForm.powerful_recommendation" class="form-info-field-value">
                                دارد
                            </span>
                                <span v-else class="form-info-field-value">
                                ندارد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                عنوان پایان نامه:
                            </span>
                                <span v-if="lastEducation.thesis_title" class="form-info-field-value">
                                {{lastEducation.thesis_title}}
                            </span>
                                <span v-else class="form-info-field-value">
                                نا مشخص
                            </span>
                            </p>
                        </div>
                    </div>
                <div class="package-detail-box-form isansFont--faNum" v-if="currentTab.value === 'paper'" >
                        <div class="package-detail-box-form-info">
                            <p class="form-info-field" v-for="(paper, index) in userForm.publications">
                            <span class="form-info-field-key">
                                مقاله {{index + 1}}:
                            </span>
                                <span class="form-info-field-value">
                                {{getPaperSummary(paper)}}
                            </span>
                            </p>
                            <p v-if="userForm.publications.length == 0">
                            <span class="form-info-field-key">
                                مقالات:
                            </span>
                                <span class="form-info-field-value">
                                مقاله ای وارد نشده است.
                            </span>
                            </p>
                        </div>
                    </div>
                <div class="package-detail-box-form isansFont--faNum" v-if="currentTab.value === 'cert'" >
                        <div class="package-detail-box-form-info">
                            <div class="form-info-field-double" v-for="(cert, index) in certs">
                                <p class="form-info-field">
                                <span class="form-info-field-key">
                                    مدرک {{index + 1}}:
                                </span>
                                    <span class="form-info-field-value">
                                    {{cert.certificate_type}}
                                </span>
                                </p>
                                <p class="form-info-field">
                                <span class="form-info-field-key">
                                    نمره مدرک {{index + 1}}:
                                </span>
                                    <span v-for="entry in Object.entries(readableCerts[index])" class="form-info-field-multivalue isansFont">
                                    {{entry[0]}}:{{entry[1]}}
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>
                <div class="package-detail-box-form isansFont--faNum" v-if="currentTab.value === 'personal'" >
                        <div class="package-detail-box-form-info">
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                نام نام خانوادگی:
                            </span>
                                <span class="form-info-field-value">
                                {{userForm.user.first_name}} {{userForm.user.last_name}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                جنسیت:
                            </span>
                                <span class="form-info-field-value">
                                {{userForm.gender}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                وضعیت تاهل:
                            </span>
                                <span class="form-info-field-value" v-if="userForm.is_married">
                                متاهل
                            </span>
                                <span class="form-info-field-value" v-else>
                                مجرد
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                سن:
                            </span>
                                <span class="form-info-field-value">
                                {{userForm.age}}
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                سابقه کار مرتبط با رشته:
                            </span>
                                <span class="form-info-field-value" v-if="userForm.related_work_experience">
                                دارد | {{userForm.related_work_experience}} ماه
                            </span>
                                <span class="form-info-field-value" v-else>
                                ندارد
                            </span>
                            </p>
                        </div>
                    </div>
                <div class="package-detail-box-form isansFont--faNum" v-if="currentTab.value === 'other'" >
                        <div class="package-detail-box-form-info">
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                فایل رزومه:
                            </span>
                                <a download :href="userForm.resume" class="form-info-field-clickcablevalue" v-if="userForm.resume">
                                    دانلود رزومه
                                    <i class="material-icons">
                                        keyboard_arrow_down
                                    </i>
                                </a>
                                <a class="form-info-field-clickcablevalue" v-else>
                                    آپلود نشده
                                </a>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                سابقه المپیاد:
                            </span>
                                <span class="form-info-field-value" v-if="userForm.olympiad">
                                {{userForm.olympiad}}
                            </span>
                                <span class="form-info-field-value" v-else>
                                نامشخص
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                آدرس لینکدین:
                            </span>
                                <a target="_blank" :href="userForm.resume" class="form-info-field-clickcablevalue" v-if="userForm.linkedin_url">
                                    {{userForm.linkedin_url}}
                                </a>
                                <span class="form-info-field-value" v-else>
                                نامشخص
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                آدرس وبسایت شخصی:
                            </span>
                                <a target="_blank" :href="userForm.homepage_url" class="form-info-field-clickcablevalue" v-if="userForm.homepage_url">
                                    {{userForm.homepage_url}}
                                </a>
                                <span class="form-info-field-value" v-else>
                                نامشخص
                            </span>
                            </p>
                            <p class="form-info-field">
                            <span class="form-info-field-key">
                                توضیحات:
                            </span>
                                <span class="form-info-field-longvalue" v-if="!!userForm.comment">
                                {{userForm.comment}}
                            </span>
                                <span class="form-info-field-value" v-else>
                                نامشخص
                            </span>
                            </p>
                        </div>
                    </div>
            </section>
        </div>
    </section>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput";
    export default {
        name: "ConsideringPackageDetail",
        components: {
            'c-dropdown-input': DropdownInput
        },
        data() {
            return {
                package: {},
                userForm: {},
                tabs: [
                    {name: 'مقاصد اپلای', value: 'dest'},
                    {name: 'آخرین مقطع تحصیلی', value: 'edu'},
                    {name: 'مدارک زبان', value: 'cert'},
                    {name: 'مقاله ها', value: 'paper'},
                    {name: 'اطلاعات شخصی', value: 'personal'},
                    {name: 'سایر اطلاعات', value: 'other'},
                ],
                paymentAffordabilityChoices: [],
                currentTab: null
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
            isConsultant() {
                return this.$store.getters.isConsultant;
            },
            userInfo() {
                return this.$store.getters.getUserInfo;
            },

            hasUserForm() {
                return Object.keys(this.userForm).length > 0;
            },

            hasDestination() {
                return this.hasUserForm && !!this.userForm.want_to_applies[0];
            },

            destination() {
                return this.userForm.want_to_applies[0];
            },

            hasEducation() {
                return this.hasUserForm && this.userForm.universities.length > 0;
            },

            lastEducation() {
                return this.userForm.universities[this.userForm.universities.length - 1];
            },

            funds() {
                if(this.hasUserForm) {
                    let toReturn = [];
                    if(this.userForm.prefers_full_fund) {
                        toReturn.push('فول فاند')
                    }

                    if(this.userForm.prefers_half_fund) {
                        toReturn.push('هف فاند')
                    }

                    if(this.userForm.prefers_self_fund) {
                        toReturn.push('سلف فاند')
                    }
                    return toReturn;
                } else {
                    return ['محدودیتی ندارد']
                }
            },

            affordability() {
                return this.hasUserForm ? this.paymentAffordabilityChoices.find(choice => choice.value === this.userForm.payment_affordability).label : 'مشخص نشده'
            },

            certs() {
                return [
                    ...this.userForm.regular_certificates,
                    ...this.userForm.gmat_certificates,
                    ...this.userForm.gre_biology_certificates,
                    ...this.userForm.gre_general_certificates,
                    ...this.userForm.gre_physics_certificates,
                    ...this.userForm.gre_psychology_certificates,
                    ...this.userForm.gre_subject_certificates,
                ]
            },

            readableCerts() {
                return this.certs.map(cert => {
                    let certCloned = {};
                    Object.assign(certCloned, cert);
                    delete certCloned.id;
                    delete certCloned.certificate_type
                    delete certCloned.student_detailed_info;
                    return certCloned;
                })
            },


            studentSmallDescription() {
                if (this.hasEducation) {
                    return `
                        دانشجوی ${this.getReadableGrade(this.lastEducation.grade)} رشته ${this.lastEducation.major.name} ${this.lastEducation.university.name}
                    `
                } else {
                    return '';
                }
            },
        },
        methods: {
            selectTab(tab) {
                this.currentTab = tab;
            },

            getPaperType(type) {
                switch (type.toLowerCase()) {
                    case 'journal':
                        return 'مقاله ژورنالی'
                    case 'conference':
                        return 'مقاله کنفرانسی';
                }
            },

            getPaperAuthorNumber(authorNumber) {
                switch (authorNumber.toLowerCase()) {
                    case 'first':
                        return 'اول'
                    case 'second':
                        return 'دوم'
                    case 'third':
                        return 'سوم'
                    case 'fourth_or_more':
                        return 'چهارم به بعد'
                }
            },

            getPaperJournalReputation(rp) {
                switch (rp.toLowerCase()) {
                    case 'one_to_three':
                        return '1 تا 3';
                    case 'four_to_then':
                        return '4 تا 10'
                    case 'above_ten':
                        return 'بالای 10'
                }
            },

            getPaperSummary(item) {
                return `${this.getPaperType(item.type)}، ${item.publish_year}، نویسنده ${this.getPaperAuthorNumber(item.which_author)} | ضریب تاثیر: ${this.getPaperJournalReputation(item.journal_reputation)} | ${item.title}`
            },

            getReadableGrade(grade) {
                switch (grade) {
                    case 'BACHELOR':
                        return 'کارشناسی';
                    case 'MASTER':
                        return 'کارشناسی ارشد';
                    case 'DOC':
                        return 'دکترا';
                    case 'POST_DOC':
                        return 'پست دکترا'
                }
            },

            async getPackage() {
                try {
                    //this.$loading(true);
                    this.package = (await this.$api.get(`${this.api}/store/packages/marketplace-detail/${this.$route.params.id}/`, this.httpConfig)).data;
                    this.userForm = (await this.$api.get(`${this.api}/account/user-student-detailed-info/${this.package.sold_to.id}/`, this.httpConfig)).data;
                    console.log(this.package);
                    console.log(this.userForm);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async acceptCurrentPackage() {
                console.log('is consultant?', this.isConsultant);
                if (this.isConsultant) {
                    if (window.confirm("آیا برای اعلام آمادگی برای انجام این پکیج مطمئنید ؟")) {
                        try {
                            //this.$loading(true);
                            let payload = {
                                "sold_store_package": this.package.id,
                                "consultant": this.userInfo.consultant.id
                            };
                            console.log('payload', payload);
                            let result = await this.$api.post(`${this.api}/store/packages/consultant-sold-store-package-accept-request-list/`, payload, this.httpConfig);
                            console.log(result);
                            this.$notify({
                                group: 'notif',
                                type: 'success',
                                title: 'آمادگی پکیج: موفق',
                                text: 'شما با موفقیت برای انجام این پکیج اعلام آمادگی کردید.',
                                duration: 10000,
                            })
                            this.$router.push('/user/conspackages');
                        } catch (e) {
                            console.log(e.response);
                            this.$notify({
                                group: 'notif',
                                type: 'error',
                                title: 'آمادگی پکیج: خطا',
                                text: this.extractReadableError(e.response)
                            })

                        } finally {

                        }

                    }
                } else {
                    console.log('User is not consultant to request for accept.');
                }
            },

            extractReadableError(errorResponse) {
                if (errorResponse) {
                    // let readableError = '';
                    // let data = errorResponse.data;
                    // for(let dataField in data) {
                    //     console.log(dataField + ' ' + data[dataField]);
                    //     if((typeof data[dataField]).toLowerCase() === 'array') {
                    //         for(let i = 0; i < data[dataField].length; i++) {
                    //             readableError += `${data[dataField][i]}<br>`
                    //         }
                    //     }
                    // }
                    // console.log(readableError);
                    // return readableError;
                    return 'خطایی هنگام ارتباط با سرور رخ داد و یا شما قبلا اعلام آمادگی کرده اید.'
                } else {
                    return 'خطایی هنگام ارتباط با سرور رخ داد و یا شما قبلا اعلام آمادگی کرده اید.'
                }
            },

            async getPaymentAffordabilityChoices() {
                try {
                    let result = await this.$api.get(`${this.api}/account/payment-affordability-choices/`, this.httpConfig);
                    this.paymentAffordabilityChoices = result.data.choices;
                    console.log(this.paymentAffordabilityChoices);
                } catch (e) {
                    console.log(e)
                } finally {

                }
            }
        },
        created() {
            this.getPackage();
            this.getPaymentAffordabilityChoices();
            this.currentTab = this.tabs[0];
        }
    }
</script>

<style scoped>
    .package {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .package-overlay {
        position: fixed;
        left: 0;
        width: 100%;
        height: 200px;
        background: transparent linear-gradient(270deg, #9C44F5 0%, #430B7C 100%) 0 0 no-repeat padding-box;
        z-index: 0;
        top: 70px;
    }

    .package-detail {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-top: 110px;
        z-index: 9;
        margin-bottom: 30px;
    }

    .package-detail-back {
        color: white;
        margin: 0 auto 15px 0;
        display: flex;
        align-items: center;
    }

    .package-detail-box {
        width: 100%;
        background-color: white;
        border-radius: 15px;
        min-height: 600px;
        box-shadow: 0 2px 10px #00000017;
    }

    .package-detail-box-title {
        background-color: #FCFCFC;
        padding: 0;
        margin: 0;
        border-radius: 15px 15px 0 0;
    }

    .package-detail-box-title-text {
        color: #9B9999;
        padding: 10px;
        margin: 0;
        font-size: 17px;
    }

    .package-detail-box-intro {
        margin: 0 50px;
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #F8F8F8;
    }

    .detail-box-intro-personal-name {
        margin: 0;
        color: #585858;
        font-size: 16px;
    }

    .detail-box-intro-personal-info {
        margin: 10px 0;
        color: #9B9999;
        font-size: 14px;
    }

    .detail-box-intro-actions {
        display: flex;
    }

    .detail-box-intro-actions-resume {
        border-radius: 15px;
        text-align: center;
        padding: 8px 60px;
        border: 1px solid #F0E6FA;
        color: #8E39CC;
    }

    .detail-box-intro-actions-accept {
        display: flex;
        align-items: center;
        background: #3CAEA3;
        border-radius: 15px;
        border: none;
        padding: 8px 60px;
        margin-right: 10px;
        color: #FAFDFF;
    }

    .detail-box-intro-actions-accept i {
        font-size: 16px;
        margin-right: 5px;
    }

    .package-detail-box-items {
        display: flex;
        flex-wrap: wrap;
        margin: 0 50px;
    }

    .detail-box-item {
        width: 220px;
        height: 220px;
        margin: 10px auto;
        background-color: #F8F8F8;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
    }

    .detail-box-item i {
        font-size: 70px;
        color: #A347FF;
        margin: 15px 0;
    }

    .detail-box-item-key {
        color: #9B9999;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .detail-box-item-value {
        color: #202425;
        text-align: center;
    }

    .package-detail-box-form {
        margin-top: 20px;
    }

    .box-form-head-text i {
        color: #A347FF;
        font-size: 18px;
        margin-left: 10px;
    }

    .package-detail-box-form-info {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 10px 50px;
    }

    .form-info-field {
        display: flex;
        align-items: center;
        padding: 15px 0;
        margin: 0;
    }

    .form-info-field:not(:last-child) {
        border-bottom: 2px solid #F8F8F8;
    }

    .form-info-field-key {
        color: #B3B3B3;
    }

    .form-info-field-value {
        margin-right: 20px;
        color: #707070;
    }

    .form-info-field-multivalue {
        margin-right: 20px;
        color: #707070;
    }

    .form-info-field-clickcablevalue {
        display: flex;
        align-items: center;
        color: #707070;
        margin-right: 20px;
    }

    .form-info-field-clickcablevalue i {
        color: #8C3DDB;
    }

    .form-info-field-longvalue {
        color: #707070;
        margin-right: 20px;
        font-size: 14px;
        line-height: 25px;
    }

    .package-body-switcher {
        display: flex;
        align-items: center;
        justify-content: stretch;
        background-color: #F8F8F8;
        margin: 20px 0;
    }

    .package-body-switcher-items {
        display: flex;
        padding: 0;
        list-style: none;
        align-items: stretch;
        margin: 0;
    }

    .package-body-switcher-item {
        display: flex;
        align-items: stretch;
        justify-content: stretch;
    }

    .switcher-item-button {
        display: flex;
        align-items: center;
        padding: 10px 25px;
        margin: 0;
        font-size: 13px;
        background: none;
        border: none;
        color: #9B9999;
    }

    .switcher-item-button i {
        font-size: 15px;
        margin-right: 5px;
        border: 1px solid #8C3DDB;
        border-radius: 50%;
    }

    .switcher-item-button:hover {
        color: #8C3DDB;
    }

    .switcher-item-button--active {
        background: white;
        color: #8C3DDB;
        font-weight: bold;
    }

    .mobile-switcher {
        display: none;
    }

    @media only screen and (max-width: 991.8px) {
        .package {
            background-color: white;
        }
        .package-overlay {
            display: none;
        }

        .package-detail {
            margin-top: 0;
            border-radius: 0;
        }

        .package-detail-back {
            display: none;
        }

        .package-detail-box-title {
            border-radius: 0;
        }

        .package-detail-box-intro {
            flex-wrap: wrap;
        }

        .detail-box-intro-actions {
            flex-wrap: wrap;
        }

        .form-info-field {
            flex-wrap: wrap;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .no--mobile {
            display: none;
        }

        .package-detail-box-intro {
            flex-direction: column;
            justify-content: center;
        }

        .detail-box-intro-actions {
            flex-direction: column;
            justify-content: center;
        }

        .detail-box-intro-actions-accept {
            margin: 10px 0;
        }

        .detail-box-intro-personal {
            text-align: center;
        }

        .mobile-switcher {
            display: block;
            margin: 0 20px;
        }

        .form-info-field {
            flex-wrap: wrap;
        }

    }
</style>