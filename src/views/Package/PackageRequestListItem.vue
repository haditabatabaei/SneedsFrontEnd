<template>
    <section class="itemBlock">
        <div class="request-title">
            <h1 class="isansFont request-title-text">
                مشخصات مشاور
            </h1>
            <router-link class="request-title-back" :to="`/user/userpackages/requestlist/${$route.params.packageId}`">
                <i class="material-icons">
                    keyboard_arrow_left
                </i>
            </router-link>
        </div>
        <div class="request-head" v-if="consultant">
            <div class="request-head-info">
                <img class="request-head-info-image" :src="consultant.profile_picture" alt="">
                <div class="request-head-info-text isansFont--faNum">
                    <p class="request-head-info-namerate">
                        {{`${consultant.first_name} ${consultant.last_name}`}}
                        <mark class="head-info-rate" v-if="consultant.rate">
                            {{consultant.rate}}
                        </mark>
                        <mark class="head-info-rate" v-else>
                            بدون امتیاز
                        </mark>
                    </p>
                    <p class="request-head-info-study">
                        {{studyText}}
                    </p>
                </div>
            </div>
            <div class="request-head-action isansFont">
                <router-link class="request-head-action-profileview" :to="`/consultants/${consultant.slug}`">
                    مشاهده پروفایل مشاور
                </router-link>
                <router-link class="request-head-action-chat" to="/user/chatroom">
                    <i class="material-icons">
                        mail
                    </i>
                    گفتگو با مشاور
                </router-link>
            </div>
        </div>
        <div class="request-body">
            <div class="request-point isansFont">
                <h2 class="request-point-title isansFont">
                    <i class="material-icons">info</i>
                    نکات مهم:
                </h2>
                <ul class="request-point-items">
                    <li class="request-point-item">
                        لطفاً اطلاعات مشاور مورد نظر را بررسی کنید، پروفایل ایشان را ببینید و در
                        <a href="http://blog.sneeds.ir" target="_blank">بلاگ اسنیدز</a>
                        مصاحبه های ما با ایشان را تماشا کنید.
                    </li>
                    <li class="request-point-item">
                        در هر صورت وجود هر گونه مشکل لطفاً با پشتیبانی اسنیدز تماس بگیرید.
                    </li>
                </ul>
            </div>
            <div class="request-point isansFont">
                <h2 class="request-point-title isansFont">
                    <i class="material-icons">info</i>
                    راه های ارتباط با مشاور
                </h2>
                <ul class="request-point-items">
                    <li class="request-point-item">
                        شما می توانید در بستر اسنیدز با مشاور خود چت کنید.
                    </li>
                    <li class="request-point-item">
                        در صورت درخواست شما مشاور می تواند طبق قرارداد، با ایجاد کد تخفیف 100 درصد برای جلسات مشاوره، برای شما کد تخفیف رایگان اختصاصی ایجاد کند.
                    </li>
                    <li class="request-point-item">
                        شما می توانید با استفاده از این کد تخفیف، با مشاور جلسات رایگان داشته باشید.
                    </li>
                </ul>
            </div>
        </div>
        <div class="request-footer isansFont">
            <button class="request-footer-action" @click="pickCurrentConsultantForPackage">
                تایید {{consultant.first_name + " " + consultant.last_name}} و شروع فرآیند اپلای
                <i class="material-icons">done</i>
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PackageRequestListItem",
        data() {
            return {
                request: {},
                consultant: null
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
            studyText() {
                if (this.consultant != null && this.consultant.study_info.length != 0) {
                    return ` دانشجوی  ${this.persianGrade} ${this.studyInfo.field_of_study.name} در دانشگاه ${this.studyInfo.university.name} ${this.studyInfo.country.name} `
                } else {
                    return " ";
                }
            },

            studyTextMobile() {
                if (this.consultant != null && this.consultant.study_info.length != 0) {
                    return ` دانشجوی  ${this.studyInfo.field_of_study.name} در ${this.studyInfo.country.name} `
                } else {
                    return " ";
                }
            },

            studyInfo() {
                if(this.consultant && this.consultant.study_info.length != 0) {
                    return this.consultant.study_info[this.consultant.study_info.length - 1];
                } else {
                    return {}
                }
            },

            persianGrade() {
                if (this.consultant != null) {
                    switch (this.studyInfo.grade) {
                        case 'phd':
                            return 'دکترا';
                        case 'master':
                            return 'کارشناسی ارشد';
                        case 'bachelor':
                            return 'کارشناسی';
                        default :
                            return ' ';
                    }
                } else {
                    return ' ';
                }
            }
        },
        methods: {
            async getRequest() {
                try {
                    let result = await this.$api.get(`${this.api}/store/packages/consultant-sold-store-package-accept-request-detail/${this.$route.params.reqId}/`, this.httpConfig);
                    console.log(result);
                    this.request = result.data;
                    await this.getConsultant();
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                }
            },

            async getConsultant() {
                try {
                    let result = await this.$api.get(`${this.api}/account/consultant-profiles/${this.request.consultant_info.slug}/`, this.httpConfig);
                    console.log(result);
                    this.consultant = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async pickCurrentConsultantForPackage() {
                if(window.confirm("آیا از انتخاب این مشاور برای انجام پروسه مهاجرت و این پکیج اطمینان دارید ؟")) {
                    try {
                        let result = await this.$api.patch(
                            `${this.api}/store/packages/sold-store-package-detail/${this.$route.params.packageId}/`,
                            {"consultant": this.consultant.id},
                            this.httpConfig);
                        console.log(result);
                        this.$notify({
                            group: 'notif',
                            type: 'success',
                            title: 'قبول مشاور: موفق',
                            text: `شما با موفقیت ${this.consultant.first_name + " " + this.consultant.last_name} را برای انجام روند پکیج خود انتخاب کردید`,
                            duration: 10000,
                        });
                        this.$router.push(`/user/userpackages/`)

                    } catch (e) {
                        console.log(e);
                        if (e.response) {
                            console.log(e.response);
                        }
                        this.$notify({
                            group: 'notif',
                            type: 'error',
                            title: 'قبول مشاور: خطا',
                            text: `خطایی هنگام ارتباط با سرور رخ داد.`,
                            duration: 5000,
                        })
                    }
                } else {
                    this.$notify({
                        group: 'notif',
                        type: 'warn',
                        title: 'قبول مشاور: اخطار',
                        text: `برای تایید این مشاور باید اطمینان داشته باشید.`,
                        duration: 7000,
                    })
                }
            }
        },
        created() {
            this.getRequest();
        }
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .request-title {
        background-color: #FCFCFC;
        border-radius: 15px 15px 0 0;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .request-title-text {
        margin: 10px;
        font-size: 16px;
        color: #9B9999;
        display: flex;
    }

    .request-title-back {
        color: #B3B3B3;
        margin-left: 10px;
    }

    .request-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        margin: 0 10px;
        border-bottom: 2px solid #f9f9f9;
    }

    .request-head-info {
        display: flex;
        align-items: center;
    }

    .request-head-info-image {
        height: 62px;
        width: 62px;
        border-radius: 50%;
    }

    .request-head-info-text {
        margin-right: 10px;
    }

    .request-head-info-namerate {
        margin: 0;
        color: #585858;
        font-size: 16px;
        font-weight: bold;
    }

    .head-info-rate {
        color: #1B655E;
        font-size: 12px;
        background: none;
        padding: 0;
        margin-right: 10px;
        font-weight: normal;
    }

    .request-head-info-study {
        margin: 10px 0 0 0;
    }

    .request-head-info-study {
        color: #9B9999;
        font-size: 14px;
    }

    .request-head-action-profileview {
        background-color: #8C3DDB;
        border: none;
        color: white;
        border-radius: 10px;
        font-size: 12px;
        padding: 7px 25px;
        text-align: center;
        margin-left: 10px;
    }

    .request-head-action-chat {
        background-color: #FCFCFC;
        color: #707070;
        padding: 7px 25px;
        border-radius: 10px;
        font-size: 12px;
        text-align: center;
    }

    .request-head-action-chat i {
        color: #A347FF;
        font-size: 16px;
        margin-left: 5px;
    }

    .request-body {
        padding: 20px 15px;
    }

    .request-point {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }

    .request-point-title {
        margin: 0;
        color: #585858;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    .request-point-title i {
        font-size: 22px;
        margin-left: 5px;
        color: #D2D2D2;
    }

    .request-point-items {
        background-color: #F8F8F8;
        border-radius: 10px;
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    .request-point-item {
        color: #707070;
        margin: 4px;
        font-size: 14px;
    }

    .request-footer {
        display: flex;
        align-items: center;
        border-top: 2px solid #f9f9f9;
        padding-top: 15px;
    }

    .request-footer-title {
        color: #9B9999;
        font-size: 16px;
        margin: 0 10px;
    }

    .request-footer-action {
        display: flex;
        align-items: center;
        padding: 8px 25px;
        background-color: #3CAEA3;
        border: none;
        border-radius: 10px;
        color: white;
    }

    .request-footer-action i {
        margin-right: 5px;
        font-size: 20px;
    }

    @media only screen and (max-width: 567.8px) {
        .request-head {
            flex-direction: column;
            align-items: center;
        }

        .request-head-action {
            display: flex;
            margin-top: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .request-footer {
            flex-wrap: wrap;
            justify-content: center;
        }

        .request-footer-action {
            margin-top: 20px;
        }
    }
</style>