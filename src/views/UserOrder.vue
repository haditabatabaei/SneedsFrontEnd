<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            فاکتور های شما
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="main profile-page">
            <div class="profile-content">
                <div class="container">
                    <div class="row5">
                        <div class="col-md-12 text-center" style="margin-top:20px;">
                            <RectNotifBlock :message="cartsLoading.message"
                                            type="warning"
                                            borderRound="true"
                                            v-if="cartsLoading.value"></RectNotifBlock>

                            <RectNotifBlock :message="cartsSuccess.message"
                                            type="success"
                                            borderRound="true"
                                            v-else-if="cartsSuccess.value"></RectNotifBlock>

                            <RectNotifBlock :message="cartsFailed.message"
                                            type="danger"
                                            borderRound="true"
                                            v-else-if="cartsFailed.value"></RectNotifBlock>
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="isansFont text-right" v-if="activeOrder">
                                        فاکتور فعال شما
                                    </h3>
                                </div>
                            </div>

                            <div class="row" style="margin-bottom:30px;">
                                <div class="col-md-9 cardsWrapper" v-if="activeOrder">
                                    <div class="row">
                                        <div class="col-md-12"
                                             v-for="slotDetail in activeOrder.cart.time_slot_sales_detail"
                                             :key="slotDetail.id">
                                            <div class="cardConsultBlock">
                                                <img class="cardConsultBlock--image"
                                                     :src="slotDetail.consultant.profile_picture"
                                                     alt="consultant logo">
                                                <div class="cardConsultantBlock--info">
                                                    <h4 class="isansFont font-weight-bold">
                                                        <router-link
                                                                :to="'/consultants/' + getConsultantSlugFromUrl(slotDetail.consultant.url)">
                                                            مشاور :
                                                            {{
                                                            slotDetail.consultant.first_name + ' ' +
                                                            slotDetail.consultant.last_name
                                                            }}
                                                        </router-link>
                                                    </h4>
                                                    <button class="timeTogglerBtn isansFont btn btn-simple btn-sm"
                                                            type="button"
                                                            aria-expanded="true" aria-controls="timesCollapse">
                                                        {{getJalali(slotDetail.start_time).locale('fa')
                                                        .format('dddd MM MMMM')}}
                                                        <i class="material-icons">keyboard_arrow_down</i>
                                                    </button>
                                                    <div class="timesCollapse isansFont"
                                                         :id="'timesCollapse' + slotDetail.id">
                                                        <p>
                                                            ساعت
                                                            {{getJalali(slotDetail.start_time).locale('fa').format('HH:mm')}}
                                                            الی
                                                            {{getJalali(slotDetail.end_time).locale('fa').format('HH:mm')}}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="cardConsultantBlock--price isansFont--faNum">
                                                    {{slotDetail.price}}
                                                    تومان
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 priceWrapper" v-if="activeOrder">
                                    <p class="priceWrapper--prevPrice isansFont--faNum">
                                        <span class="d-block text-success priceWrapper--prevPrice__number">
                                            {{activeOrder.cart.total}}
                                        </span>
                                        <span class="d-block">تومان</span>
                                    </p>

                                    <p class="priceWrapper--priceInfo isansFont--faNum">
                                        <span class="priceWrapper--priceInfo__number text-success">{{activeOrder.cart.subtotal - activeOrder.cart.total}}</span>
                                        <span> تومان سود شما از این خرید است.</span>
                                    </p>

                                    <div class="priceWrapper--code isansFont--faNum">
                                        <span class="d-block">کد پیگیری :</span>
                                        <code class="isansFont">{{activeOrder.order_id}}</code>
                                    </div>

                                    <button class="btn btn-success isansFont nextSecButton" @click="factorPayment()">
                                        <i class="material-icons">money</i>
                                        ثبت نهایی و پرداخت
                                    </button>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <h3 class="isansFont text-center">
                                    فاکتور های قبلی شما
                                </h3>
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead class="isansFont">
                                            <tr>
                                                <th>#</th>
                                                <th>کد پشتیبانی</th>
                                                <th>تاریخ آخرین آپدیت</th>
                                                <th>وضعیت</th>
                                                <th>جزئیات</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="order in completedOrders">
                                                <td>{{completedOrders.indexOf(order) + 1}}</td>
                                                <td>{{order.order_id}}</td>
                                                <td class="isansFont">
                                                    {{
                                                    getJalali(order.updated).locale('fa').format('YYYY/MM/DD HH:mm:ss')
                                                    }}
                                                </td>
                                                <td class="td-actions isansFont" v-if="order.status == 'created'">
                                                    منتظر پرداخت کاربر
                                                </td>
                                                <td class="td-actions isansFont" v-else-if="order.status == 'paid'">
                                                    پرداخت موفق
                                                </td>
                                                <td>
                                                    <button @click="showOrderDesc(order)"
                                                            class="btn btn-sm btn-round isansFont btn-info">مشاهده
                                                        جزئیات
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <transition name="slide-fade">
                                <div v-if="orderDescShown" class="modalOrder">
                                    <button class="btn btn-danger btn-just-icon isansFont modalCloseButton" @click="hideOrderDesc()">
                                        <i class="material-icons">close</i>
                                    </button>

                                    <div class="table-responsive">
                                        <table class="table table-shopping">
                                            <thead>
                                            <tr class="isansFont--faNum">
                                                <th class="text-center">مشاور</th>
                                                <th class="th-description text-center">تاریخ جلسه</th>
                                                <th class="th-description text-center">ساعت شروع</th>
                                                <th class="text-center" >ساعت پایان</th>
                                                <th class="text-center" >مدت ( ساعت )</th>
                                                <th class="text-center" >هزینه</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="slotDetail in orderDescToShow.cart.sold_time_slot_sales_detail"
                                                :data-slotId="slotDetail.id" class="isansFont--faNum">
                                                <td class="td-name">
                                                    <router-link
                                                                 :to="'/consultants/' + getConsultantSlugFromUrl(slotDetail.consultant.url)">
                                                        {{slotDetail.consultant.first_name + " " + slotDetail.consultant.last_name}}
                                                    </router-link>
                                                </td>
                                                <td>
                                                    {{getJalali(slotDetail.start_time).locale('fa').format('YYYY/MM/DD')}}
                                                    <br>
                                                    {{getJalali(slotDetail.start_time).locale('fa').format('dddd')}}
                                                </td>
                                                <td>
                                                    {{getJalali(slotDetail.start_time).locale('fa').format('HH:mm')}}
                                                </td>
                                                <td>
                                                    {{getJalali(slotDetail.end_time).locale('fa').format('HH:mm')}}
                                                </td>
                                                <td class="td-number isansFont--faNum">
                                                    1
                                                </td>
                                                <td class="td-number">
                                                    {{slotDetail.price}}
                                                </td>
                                            </tr>
                                            <tr class="isansFont--faNum">
                                                <td>
                                                    تاریخ ایجاد فاکتور :
                                                    <br>
                                                    {{
                                                    getJalali(orderDescToShow.created).locale('fa')
                                                    .format('YYYY/MM/DD HH:mm:ss')
                                                    }}
                                                </td>
                                                <td>
                                                    تاریخ آخرین آپدیت فاکتور :
                                                    <br>
                                                    {{
                                                    getJalali(orderDescToShow.updated).locale('fa')
                                                    .format('YYYY/MM/DD HH:mm:ss')
                                                    }}
                                                </td>
                                                <td>
                                                    شماره   پیگیری فاکتور :
                                                    <br>
                                                    {{orderDescToShow.order_id}}
                                                </td>
                                                <td class="td-total">
                                                    جمع:
                                                </td>
                                                <td class="td-price">
                                                    {{orderDescToShow.total}}
                                                    <span style="font-size:15px">تومان</span>
                                                </td>
                                                <td colspan="3" class="text-right">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </transition>


                            <div v-html="paymentError"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import jalali from 'jalali-moment'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';

    export default {
        name: "UserOrder",
        components: {
            RectNotifBlock,
        },
        data: function () {
            return {
                orderDescShown: false,
                orderDescToShow: {},
                orders: [],
                completedOrders: [],
                cartsSuccess: {
                    value: false,
                    message: 'عملیات موفق آمیز بود'
                },

                cartsLoading: {
                    value: false,
                    message:
                        'چند لحظه صبر کنید...'
                },

                cartsFailed: {
                    value: false,
                    message: 'مشکلی رخ داد...'
                },
                paymentError: '',
            }
        }, created() {
            this.startCartsLogic();
            this.getOrders().then((orders) => {
                this.getPaidOrders().then((paidOrders) => {
                    this.orders = orders;
                    this.completedOrders = paidOrders;
                    this.resetCartsLogic();
                }).catch(() => {
                    this.failedCartsLogic();
                });
            }).catch(() => {
                this.failedCartsLogic();
            });
        },
        mounted() {
            scrollTo(0, 0);
        },
        methods: {

            hideOrderDesc() {
                this.orderDescShown = false;
                this.orderDescToShow = {};
            },

            showOrderDesc(order) {
                console.log('show order :', order);
                this.orderDescShown = true;
                this.orderDescToShow = order;
            },

            resetCartsLogic: function () {
                window.console.log('no loading deploy');
                this.cartsLoading.value = false;
                this.cartsFailed.value = false;
                this.cartsSuccess.value = false;
            },

            startCartsLogic: function () {
                window.console.log('start loading deploy');
                this.cartsLoading.value = true;
                this.cartsFailed.value = false;
                this.cartsSuccess.value = false;
            },

            failedCartsLogic: function () {
                window.console.log('failed loading deploy');
                this.cartsLoading.value = false;
                this.cartsFailed.value = true;
                this.cartsSuccess.value = false;
            },

            successCartsLogic: function () {
                window.console.log('success loading deploy');
                this.cartsLoading.value = false;
                this.cartsFailed.value = false;
                this.cartsSuccess.value = true;
            },

            factorPayment: function () {
                this.resetCartsLogic();
                this.startCartsLogic();
                console.log('factor payment method');
                let paymentAcceptPromise = this.sendPaymentAcceptRequest();
                paymentAcceptPromise.then(response => {
                    console.log('response for factor payment : ', response);
                    window.open(response.data.redirect, '_blank');

                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response);
                        this.paymentError = error.response.data;
                    }
                    this.failedCartsLogic();
                })
            },

            sendPaymentAcceptRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'payment/request/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            sendGetOrdersRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'order/orders/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },
            getPaidOrders: function () {
                return new Promise((resolve, reject) => {
                    let paidReqPromise = this.sendGetPaidOrderesRequest();
                    paidReqPromise.then(response => {
                        console.log('paid orderes response :', response.data);
                        // this.completedOrders = response.data;
                        resolve(response.data);
                    }).catch(error => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                        }
                        reject(error);
                    })
                });
            },

            sendGetPaidOrderesRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'order/sold-orders/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getOrders: function () {
                return new Promise((resolve, reject) => {
                    console.log('get orders called');
                    let ordersPromise = this.sendGetOrdersRequest();
                    ordersPromise.then(response => {
                        console.log('orders response :', response);
                        // this.orders = response.data;
                        resolve(response.data);
                    }).catch(error => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                        }
                        reject(error);
                    })
                })

            },

            getConsultantSlugFromUrl: function (url) {
                return url.replace(this.$store.getters.getApi + 'account/consultant-profiles/', '').replace('/', '');
            },

            getJalali: function (date) {
                return jalali(date);
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.getUser
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo
            },
            activeOrder: function () {
                return this.orders[0];
            },
        }
    }
