<template>
    <section class="payment-wrapper">
        <package-staging v-if="hasPackage" current-stage-value="pay"/>
        <div class="itemBlock" :class="[{'no-top': !hasPackage}]">
            <div class="payment" v-if="showResult">
                <i v-if="isSuccess" class="material-icons payment-icon payment-icons--success">
                    done
                </i>
                <i v-else class="material-icons payment-icon payment-icons--error">
                    close
                </i>
                <p v-if="isSuccess" class="payment-text payment-text--success isansFont">
                    سفارش شما با موفقیت ثبت شد!
                    <br>
                    <span v-if="wasFree">
                    سفارش شما رایگان لحاظ شده است.
                </span>
                </p>
                <p v-else class="payment-text payment-text--error isansFont">
                    خطایی هنگام پرداخت رخ داد.
                </p>

                <p v-if="isSuccess" class="payment-result payment-result--success">
                    <span class="payment-result-info isansFont">کد پیگیری سفارش :</span>
                    <span class="payment-result-code gadugiFont">{{this.refld}}</span>
                </p>

                <p v-else class="payment-result payment-result--error">
                <span class="payment-result-info isansFont--faNum">
                    خطایی هنگام احراز پرداخت شما رخ داد و یا توسط شما کنسل شد. اگر تا 5 دقیقه دیگر پیامک موفق بودن خرید برایتان نیامد ولی مبلغی از حسابتان کم شده، جای نگرانی نیست و ظرف 72 ساعت مبلغ کسر شده به حسابتان باز می گردد. در صورتی که مبلغ مورد نظر بعد از 72 ساعت به حسابتان بازنگشت، با پشتیبانی اسنیدز تماس بگیرید.
                    <mark class="payment-result-info--marked">برای پیگیری های بعدی لطفاً کد زیر را همراه خود داشته باشید.</mark>
                </span>
                    <span class="payment-result-code payment-result-code--error gadugiFont">
                    Authority Code : {{$route.query.Authority}}
                </span>
                </p>

                <div class="payment-result-box isansFont" v-if="hasTimeSlot">
                    <p class="payment-result-data">
                        جلسه شما با موفقیت رزرو شده است. می توانید برای مشاهده جلسات خود به صفحه "جلسات رزرو شده" مراجعه
                        کنید.
                    </p>
                    <router-link to="/user/sessions" class="payment-action payment-action--success">
                        مشاهده جلسات رزرو شده <i class="material-icons">keyboard_arrow_left</i>
                    </router-link>
                </div>

                <div class="payment-result-box isansFont" v-if="hasPackage">
                    <p class="payment-result-data" v-if="hasFilledPackageForm">
                        پکیج شما با موفقیت رزرو شده است.
                        شما قبلاً "فرم اطلاعات اپلای" را پر کرده اید. در این مرحله اطلاعات پکیج شما برای مشاورین ما
                        ارسال می شود و
                        شما می توانید از بین مشاورانی که برای انجام پکیج شما اعلام آمادگی کرده اند، یکی را انتخاب کنید.
                        اطلاعات موجود در این فرم، توسط شما در هر زمان قابل ویرایش است. اما به جهت جلوگیری از بوجود آمدن
                        ناهماهنگی های
                        احتمالی، از تغییر آن حین پروسه اپلای، خودداری فرمایید.
                    </p>
                    <p class="payment-result-data" v-else>
                        پکیج شما با موفقیت رزرو شده است. برای ادامه مسیر، لازم است "فرم اطلاعات اپلای" خود را تکمیل
                        کنید.
                        توجه داشته باشید که اگر این فرم را تکمیل نکنید، در این مرحله برای هیچ یک از مشاوران ما، درخواست
                        شما
                        نشان داده نمی شود و پروسه اپلای شما در این مرحله تا زمانی که فرم اطلاعات اپلای خود را کامل کنید،
                        متوقف می شود.
                        با تکمیل فرم، به طور اتوماتیک، فرآیند ادامه پیدا می کند.
                        اطلاعات موجود در این فرم، توسط شما در هر زمان قابل ویرایش است. اما به جهت جلوگیری از ناهماهنگی
                        های
                        احتمالی، از تغییر آن حین پروسه اپلای، خودداری فرمایید.
                    </p>
                    <router-link to="/user/userpackages" class="payment-action payment-action--success isansFont"
                                 v-if="hasFilledPackageForm">
                        مشاهده پکیج های رزرو شده<i class="material-icons">keyboard_arrow_left</i>
                    </router-link>
                    <router-link to="/user/userpackages/staging/form"
                                 class="payment-action payment-action--success isansFont" v-else>
                        تکمیل فرم اطلاعات اپلای<i class="material-icons">keyboard_arrow_left</i>
                    </router-link>
                </div>

                <div class="payment-result-box isansFont" v-if="hasPhase">
                    <p class="payment-result-data">
                        هزینه {{order.sold_store_paid_package_phases[0]}} پکیج شما با موفقیت پرداخت شد.
                    </p>
                    <router-link :to="`/user/userpackages/manager/${orderStorePackageId}`"
                                 class="payment-action payment-action--success">
                        مشاهده پکیج <i class="material-icons">keyboard_arrow_left</i>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import PackageStaging from "@/components/Packages/PackageStaging";

    export default {
        name: "Payment",
        components: {
            "package-staging": PackageStaging
        },
        data() {
            return {
                refld: '',
                detail: '',
                order: null,
                showResult: false,
                currentPackageForm: null,
            }
        },
        methods: {
            async verifyPayment() {
                try {
                    this.showResult = false;
                    let result = await this.$api.post(
                        `${this.api}/payment/verify/`,
                        {"authority": this.$route.query.Authority, "status": this.$route.query.Status},
                        this.httpConfig
                    );
                    if(result && result.data && result.data.order) {
                        this.order = (await this.$api.get(`${this.api}/order/orders/${result.data.order}/`, this.httpConfig)).data;
                        this.currentPackageForm = (await this.$api.get(`${this.api}/account/student-detailed-info/`, this.httpConfig)).data[0];
                        this.detail = result.data.detail;
                        this.refld = result.data.ReflD;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.showResult = true;
                }
            },

            async getOrderAndPackageForm() {
                try {
                    this.order = (await this.$api.get(`${this.api}/order/orders/${this.$route.query.order}/`, this.httpConfig)).data;
                    this.currentPackageForm = (await this.$api.get(`${this.api}/account/student-detailed-info/`, this.httpConfig)).data[0];
                } catch (e) {
                    console.log(e);
                } finally {

                }
            }
        },
        created() {
            if (this.wasFree) {
                console.log("REFLD 00000000 & payment is good");
                this.getOrderAndPackageForm();

                this.refld = this.$route.query.refld;
                this.showResult = true;
                this.detail = "success";
                console.log(this.isSuccess);
                console.log(this.showResult);
            } else {
                this.verifyPayment();
            }
        },
        computed: {
            isSuccess() {
                if (this.detail.length != 0) {
                    return this.detail.toLowerCase() === 'success' && this.hasOrder || this.wasFree;
                } else {
                    return false;
                }
            },

            api() {
                return this.$store.getters.getApi;
            },

            httpConfig() {
                return this.$store.getters.httpConfig;
            },

            hasOrder() {
                return !!this.order;
            },

            hasPackage() {
                return this.hasOrder && this.order.sold_store_paid_package_phases[0] && this.order.sold_store_paid_package_phases[0].phase_number == 1;
            },

            hasPhase() {
                return this.hasOrder && this.order.sold_store_paid_package_phases[0] && this.order.sold_store_paid_package_phases[0].phase_number != 1;
            },

            wasFree() {
                return this.$route.query.hasOwnProperty('refld') && this.$route.query.refld == "00000000" && this.$route.query.hasOwnProperty('order');
            },

            orderStorePackageId() {
                if (this.hasPackage || this.hasPhase) {
                    let splitted = this.order.sold_store_paid_package_phases[0].sold_store_package.split("/");
                    splitted.pop();
                    return splitted[splitted.length - 1];
                }
            },

            hasTimeSlot() {
                return this.hasOrder && this.order.sold_time_slot_sales.length > 0;
            },

            hasFilledPackageForm() {
                return !!this.currentPackageForm;
            }
        },
    }
</script>

<style scoped>

    .payment-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 30px #00000029;
        border: 1px solid #B3B3B3;
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .itemBlock.no-top {
        margin-top: 0;
    }

    .payment {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .payment-icon {
        font-size: 40px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        padding: 0;
        border-radius: 50%;
        margin-top: 15px;
    }

    .payment-icons--success {
        background-color: #3CAEA3;
        color: white;

    }

    .payment-icons--error {
        color: white;
        background-color: #E46464;
    }

    .payment-text {
        font-weight: bold;
        margin: 15px 0;
        font-size: 20px;
    }

    .payment-text--success {
        color: #3CAEA3;
    }

    .payment-text--error {
        color: #585858;
    }

    .payment-result {
        background-color: #FCFCFC;
        border-radius: 15px;
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .payment-text--error {
        color: #585858;
    }

    .payment-result {
        background-color: #FCFCFC;
        border-radius: 15px;
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .payment-result-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 15px 30px;
    }

    .payment-result-data {
        color: #707070;
        font-weight: bold;
        line-height: 25px;
        margin: 0;
    }

    .payment-result-info {
        color: #707070;
        font-weight: bold;
        line-height: 25px;
    }

    .payment-result-code {
        color: #3CAEA3;
        margin: 10px 0;
        font-weight: bold;
    }

    .payment-result-code--error {
        color: #c9737c;
    }

    .payment-result-info--marked {
        color: #c9737c;
        padding: 0;
        background: none;
    }

    .payment-action {
        display: flex;
        align-items: center;
        transition: box-shadow 0.1s ease-in-out;
        padding: 15px 20px;
        border-radius: 15px;
        margin-top: 15px;
    }

    .payment-action i {
        margin-right: 10px;
    }

    .payment-action--success {
        background-color: #3CAEA3;
        color: white;
    }

    .payment-action--error {
        background-color: #9B9999;
        color: white;
    }

    .payment-action:hover {
        box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
    }

    @media only screen and (max-width: 991.8px) {
        .itemBlock {
            border-radius: 0;
            border: none;
            background-color: white;
            box-shadow: none;
        }
    }
</style>
