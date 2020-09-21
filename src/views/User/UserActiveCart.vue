<template>
    <div class="cart gadugiFont">
        <div class="cart-container">
            <div class="cart-items cart-block">
                <div class="cart-session" v-if="thereIsTimeSlots">
                    <div class="cart-session-title">
                        <img class="cart-session-image"
                             size="150"
                             :src="cart.time_slot_sales[0].consultant.profile_picture"
                             draggable="false"
                             :alt="`(${cart.time_slot_sales[0].consultant.first_name}
                                    ${cart.time_slot_sales[0].consultant.last_name})`
                        ">
                        <div class="cart-session-info">
                            <h2>Online consultation reservation</h2>
                            <h3>
                                {{`by: ${cart.time_slot_sales[0].consultant.first_name}
                                ${cart.time_slot_sales[0].consultant.last_name}`}}
                            </h3>
                        </div>
                    </div>
                    <div class="cart-session-slots" v-for="slot in cart.time_slot_sales">
                        <p class="session-slot-day">
                            {{getJalali(slot.start_time).format('dddd DD MMMM')}}
                        </p>
                        <div class="session-slot-length">
                            <i class="material-icons">alarm_on</i>
                            <p>{{getJalali(slot.start_time).format('HH:mm')}}</p>
                            <p class="slot-length-end">{{getJalali(slot.end_time).format('HH:mm')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-discount cart-block">
                <p class="discount-title">
                    <i class="material-icons">shopping_cart</i>
                    Have a discount code?
                </p>
                <div class="discount-wrapper">
                    <form @submit.prevent="checkDiscountCode()" class="discount-form">
                        <c-simple-input
                            v-model.trim="inputCode"
                            :externalLabel="true"
                            label="Enter your code here:"
                            class="discount-input"
                            :error="codeStatus === 'error'"
                            error-text="Code is not valid, try another one."
                        />
                        <button class="discount-button" :class="[codeStatus]">
                            Submit code
                        </button>
                    </form>

                    <p v-if="codeStatus == 'success'" class="code-text code-text--success">
                        Discount code successful.
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
            <div class="cart-pay cart-block" v-if="thereIsTimeSlots">
                <div class="cart-pay-item">
                    <p class="cart-pay-item-name">Price for {{`${cart.time_slot_sales.length} session(s):`}}</p>
                    <p class="cart-pay-item-price">{{cart.subtotal}} Tomans </p>
                </div>
                <p class="cart-pay-discount">
                    Discount:
                    {{`${cart.subtotal - cart.total} Tomans`}}
                </p>
                <p class="cart-pay-total">
                    <span>Total: </span>
                    <span>{{cart.total}} Tomans</span>
                </p>


                <button class="cart-pay-button" @click="requestPayment()">
                    Checkout |
                    <span v-if="Number(cart.total) === 0">
                        Free !
                    </span>
                    <span v-else>
                        {{cart.total}} Tomans
                    </span>
                    <moon-loader class="loading-icon" color="#fff" :loading="isLoading" :size="15" sizeUnit="px"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import PackageStaging from "@/components/Packages/PackageStaging";
    import {MoonLoader} from "@saeris/vue-spinners";
    import SimpleInput from "@/components/Form/SimpleInput";

    export default {
        name: "UserActiveCart",
        components: {
            'package-staging': PackageStaging,
            "moon-loader": MoonLoader,
            "c-simple-input": SimpleInput
        },
        data() {
            return {
                cart: null,
                discounts: [],
                inputCode: '',
                codeStatus: 'empty',
                isLoading: false,
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
                    //this.$loading(true);
                    let result = await this.$api.get(`${this.api}/cart/carts/${this.$route.params.id}/`, this.httpConfig);
                    this.cart = result.data;
                    console.log('current last cart ', this.cart);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async checkDiscountCode() {
                try {
                    //this.$loading(true);
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

                }
            },

            async getDiscountsOnThisCart() {
                try {
                    //this.$loading(true);
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

                }
            },

            async deleteDiscountById(id) {
                try {
                    //this.$loading(true);
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

                }
            },


            getConsultantSlugFromUrl(url) {
                let splitted = url.split("/");
                return splitted[splitted.length - 1];
            },

            async requestPayment() {
                try {
                    this.isLoading = true;
                    //this.$loading(true);
                    let result = await this.$api.post(`${this.$store.getters.getApi}/payment/request/`, {"cartid": this.cart.id}, this.$store.getters.httpConfig);
                    console.log(result);
                    this.$store.commit('setStash', []);
                    if (result.data.redirect) {
                        window.location.replace(result.data.redirect);
                    } else {
                        this.$router.push(`/user/payment/accept?refld=00000000&order=${result.data.order}`);
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
                    this.isLoading = false;
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
    .cart {
        width: 100%;
        display: flex;
        justify-content: center;
        min-height: calc(100vh - 100px);
    }

    .cart-container {
        width: 100%;
        max-width: 1170px;
        margin-top: 20px;
        display: grid;
        grid-gap: 15px;
        grid-template-areas: "items items items pay" "discount discount discount .";
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        height: fit-content;
    }

    .cart-items {
        grid-area: items;
        height: fit-content;
    }

    .cart-discount {
        grid-area: discount;
    }

    .cart-pay {
        grid-area: pay;
        position: relative;
        /*height: 400px;*/
    }

    .cart-block {
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 15px;
    }

    .cart-session {
        display: flex;
        flex-direction: column;
    }

    .cart-session-title {
        display: flex;
        align-items: center;
        justify-content: stretch;
    }

    .cart-session-image {
        width: 150px;
        height: 150px;
        border-radius: 10px;
    }

    .cart-session-info {
        margin-left: 10px;
    }

    .cart-session-slots {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    .session-slot-length {
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        border-radius: 10px;
        padding: 10px 10px;
        color: #767676;
    }

    .session-slot-day {
        margin-bottom: 5px;
    }

    .slot-length-end {
        margin-left: auto;
    }

    .cart-pay {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    .cart-pay-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #a1a1a1;
    }

    .cart-pay-item-name {
        font-size: 13px;
    }

    .cart-pay-item-price {
        font-size: 13px;
    }

    .cart-pay-discount {
        font-size: 13px;
        color: #a1a1a1;
        margin-top: 15px;
    }

    .cart-pay-total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: normal;
        border-top: 4px solid #f5f5f5;
        margin-top: 10px;
        padding: 5px 0;
    }

    .cart-pay-button {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -1px;
        height: 50px;
        border-radius: 0 0 10px 10px;
        border: none;
        background: #9038cc;
        color: #fff;
    }

    .cart-pay-button span {
        margin-left: 5px;
    }

    .discount-title {
        padding: 0;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .discount-title i {
        margin-right: 5px;
        color: #9038cc;
    }

    .discount-form {
        display: flex;
    }

    .discount-input {
        width: 50%;
    }

    .discount-button {
        align-self: flex-end;
        border-radius: 5px;
        border: none;
        height: 40px;
        padding: 0 10px;
        margin-left: 10px;
        background-color: #00bfa5;
        color: white;
    }


























    @media only screen and (max-width: 991.8px) {
        .cart-container {
            grid-template-areas: "items" "discount" "pay";
            grid-template-columns: 100%;
        }

        .cart-pay {
            position: fixed;
            bottom: 0;
            left: 0;
            width: calc(100% - 30px);
            box-shadow: 0 0 3px 1px rgba(0,0,0,.2);
            border-radius: 0;
            z-index: 998;
        }

        .cart-pay-button {
            border-radius: 10px;
            position: relative;
            margin-top: 10px;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .discount-form {
            flex-wrap: wrap;
        }
        .discount-input {
            width: 100%;
        }

        .discount-button {
            margin: 0 auto;
            width: 100%;
        }
    }

    @media only screen and (max-width: 534.8px) {
        .cart-session-title {
            flex-direction: column;
        }
        .cart-session-info {
            margin: 10px 0 0 0;
            text-align: center;
        }
    }
</style>