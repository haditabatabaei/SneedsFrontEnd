<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            سبد خرید
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
                                <div class="col-md-12">
                                    <h3 class="isansFont text-center">
                                        سبد خرید شما
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div v-if="activeCart == undefined" class="isansFont">سبد خرید شما خالی است.</div>
                                    <div v-else>
                                        سبد خرید :
                                        <p v-for="slotDetail in this.activeCart.time_slot_sales_detail">
                                            {{slotDetail.start_time + ' --until-- ' + slotDetail.end_time + '--price--'
                                            + slotDetail.price}}
                                        </p>
                                        کل هزینه :
                                        {{activeCart.total}}
                                        <br>
                                        <button class="btn btn-rose isansFont" @click="factorCreation()">ایجاد فاکتور و
                                            پرداخت
                                        </button>
                                    </div>
                                    <div v-if="activeOrder == undefined" class="isansFont">اردر شما خالیست</div>
                                    <div v-else>
                                        اردر شما :
                                        <br>
                                        شناسه :
                                        {{activeOrder.order_id}}
                                        <br>
                                        وضعیت :
                                        {{activeOrder.status}}
                                        اطلاعات کارت:
                                        <p v-for="slotDetail in activeOrder.cart.time_slot_sales_detail">
                                            {{slotDetail.start_time + ' --until-- ' + slotDetail.end_time + '--price--'
                                            + slotDetail.price}}
                                        </p>
                                        کل هزینه :
                                        {{activeOrder.total}}
                                        <br>
                                        <br>
                                        <button class="btn btn-rose isansFont" @click="factorPayment()">
                                            پرداخت این اردر
                                        </button>
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

    export default {
        name: "UserCard",
        data: function () {
            return {
                carts: [],
                orders: [],
            }
        }, created() {
            this.getCarts();
            this.getOrders();
        },
        methods: {

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
            factorCreation: function () {
                console.log('factor creation');
                let factorCreatePromise = this.sendFactorCreationRequest();
                factorCreatePromise.then(response => {
                    window.console.log(response.data);
                }).catch(error => {
                    console.log(error);
                    if (error.response)
                        console.log(error.response)
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

            sendFactorCreationRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'order/orders/',
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

            getCarts: function () {
                console.log('get carts called');
                let cartsPromise = this.sendGetCartRequest();
                cartsPromise.then(response => {
                    console.log('carts response :', response);
                    this.carts = response.data;
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response);
                    }
                })
            },

            getOrders: function () {
                console.log('get orders called');
                let ordersPromise = this.sendGetOrdersRequest();
                ordersPromise.then(response => {
                    console.log('orders response :', response);
                    this.orders = response.data;
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response);
                    }
                })
            },
            sendGetCartRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'cart/carts/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.getUser
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo
            },
            activeCart: function () {
                return this.carts[0];
            },
            activeOrder: function () {
                return this.orders[0];
            }
        }
    }
</script>

<style scoped>

</style>