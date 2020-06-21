<template>
    <div class="container activeCart" style="padding-top: 15px;">
        <div class="row">
            <div class="col-md-8" v-if="thereIsFactor">
                <package-staging current-stage-value="login" v-if="thereIsPackage" />
                <div class="cartsWrapper" v-if="thereIsTimeSlots">
                    <div class="cartsWrapper-title isansFont--faNum">
                        <img class="cartsWrapper-title-consultant-image" v-bind:src="cart.time_slot_sales[0].consultant.profile_picture" draggable="false" :alt="`(${cart.time_slot_sales[0].consultant.first_name}
                                ${cart.time_slot_sales[0].consultant.last_name})`">
                        <div class="cartsWrapper-title-consultant--info">
                            <h5 class="isansFont--faNum">رزرو مشاوره آنلاین</h5>
                            <h6 class="isansFont--faNum">{{`(${cart.time_slot_sales[0].consultant.first_name}
                                ${cart.time_slot_sales[0].consultant.last_name})`}}</h6>
                        </div>
                    </div>
                    <div class="cartsWrapper-item" v-for="slot in cart.time_slot_sales">
                        <p class="isansFont--faNum cartsWrapper-item--day">
                            {{getJalali(slot.start_time).locale($store.getters.locale).format('dddd DD MMMM')}}</p>
                        <p class="isansFont--faNum cartsWrapper-item-length">
                            <i class="material-icons">alarm_on</i>
                            <span>{{getJalali(slot.start_time).locale($store.getters.locale).format('HH:mm')}}</span>
                            <span>{{getJalali(slot.end_time).locale($store.getters.locale).format('HH:mm')}}</span>
                        </p>
                    </div>
                </div>
                <div class="cartsWrapper" v-if="thereIsPackage" v-for="storePackage in cart.store_packages" >
                    <div class="cartsWrapper-title isansFont--faNum">
                        <i class="material-icons plane-icon">airplanemode_active</i>
                        <div class="cartsWrapper-title-consultant--info">
                            <h5 class="isansFont">رزرو {{storePackage.title}}</h5>
                        </div>
                    </div>
                    <div class="cartsWrapper-package-detail">
                        <ul class="package-detail-list">
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>تضمین بازگشت هزینه رزرو در صورت عدم رضایت.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>بررسی رایگان فرم اطلاعات تحصیلی شما به دست مشاوران اسنیدز.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>امکان انجام مشاوره تصویری رایگان قبل از تایید با مشاورانی که پروژه شما رو قبول
                                    کرده‌اند.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>بعد از تایید مشاور توسط شما، مبلغ ۱۵.۵ میلیون تومان در ۳ قسط جداگانه دریافت خواهد
                                    شد.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="cartsWrapper" v-if="thereIsUnpaidPhase" v-for="phase in cart.sold_store_unpaid_package_phases">
                    <div class="cartsWrapper-title isansFont--faNum">
                        <i class="material-icons plane-icon">airplanemode_active</i>
                        <div class="cartsWrapper-title-consultant--info">
                            <h5 class="isansFont">پرداخت {{phase.title}}</h5>
                        </div>
                    </div>
                    <div class="cartsWrapper-package-detail">
                        <ul class="package-detail-list">
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>تضمین بازگشت هزینه رزرو در صورت عدم رضایت.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>بررسی رایگان فرم اطلاعات تحصیلی شما به دست مشاوران اسنیدز.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">done</i>
                                <p>امکان انجام مشاوره تصویری رایگان قبل از تایید با مشاورانی که پروژه شما رو قبول
                                    کرده‌اند.</p>
                            </li>
                            <li class="package-detail-item isansFont">
                                <i class="material-icons">info</i>
                                <p>توضیحات {{phase.title}}: {{phase.detailed_title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="cartsWrapper">
                    <p class="isansFont--faNum discount-title">
                        <i class="material-icons">shopping_cart</i>
                        کد تخفیف داری ؟
                    </p>
                    <div class="discount-wrapper">
                        <form @submit.prevent="checkDiscountCode()" class="cartsWrapper-price--discount">
                            <input type="text" placeholder="کد تخفیف" class="isansFont--faNum" :class="[codeStatus]"
                                   v-model.trim="inputCode">
                            <button class="isansFont--faNum" :class="[codeStatus]">
                                <i class="material-icons" v-if="codeStatus === 'empty'">add</i>
                                <i class="material-icons" v-else-if="codeStatus === 'success'">done</i>
                                <i class="material-icons" v-else-if="codeStatus === 'error'">close</i>
                            </button>
                        </form>

                        <p v-if="codeStatus == 'success'" class="isansFont--faNum code-text code-text--success">
                            کد تخفیف اعمال شد
                        </p>

                        <p v-else-if="codeStatus == 'error'" class="isansFont--faNum code-text code-text--error">
                            کد تخفیف وارد شده صحیح نمی باشد!
                        </p>

                        <div class="cartsWrapper-discounts isansFont--faNum" v-if="discounts.length > 0">
                            <p class="discounts-item" v-for="(discount, index) in discounts" :key="index">
                                <button class="discounts-item-remove-button" @click="deleteDiscountById(discount.id)">
                                    <i class="material-icons">close</i>
                                </button>
                                {{discount.code}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 cartsWrapper" v-else>
                <p class="isansFont--faNum">فاکتوری برای نمایش وجود ندارد</p>
            </div>

            <div class="col-md-4 payWrapper" v-if="thereIsFactor">
                <div class="cartsWrapper isansFont--faNum" style="position: relative">
                    <p class="cartsWrapper-item-length-price-subtotal" v-if="thereIsTimeSlots">
                        <span> هزینه {{`(${cart.time_slot_sales.length} جلسه)`}}</span>
                        <span>{{cart.subtotal}} تومان </span>
                    </p>
                    <p class="cartsWrapper-item-length-price-subtotal" v-else-if="thereIsPackage">
                        <span>هزینه</span>
                        <span>{{cart.subtotal}} تومان </span>
                    </p>
                    <p class="cartsWrapper-item-length-price-discount">
                            <span>
                                تخفیف خورده :
                                {{`${cart.subtotal - cart.total} تومان`}}
                            </span>
                    </p>
                    <p class="cartsWrapper-item-length-price-total">
                        <span>مجموع</span>
                        <span>{{cart.total}} تومان </span>
                    </p>

                    <p class="cartsWrapper-item-safe">
                        <i class="material-icons">done</i>
                        <span>
                                <strong>پرداخت امن</strong>
                                <br>
                                <span>از طریق کارت های عضو شتاب</span>
                            </span>
                    </p>


                    <button class="cartsWrapper-item-paybutton" @click="requestPayment()">
                        پرداخت |
                        <span v-if="Number(cart.total) == 0">
                               رایگان !
                            </span>
                        <span v-else>
                                {{cart.total}}
                            تومان
                            </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'
    import PackageStaging from "@/components/Packages/PackageStaging";

    export default {
        name: "UserActiveCart",
        components: {
            'package-staging': PackageStaging
        },
        data() {
            return {
                cart: null,
                discounts: [],
                inputCode: '',
                codeStatus: 'empty'
            }
        },
        created() {
            this.initComp();
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },

            thereIsFactor() {
                return this.thereIsPackage || this.thereIsTimeSlots || this.thereIsUnpaidPhase;
            },

            thereIsTimeSlots() {
                return this.cart && this.cart.time_slot_sales.length > 0;
            },

            thereIsPackage() {
                return this.cart && this.cart.store_packages.length > 0;
            },

            thereIsUnpaidPhase() {
                return this.cart && this.cart.sold_store_unpaid_package_phases.length > 0;
            },

            packageToBuy() {
                return this.cart.store_packages.length != 0 || false;
            }
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            async initComp() {
                await this.getCurrentCart();
                if (this.cart) {
                    this.getDiscountsOnThisCart();
                }
            },

            async getCurrentCart() {
                try {
                    this.$loading(true);
                    let result = await this.$api.get(`${this.api}/cart/carts/${this.$route.params.id}/`, this.httpConfig);
                    this.cart = result.data;
                    console.log('current last cart ', this.cart);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async checkDiscountCode() {
                try {
                    this.$loading(true);
                    let result = await this.$api.post(
                        `${this.$store.getters.getApi}/discount/cart-discounts/`,
                        {"cart": this.cart.id, "code": this.inputCode},
                        this.$store.getters.httpConfig
                    );
                    console.log('code result : ', result);
                    this.inputCode = '';
                    this.getCurrentCart();
                    this.getDiscountsOnThisCart();
                } catch (e) {
                    this.codeStatus = 'error';
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getDiscountsOnThisCart() {
                try {
                    this.$loading(true);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/discount/cart-discounts/?cart=${this.cart.id}`, this.$store.getters.httpConfig);
                    console.log('discounts for this cart :', result);
                    this.discounts = result.data;
                    if (this.discounts.length > 0) {
                        this.codeStatus = 'success'
                    } else {
                        this.codeStatus = 'empty'
                    }
                } catch (e) {
                    this.discounts = 'error';
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async deleteDiscountById(id) {
                try {
                    this.$loading(true);
                    let result = await this.$api.delete(`${this.$store.getters.getApi}/discount/cart-discounts/${id}/`, this.$store.getters.httpConfig);
                    console.log('delete for this cart :', result);
                    this.getCurrentCart();
                    this.getDiscountsOnThisCart();
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },


            getConsultantSlugFromUrl(url) {
                let splitted = url.split("/");
                return splitted[splitted.length - 1];
            },

            async requestPayment() {
                try {
                    this.$loading(true);
                    let result = await this.$api.post(`${this.$store.getters.getApi}/payment/request/`, {"cartid": this.cart.id}, this.$store.getters.httpConfig);
                    console.log(result);
                    this.$store.commit('setStash', []);
                    if (result.data.redirect) {
                        window.location.replace(result.data.redirect);
                    } else {
                        this.$router.push('/user/payment/accept?refld=00000000');
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                        if (e.response.data.detail) {
                            if (typeof e.response.data.detail == "object") {
                                this.printMessage(e.response.data.detail.join(","), "پرداخت: خطا", "error", 5000, "notif");
                            } else if (typeof e.response.data.detail == "string") {
                                this.printMessage(e.response.data.detail, "پرداخت: خطا", "error", 5000, "notif");
                            } else {
                                this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "پرداخت: خطا", "error", 5000, "notif");
                            }
                        }
                    } else {
                        this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "پرداخت: خطا", "error", 5000, "notif");
                    }
                } finally {
                    this.$loading(false);
                }
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },
        }

    }
