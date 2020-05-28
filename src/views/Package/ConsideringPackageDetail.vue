<template>
    <section class="package">
        <div class="package-overlay"></div>
        <div class="package-detail">
            <router-link to="/user/packages/considering" class="package-detail-back isansFont">
                بازگشت به پکیج ها
                <i class="material-icons">keyboard_arrow_left</i>
            </router-link>
            <section class="package-detail-box">
                <div class="package-detail-box-title">
                    <h1 class="package-detail-box-title-text isansFont">درخواست پکیج طلایی</h1>
                </div>
                <div class="package-detail-box-intro">
                    <div class="detail-box-intro-personal">
                        <h2 class="isansFont detail-box-intro-personal-name">
                            محمد علی جزئی
                        </h2>
                        <h3 class="isansFont detail-box-intro-personal-info">
                            دانشجوی ارشد رشته فلان دانشگاه فلان
                        </h3>
                    </div>
                    <div class="detail-box-intro-actions">
                        <a href="#" class="isansFont detail-box-intro-actions-resume">
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
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            کشور مقصد
                        </span>
                        <p class="detail-box-item-value">
                            آمریکای جهانخوار
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            مقطع مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            پست دکتری
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            معدل
                        </span>
                        <p class="detail-box-item-value">
                            18.25
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            مدرک زبان
                        </span>
                        <p class="detail-box-item-value">
                            دارد - آیلتس
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            ترم مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            زمستان 2020
                        </p>
                    </div>
                    <div class="detail-box-item">
                        <i class="material-icons">
                            settings
                        </i>
                        <span class="detail-box-item-key">
                            رشته مورد نظر
                        </span>
                        <p class="detail-box-item-value">
                            آبیاری گیاهان دریایی در سواحل مدیترانه
                        </p>
                    </div>
                </div>
                <div class="package-detail-box-form isansFont--faNum">
                    <div class="package-detail-box-form-head">
                        <h2 class="box-form-head-text isansFont--faNum">
                            <i class="material-icons">
                                settings
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
                                محمدل علی جزئی
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                وضعیت تاهل
                            </span>
                            <span class="form-info-field-value">
                                مجرد
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                سن
                            </span>
                            <span class="form-info-field-value">
                                22
                            </span>
                        </p>
                    </div>
                </div>
                <div class="package-detail-box-form isansFont--faNum">
                    <div class="package-detail-box-form-head">
                        <h2 class="box-form-head-text isansFont--faNum">
                            <i class="material-icons">
                                settings
                            </i>
                            اطلاعات آخرین مقطع تحصیلی
                        </h2>
                    </div>
                    <div class="package-detail-box-form-info">
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                نام و نام خانوادگی:
                            </span>
                            <span class="form-info-field-value">
                                محمدل علی جزئی
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                وضعیت تاهل
                            </span>
                            <span class="form-info-field-value">
                                مجرد
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                مدرک زبان:
                            </span>
                            <span class="form-info-field-value">
                                آیلتس
                            </span>
                            <span class="form-info-field-multivalue isansFont">
                                R:5 L:5 S:5 W:5
                            </span>
                            <a href="#" class="form-info-field-clickcablevalue">
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
                                settings
                            </i>
                            اطلاعات مورد نیاز برای اپلای
                        </h2>
                    </div>
                    <div class="package-detail-box-form-info">
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                نام و نام خانوادگی:
                            </span>
                            <span class="form-info-field-value">
                                محمدل علی جزئی
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                وضعیت تاهل
                            </span>
                            <span class="form-info-field-value">
                                مجرد
                            </span>
                        </p>
                        <p class="form-info-field">
                            <span class="form-info-field-key">
                                توضیحات:
                            </span>
                            <span class="form-info-field-longvalue">
                                ادامه تحصیل همیشه از موضوعاتی بوده که درصد قابل توجهی از جوانان به آن فکر می‌کنند ولی اینکه شما تحصیلات خود را در داخل کشور یا خارج از آن ادامه دهید، تصمیمی سخت و سرنوشت‌ساز است. در صورتی که از بین این دو گزینه تحصیل در خارج از کشور را انتخاب کنید، در میان تمام کشورهایی که وجود دارد، استرالیا یکی از گزینه‌های محبوب و پرطرفدار برای شما خواهد بود. تحصیل در .استرالیا مزایا و همچنین شرایط خاصی دارد که در ادامه این مقاله به بررسی آن‌ها خواهیم پرداخت
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
                package: {}
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
        },
        methods: {
            async getPackage() {
                try {
                    let result = (await this.$api.get(`${this.api}/store/packages/marketplace-detail/${this.$route.params.id}/`, this.httpConfig));
                    console.log(result);
                    this.package = result.data;
                } catch (e) {

                } finally {

                }
            },

            async acceptCurrentPackage() {

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
        background-color: #8C3DDB;
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
</style>