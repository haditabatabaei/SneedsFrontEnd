<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <div class="profile">
                                <div class="avatar">
                                    <img src="../../public/webimages/marc.jpg" alt="Circle Image"
                                         class="img-circle img-responsive img-raised">
                                </div>
                                <div class="name">
                                    <h3 class="title isansFont">
                                        {{user.first_name}}

                                        {{user.last_name}}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-2 follow">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="row">
                                <h3 class="isansFont text-center">
                                    فاکتور های قبلی شما
                                </h3>
                                <div class="col-md-12">
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
                                                    getJalali(order.updated).locale('fa').
                                                    format('YYYY/MM/DD HH:mm:ss')
                                                    }}
                                                </td>
                                                <td class="td-actions isansFont" v-if="order.status == 'created'">
                                                    منتظر پرداخت کاربر
                                                </td>
                                                <td class="td-actions isansFont" v-else-if="order.status == 'paid'">
                                                    پرداخت موفق
                                                </td>
                                                <td>
                                                    <button class="btn btn-sm btn-round isansFont btn-info">مشاهده
                                                        جزئیات
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="isansFont text-center" v-if="activeOrder != undefined">
                                        لیست آیتم های فاکتور جدید شما با شماره پیگیری : {{activeOrder.order_id}}
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div v-if="activeOrder == undefined" class="isansFont">فاکتوری جدیدی موجود نمی
                                        باشد
                                    </div>
                                    <div v-else class="table-responsive">
                                        <table class="table table-shopping">
                                            <thead>
                                            <tr class="isansFont">
                                                <th>مشاور</th>
                                                <th class="th-description">تاریخ</th>
                                                <th class="th-description">ساعت شروع</th>
                                                <th class="text-center">ساعت پایان</th>
                                                <th class="text-center">مدت ( ساعت )</th>
                                                <th class="text-center">هزینه</th>
                                                <th>وضعیت</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="slotDetail in activeOrder.cart.time_slot_sales_detail">
                                                <td class="td-name">
                                                    <router-link
                                                            :to="'/consultants/' + slotDetail.consultant_slug">
                                                        {{slotDetail.consultant_slug}}
                                                    </router-link>
                                                </td>
                                                <td class="isansFont">
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
                                                <td class="td-number">
                                                    1
                                                </td>
                                                <td class="td-number">
                                                    {{slotDetail.price}}
                                                </td>
                                                <td class="td-actions isansFont" v-if="activeOrder.status == 'created'">
                                                    منتظر پرداخت کاربر
                                                </td>
                                                <td class="td-actions isansFont" v-else-if="activeOrder.status == 'paid'">
                                                    پرداخت موفق
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                </td>
                                                <td class="td-total isansFont">
                                                    جمع:
                                                </td>
                                                <td class="td-price isansFont">
                                                    <p>{{activeOrder.total}}
                                                        <br>
                                                        <span style="font-size:12px">هزار تومان</span>
                                                    </p>
                                                </td>
                                                <td colspan="3" class="text-right">
                                                    <button class="btn btn-info btn-round isansFont"
                                                            @click="factorPayment()">
                                                        <i class="material-icons">keyboard_arrow_left</i>
                                                        پرداخت فاکتور
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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
                console.log('factor payment method');
                let paymentAcceptPromise = this.sendPaymentAcceptRequest();
                paymentAcceptPromise.then(response => {
                    console.log('response for factor payment : ', response);
                }).catch(error => {
                    console.log(error);
                    if (error.response)
                        console.log(error.response);
                })
            },

            sendPaymentAcceptRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'order/orders/' + this.activeOrder.id + '/accept/',
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

</style>