</script>

<style scoped>

    .activeCart {
        margin-top: 115px;
        min-height: calc(100vh - 100px);
    }

    .cartsWrapper {
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
        padding: 10px;
    }

    .cartsWrapper:not(:first-child) {
        margin-top: 15px;
    }

    .cartsWrapper-title {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 10px;
        border-bottom: 2px solid #eee;
        padding-bottom: 20px;
    }

    .cartsWrapper-title-consultant img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-left: 10px;
    }

    .cartsWrapper-title-consultant--info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .cartsWrapper-title-consultant--info h5, h6 {
        margin: 0;
        font-weight: bold;
    }

    .cartsWrapper-title-consultant--info h6 {
        margin-right: 5px;
        font-weight: normal;
    }

    .cartsWrapper-item {
        padding-right: 50px;
        padding-left: 50px;
        margin-bottom: 15px;
    }

    .cartsWrapper-item--day {
        font-size: 12px;
        color: #A0A0A0;
    }

    .cartsWrapper-item-length {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        background-color: #F2F2F2;
        border-radius: 10px;
        padding: 10px 10px;
        color: #767676;
    }

    .cartsWrapper-item-length span:nth-child(2) {
        margin-left: auto;
        margin-right: 10px;
    }

    .cartsWrapper-title-user {
        border-radius: 10px;
        border: 2px solid #9038CC;
    }

    .cartsWrapper-item-length-price-total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 4px solid #F5F5F5;
        padding: 5px 10px;
        font-weight: bold;
    }

    .cartsWrapper-item-length-price-subtotal {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        color: #a1a1a1;
    }

    .cartsWrapper-item-length-price-discount {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        color: #a1a1a1;
    }

    .cartsWrapper-item-length-price-discount span:nth-child(2) {
        color: #50bc81;
        font-weight: bold;
    }

    .cartsWrapper-item-safe {
        padding: 20px;
        display: flex;
        align-items: center;
        margin-bottom: 60px;
    }

    .cartsWrapper-item-safe i {
        margin-left: 10px;
    }

    .cartsWrapper-item-paybutton {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 50px;
        border-radius: 0 0 10px 10px;
        border: none;
        background: #9038CC;
        color: white;
        font-weight: bold;
    }


    .cartsWrapper-title i {
        margin-left: 5px;
    }

    .cartsWrapper-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        padding-right: 20px;
        padding-left: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .cartsWrapper-price--discount {
        display: flex;
        position: relative;
        padding: 10px;
    }

    .cartsWrapper-price--discount input {
        border-radius: 0 10px 10px 0;
        border: none;
        background-color: #F2F2F2;
        height: 35px;
        padding-right: 5px;
    }

    .cartsWrapper-price--discount button {
        border-radius: 10px;
        height: 35px;
        position: absolute;
        border: 1px solid #4cc26c;
        left: -20px;
        background-color: white;
        color: #4cc26c;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cartsWrapper-price--discount button.success {
        background-color: #3BAFA6;
        color: white;
    }

    .cartsWrapper-price--discount input.success {
        border: 1px solid #3BAFA6;
    }

    .cartsWrapper-price--discount button.error {
        background-color: #E46465;
        color: white;
    }

    .cartsWrapper-price--discount input.error {
        border: 1px solid #E46465;
    }


    .cartsWrapper-price--meta strong {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 20px;
    }

    .discount-title {
        display: flex;
        align-items: center;
        font-weight: bold;
        padding: 10px;
    }

    .discount-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
    }

    .discount-title i {
        color: #9038CC;
        margin-left: 10px;
    }

    .cardConsultantBlock--info h4 {
        font-weight: bold;
        margin: 0 10px 0 0;
    }

    .cardConsultantBlock--info p {
        font-size: 15px;
        margin: 10px 20px;
        color: #666;
    }

    .timesCollapse p {
        font-size: 12px;
        text-align: right;
        display: flex;

        align-items: center;
        justify-content: flex-start;
    }

    .timesCollapse button {
        margin: 0;
        padding: 10px;
    }

    .priceWrapper--discountCodeBox form {
        display: flex;
        justify-content: center;
    }

    .priceWrapper--discountCodeBox form input[type="text"] {
        border-radius: 30px;
        padding: 5px 10px;
        border: none;
        background-color: #f0f0f0;
        height: 40px;
    }

    .priceWrapper--discountCodeBox form button {
        border-radius: 30px;
        background-color: #22B473;
        color: white;
        border: none;
        height: 40px;
        font-size: 12px;
        padding-right: 10px;
        padding-left: 10px;
        position: relative;
        margin-right: -50px;
    }

    .cartsWrapper-discounts {
        padding-right: 20px;
    }

    .cartsWrapper-discounts p {
        margin-bottom: 0;
    }


    .code-text {
        margin-bottom: 0;
        margin-right: 30px
    }

    .code-text--success {
        color: #22B473;
        background-color: inherit;
        font-weight: bold;
    }

    .code-text--error {
        color: #E46465;
    }

    .discounts-item {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .discounts-item-remove-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding: 0;
        background: none;
        border: none;
    }

    .discounts-item-remove-button i {
        font-size: 18px;
    }

    .plane-icon {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-left: 15px;
        color: #8C3DDB;
        background-color: #ECD9FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
    }

    .cartsWrapper-package-detail {
        margin: 10px;
    }

    .package-detail-list {
        padding: 0;
        list-style: none;
    }

    .package-detail-item {
        display: flex;
        align-items: center;
        margin: 10px;
    }

    .package-detail-item p {
        margin: 0 5px;
        color: #585858;
    }

    .package-detail-item i {
        color: #8C3DDB;
        font-size: 16px;
    }

    .cartsWrapper-title-consultant-image {
        width: 140px;
        height: 140px;
        border-radius: 10px;
        margin-left: 10px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .payWrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0;
            border-radius: 0;
            z-index: 998;
        }

        .payWrapper .cartsWrapper {
            border-radius: 0;
        }

        .cartsWrapper-item-paybutton {
            border-radius: 0;
        }

        .discount-wrapper {
            flex-wrap: wrap;
            justify-content: center;
        }

        .cartsWrapper-title-consultant {
            flex-wrap: wrap;
            justify-content: center;
        }

        .activeCart {
            padding-bottom: 300px;
        }
    }
</style>
