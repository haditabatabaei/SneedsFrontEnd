<template>
        <div class="container activeCart">
            <div class="row">
                <p class="isansFont--faNum">پرداخت فاکتور :</p>
                <div class="col-md-8" v-if="cart && cartProducts.length > 0">
                    <div class="cartsWrapper">
                        <div class="cartsWrapper-title isansFont--faNum">
                            <div class="cartsWrapper-title-consultant">
                                <img v-bind:src="cartProducts[0].consultant.profile_picture" draggable="false" alt="">
                                <div class="cartsWrapper-title-consultant--info">
                                    <h5 class="isansFont--faNum">رزرو مشاوره آنلاین</h5>
                                    <h6 class="isansFont--faNum">{{`(${cartProducts[0].consultant.first_name} ${cartProducts[0].consultant.last_name})`}}</h6>
                                </div>
                            </div>
                        </div>

                        <div class="cartsWrapper-item" v-for="(product, index) in cartProducts" :key="index">
                            <p class="isansFont--faNum cartsWrapper-item--day">{{getJalali(product.start_time).locale('fa').format('dddd DD MMMM')}}</p>
                            <p class="isansFont--faNum cartsWrapper-item-length">
                                <i class="material-icons">alarm_on</i>
                                <span>{{getJalali(product.start_time).locale('fa').format('HH:mm')}}</span>
                                <span>{{getJalali(product.end_time).locale('fa').format('HH:mm')}}</span>
                            </p>
                        </div>
                    </div>

                    <div class="cartsWrapper">
                        <p class="isansFont--faNum discount-title">
                            <i class="material-icons">shopping_cart</i>
                            کد تخفیف داری ؟
                        </p>
                        <div class="discount-wrapper">
                            <form @submit.prevent="checkDiscountCode()" class="cartsWrapper-price--discount">
                                <input type="text" placeholder="کد تخفیف" class="isansFont--faNum" :class="[codeStatus]" v-model.trim="inputCode">
                                <button class="isansFont--faNum" :class="[codeStatus]">
                                    <i class="material-icons" v-if="codeStatus == 'empty'">add</i>
                                    <i class="material-icons" v-else-if="codeStatus == 'success'">done</i>
                                    <i class="material-icons" v-else-if="codeStatus == 'error'">close</i>
                                </button>
                            </form>

                            <p v-if="codeStatus == 'success'" class="isansFont--faNum code-text success">
                                کد تخفیف
                                <mark>{{discounts[0].consultant_discount.percent + " %"}}</mark>
                                اعمال شد
                            </p>

                            <p v-else-if="codeStatus == 'error'" class="isansFont--faNum code-text error">
                                کد تخفیف وارد شده صحیح نمی باشد!
                            </p>

                            <div class="cartsWrapper-discounts isansFont--faNum" v-if="discounts.length > 0">
                                <p v-for="(discount, index) in discounts" :key="index">
                                    <button class="btn btn-sm btn-simple btn-danger" @click="deleteDiscountById(discount.id)">
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

                <div class="col-md-4 payWrapper" v-if="cart">
                    <div class="cartsWrapper isansFont--faNum" style="position: relative">
                        <p class="cartsWrapper-item-length-price-subtotal">
                            <span> هزینه {{`(${cartProducts.length} جلسه)`}}</span>
                            <span>{{cart.subtotal}} تومان </span>
                        </p>
                        <p class="cartsWrapper-item-length-price-discount" v-for="(discount, index) in discounts" :key="index">
                            <span>تخفیف</span>
                            <span >
                                {{`(${discount.consultant_discount.percent}%)`}}
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
                            {{cart.total}}
                            تومان
                        </button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'

    export default {
        name: "UserActiveCart",
        data() {
            return {
                cart: null,
                cartProducts: [],
                discounts: [],
                inputCode: '',
                codeStatus: 'empty'
            }
        },
        created() {
            this.initComp();
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            async initComp() {
                await this.getLastCart();
                if (this.cart) {
                    await this.getCartProducts();
                    await this.getDiscountsOnThisCart();
                }
            },

            async getLastCart() {
                try {
                    this.$loading(true);
                    let result = await axios.get(`${this.$store.getters.getApi}/cart/carts/`, this.$store.getters.httpConfig);
                    console.log(result);
                    this.cart = result.data[result.data.length - 1];
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

            async getCartProducts() {
                try {
                    this.$loading(true);
                    this.cartProducts = [];
                    for (let productId of this.cart.products) {
                        let result = await axios.get(`${this.$store.getters.getApi}/store/time-slot-sales/${productId}/`, this.$store.getters.httpConfig);
                        console.log(result);
                        this.cartProducts.push(result.data);
                    }
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
                    let result = await axios.post(
                        `${this.$store.getters.getApi}/discount/cart-consultant-discounts/`,
                        {"cart": this.cart.id, "code": this.inputCode},
                        this.$store.getters.httpConfig
                    );
                    console.log('code result : ', result);
                    this.inputCode = '';
                    await this.initComp();
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
                    let result = await axios.get(`${this.$store.getters.getApi}/discount/cart-consultant-discounts/?cart=${this.cart.id}`, this.$store.getters.httpConfig);
                    console.log('discounts for this cart :', result);
                    this.discounts = result.data;
                    if(this.discounts.length > 0) {
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
                    let result = await axios.delete(`${this.$store.getters.getApi}/discount/cart-consultant-discounts/${id}`, this.$store.getters.httpConfig);
                    console.log('delete for this cart :', result);
                    await this.initComp();
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
                    let result = await axios.post(`${this.$store.getters.getApi}/payment/request/`, {"cartid": this.cart.id}, this.$store.getters.httpConfig);
                    console.log(result);
                    window.location.replace(result.data.redirect);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            }
        }

    }
</script>

<style scoped>

    .activeCart {
        margin-top: 100px;
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
        justify-content: space-between;
        margin: 10px;
    }

    .cartsWrapper-title-consultant {
        display: flex;
        align-items: center;
    }

    .cartsWrapper-title-consultant img{
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

    .cartsWrapper-title-consultant--info h5,h6{
        margin: 0;
        font-weight: bold;
    }

    .cartsWrapper-title-consultant--info h6 {
        margin-right: 5px;
        font-weight: normal ;
    }

    .cartsWrapper-item {
        padding-right: 50px;
        padding-left: 50px;
        margin-bottom: 15px;
    }

    .cartsWrapper-item--day {
        font-size: 12px;
        color : #A0A0A0;
    }

    .cartsWrapper-item-length {
        display: flex;
        width: 100%;
        align-items:center;
        justify-content: space-between;
        background-color : #F2F2F2;
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
        border:2px solid #9038CC;
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
        padding:5px 10px;
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
        border-radius:0 0 10px 10px;
        border:none;
        background: #9038CC;
        color: white;
        font-weight: bold;
    }


    .cartsWrapper-title i {
        margin-left: 5px;
    }

    .cartsWrapper-text {
        padding-right: 20px;
        padding-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 2.5rem;
        font-size: 15px;
        color: #999;
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

    .cartsWrapper-price--button {
        border: none;
        background-color: #9038CC;
        color: white;
        padding: 10px 25px;
        border-radius: 10px;
    }

    .cartsWrapper-price--discount {
        display: flex;
        position: relative;
        padding: 10px;
    }

    .cartsWrapper-price--discount input {
        border-radius: 0 10px 10px 0;
        border: none    ;
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
        background-color : #3BAFA6;
        color: white;
    }

    .cartsWrapper-price--discount input.success {
        border:1px solid #3BAFA6;
    }

    .cartsWrapper-price--discount button.error {
        background-color : #E46465;
        color: white;
    }

    .cartsWrapper-price--discount input.error {
        border:1px solid #E46465;
    }


    .cartsWrapper-price--meta {
        margin: auto auto auto 20px;
        display: flex;
        align-items: center;
    }

    .cartsWrapper-price--meta strong {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 20px;
    }

    .discount-title {
        display: flex;
        align-items:center;
        font-weight: bold;
        padding:10px;
    }

    .discount-wrapper {
        display: flex;
        width: 100%;
        align-items:center;
    }

    .discount-title i {
        color: #9038CC;
        margin-left: 10px;
    }

    .infoWrapper {
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
        padding-bottom: 10px;
        padding-top: 10px;
        margin-top: 30px;
    }

    .priceWrapper {
        border-radius: 10px;
        border: 1px solid #999;
        background-color: white;
    }

    .cardConsultBlock--image {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        margin-right: 15px;
    }

    .cardConsultBlock {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        margin-top: 20px;
    }

    .cardConsultantBlock--price {
        margin-right: auto;
    }

    .cardConsultantBlock--info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex-grow: 2;
        align-self: stretch;
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

    .priceWrapper--discountCodeBox {
        margin-top: 20px;
        margin-bottom: 20px;
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

    .cartsWrapper-discounts button {
        padding: 5px;
        margin-left: 5px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .code-text {
        margin-bottom:0;
        margin-right: 30px
    }

    .code-text.success mark {
        color : #4cc26c;
        background-color: inherit;
        font-weight: bold;
    }
    .code-text.error {
        color: #E46465;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .payWrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0;
            border-radius: 0;
            z-index: 999;
        }

        .payWrapper .cartsWrapper {
            border-radius: 0;
        }

        .cartsWrapper-item-paybutton {
            border-radius: 0;
        }

        .discount-wrapper {
            flex-wrap : wrap;
            justify-content: center;
        }

        .cartsWrapper-title-consultant {
            flex-wrap : wrap;
            justify-content: center;
        }



        /*.priceWrapper {*/
        /*    margin-right: 0;*/
        /*    margin-top: 15px;*/
        /*}*/

        /*.cardsWrapper {*/
        /*    margin-right: 0;*/
        /*}*/


    }
</style>
