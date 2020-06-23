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
                    <h1 class="package-detail-box-title-text isansFont">درخواست پکیج طلایی</h1>
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
                        <a download :href="userForm.resume" class="isansFont detail-box-intro-actions-resume">
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
                <div class="package-detail-box-items isansFont--faNum">
                    <div class="detail-box-item">
                        <i class="material-icons">
                            add_location
                        </i>
                        <span class="detail-box-item-key">
                            کشور مقصد
                        </span>
                        <p class="detail-box-item-value">
                            {{userForm.apply_country.name}}
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            layers
                        </i>
                        <span class="detail-box-item-key">
                            مقطع مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            {{userForm.apply_grade.name}}
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            bar_chart
                        </i>
                        <span class="detail-box-item-key">
                            معدل
                        </span>
                        <p class="detail-box-item-value">
                            {{userForm.total_average}}
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            format_bold
                        </i>
                        <span class="detail-box-item-key">
                            مدرک زبان
                        </span>
                        <p class="detail-box-item-value" v-if="userForm.language_certificate">
                            دارد - {{userForm.language_certificate.name}}
                        </p>
                        <p class="detail-box-item-value" v-else>
                            ندارد
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            access_time
                        </i>
                        <span class="detail-box-item-key">
                            ترم مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            {{`${userForm.apply_semester_year.semester} ${userForm.apply_semester_year.year}`}}
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            assignment
                        </i>
                        <span class="detail-box-item-key">
                            رشته مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            {{userForm.apply_major}}
                        </p>
                    </div>
                </div>
                <div class="package-detail-box-form isansFont--faNum">
                    <div class="package-detail-box-form-head">
                        <h2 class="box-form-head-text isansFont--faNum">
                            <i class="material-icons">
                                account_circle
                            </i>
                            اطلاعات شخصی
                        </h2>
                    </div>
                    <div class="package-detail-box-form-info">
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                نام و نام خانوادگی:
                            </span>
                            <span class="form-info-field-value">
                                {{`${userForm.user.first_name} ${userForm.user.last_name}`}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                وضعیت تاهل
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.marital_status.name}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                سن
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.age}}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="package-detail-box-form isansFont--faNum">
                    <div class="package-detail-box-form-head">
                        <h2 class="box-form-head-text isansFont--faNum">
                            <i class="material-icons">
                                assignment_ind
                            </i>
                            اطلاعات آخرین مقطع تحصیلی
                        </h2>
                    </div>
                    <div class="package-detail-box-form-info">
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                مقطع:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.grade.name}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                رشته:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.major}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                دانشگاه:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.university}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                معدل کل:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.total_average}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                 عنوان پایان نامه:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.thesis_title}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                 سال فارغ التحصیلی:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.degree_conferral_year}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                مدرک زبان:
                            </span>
                            <span class="form-info-field-value" v-if="userForm.language_certificate">
                                {{userForm.language_certificate.name}}
                            </span>
                            <span class="form-info-field-multivalue isansFont" v-if="userForm.language_certificate">
                                Reading: {{userForm.language_reading}} | Listening: {{userForm.language_listening}} | Speaking: {{userForm.language_speaking}} | Writing: {{userForm.language_writing}} | Overall: {{userForm.language_certificate_overall}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                فایل رزومه:
                            </span>
                            <a download :href="userForm.resume" class="form-info-field-clickcablevalue">
                                دانلود رزومه
                                <i class="material-icons">
                                    keyboard_arrow_down
                                </i>
                            </a>
                        </p>
                    </div>
                </div>
                <div class="package-detail-box-form isansFont--faNum">
                    <div class="package-detail-box-form-head">
                        <h2 class="box-form-head-text isansFont--faNum">
                            <i class="material-icons">
                                flight_takeoff
                            </i>
                            اطلاعات مورد نیاز برای اپلای
                        </h2>
                    </div>
                    <div class="package-detail-box-form-info">
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                کشور مقصد:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.apply_country.name}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                دانشگاه مقصد:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.apply_university}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                 رشته مورد نظر:
                            </span>
                            <span class="form-info-field-value">
                                {{userForm.apply_major}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                 ترم مورد نظر:
                            </span>
                            <span class="form-info-field-value">
                                {{`${userForm.apply_semester_year.semester} ${userForm.apply_semester_year.year}`}}
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                توضیحات:
                            </span>
                            <span class="form-info-field-longvalue">
                                {{userForm.comment}}
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ConsideringPackageDetail",
        data() {
            return {
                package: {},
                userForm: {}
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
            studentSmallDescription() {
                if (this.userForm.id) {
                    return `
                        دانشجوی ${this.userForm.grade.name} رشته ${this.userForm.major} ${this.userForm.university}
                    `
                } else {
                    return '';
                }
            },
        },
        methods: {
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
                    this.$loading(false);
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
                                text: 'شما با موفقیت برای انجام این پکیج اعلام آمادگی کردید.'
                            })
                        } catch (e) {
                            console.log(e.response);
                            this.$notify({
                                group: 'notif',
                                type: 'error',
                                title: 'آمادگی پکیج: خطا',
                                text: this.extractReadableError(e.response)
                            })

                        } finally {
                            this.$loading(false);
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
            }
        },
        created() {
            this.getPackage();
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
        z-index: 8;
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

    .package-detail-box-form-head {
        padding: 5px 50px;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: #F8F8F8;
    }

    .box-form-head-text {
        color: #585858;
        margin: 0;
        font-size: 18px;
        display: flex;
        align-items: center;
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
    }

    @media only screen and (max-width: 577.8px) {
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
    }
</style>