</script>

<style scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    .main {
        background-color: #f5f5f5;
    }

    .cardsWrapper {
        border-radius: 10px;
        background-color: white;
        border: 1px solid #999;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-right: -15px;
    }

    .priceWrapper {
        border-radius: 10px;
        border: 1px solid #999;
        background-color: white;
        margin-right: 15px;
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
        margin: 0;
        color: #666;
    }

    .timeTogglerBtn {
        color: #666;
        font-size: 15px;
        margin-right: 10px;
        padding: 10px 5px;
        border-radius: 10px;
    }

    .timesCollapse {
        background-color: #F0F0F0;
        border-radius: 10px;
        margin-right: 10px;
        padding-right: 10px;
        margin-bottom: 10px;

        width: calc(100% - 30px);
    }

    .timesCollapse p {
        font-size: 12px;
        text-align: right;
        display: flex;

        padding: 5px 5px 5px 0;

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

    .nextSecButton {
        border-radius: 15px;
        margin-bottom: 20px;
    }


    .priceWrapper--prevPrice {
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 15px;
    }

    .priceWrapper--prevPrice__number {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 40px;
    }

    .priceWrapper--priceInfo {
        font-size: 12px;
    }

    .priceWrapper--priceInfo__number {
        font-weight: bold;
    }

    .priceWrapper--code {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .priceWrapper--code code {
        margin-top: 5px;
        display: block;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-family: monospace !important;
    }

    .modalOrder {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: auto;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        border:1px solid #777;
    }

    .modalOrder .table-responsive {
        margin-top:50px;
    }

    .modalCloseButton {
        position: absolute;
        right: 10px;
        top: 0;
        padding:5px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .priceWrapper {
            margin-right: 0;
            margin-top: 15px;
        }

        .cardsWrapper {
            margin-right: 0;
        }
    }
</style>