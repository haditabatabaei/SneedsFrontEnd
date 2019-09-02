<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                        <div class="col-md-12 text-center">
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="isansFont text-right">
                                        سبد خرید شما
                                        <span v-if="!activeCart || activeCart.time_slot_sales.length == 0">( سبد شما خالیست )</span>
                                    </h3>
                                </div>
                            </div>

                            <div class="row">
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
                                </div>
                            </div>
                            <div class="row" style="margin-bottom:30px;">
                                <div class="col-md-9 cardsWrapper" v-if="activeCart">
                                    <div class="row">
                                        <div class="col-md-12" v-for="slotDetail in activeCart.time_slot_sales_detail"
                                             :key="slotDetail.id">
                                            <div class="cardConsultBlock">
                                                <button class="btn btn-sm btn-simple"
                                                        @click="removeSlotFromCard(slotDetail.id)">
                                                    <i class="material-icons">close</i>
                                                </button>
                                                <img class="cardConsultBlock--image"
                                                     src="http://193.176.241.131/sneedsAssets/img/brain.png"
                                                     alt="consultant logo">
                                                <div class="cardConsultantBlock--info">
                                                    <h4 class="isansFont font-weight-bold">
                                                        <router-link :to="'/consultants/' + slotDetail.consultant_slug">
                                                            مشاهده مشاور
                                                        </router-link>
                                                    </h4>
                                                    <button class="timeTogglerBtn isansFont btn btn-simple btn-sm"
                                                            type="button"
                                                            data-toggle="collapse"
                                                            :data-target="'#timesCollapse' + slotDetail.id"
                                                            aria-expanded="true" aria-controls="timesCollapse">
                                                        {{getJalali(slotDetail.start_time).locale('fa').format('dddd MM MMMM')}}
                                                        <i class="material-icons">keyboard_arrow_down</i>
                                                    </button>
                                                    <div class="collapse timesCollapse isansFont"
                                                         :id="'timesCollapse' + slotDetail.id">
                                                        <p>
                                                            ساعت
                                                            {{getJalali(slotDetail.start_time).locale('fa').format('HH:mm')}}
                                                            الی
                                                            {{getJalali(slotDetail.end_time).locale('fa').format('HH:mm')}}
                                                            <button class="btn btn-simple btn-sm"
                                                                    @click="removeSlotFromCard(slotDetail.id)">
                                                                <i class="material-icons">close</i>
                                                            </button>
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
                                <div class="col-md-3 priceWrapper" v-if="activeCart">
                                    <p class="priceWrapper--prevPrice isansFont--faNum">
                                        <span class="d-block priceWrapper--prevPrice__number">
                                            {{activeCart.total}}
                                        </span>
                                        <span class="d-block">تومان</span>
                                    </p>

                                    <p class="priceWrapper--priceInfo isansFont--faNum">
                                        <span class="priceWrapper--priceInfo__number text-success">{{activeCart.subtotal - activeCart.total}}</span>
                                        <span> تومان سود شما از این خرید است.</span>
                                    </p>

                                    <div class="priceWrapper--discountCodeBox">
                                        <form action="" method="">
                                            <input type="text" name="discountCode" class="isansFont"
                                                   placeholder="کد تخفیف دارم...">
                                            <button type="button" class="isansFont">اعمال کد</button>
                                        </form>
                                    </div>

                                    <button class="btn btn-primary isansFont nextSecButton" @click="factorCreation()">
                                        <i class="material-icons">keyboard_arrow_left</i>
                                        مرحله بعد
                                    </button>
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
        name: "UserCard",
        components: {
            RectNotifBlock,
        },
        data: function () {
            return {
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
            let promise = this.$store.dispatch('getCart');
            promise.then((res) => {
                this.resetCartsLogic();
                console.log(res);
            }).catch((err) => {
                this.failedCartsLogic();
            })
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

            removeElementFromArray(arr, value) {
                return arr.filter(function (val, index, arr) {
                    return arr[index] != value;
                });
            },

            removeSlotFromCard: function (slotId) {
                if (window.confirm('برای حذف این مورد مطمئنید ؟')) {
                    this.resetCartsLogic();
                    this.startCartsLogic();
                    console.log('remove slot with id', slotId);
                    this.activeCart.time_slot_sales = this.removeElementFromArray(this.activeCart.time_slot_sales, slotId);

                    if (this.activeCart.time_slot_sales.length == 0) {
                        console.log('entire cart must delete');
                        //entire cart must delete
                        this.$store.dispatch('deleteCart', this.activeCart.id).then(response => {
                            console.log(response);
                            this.$store.dispatch('getCart').then(getResponse => {
                                console.log(getResponse);
                                this.successCartsLogic();
                                setTimeout(() => {
                                    this.resetCartsLogic();
                                }, 1000)
                            }).catch(getError => {
                                console.log(getError);
                                if (getError.response) {
                                    console.log(getError.response.data);
                                }
                                this.failedCartsLogic();
                            })
                        }).catch(error => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response.data);
                            }
                            this.failedCartsLogic();
                        });

                    } else {
                        console.log('cart edit by putting new items');
                        console.log(this.activeCart.id);
                        this.$store.dispatch('putCartRequest', {
                            "payload": {"time_slot_sales": this.activeCart.time_slot_sales},
                            "cartId": this.activeCart.id
                        }).then(response => {
                            console.log('response from put req:', response);
                            this.$store.dispatch('getCart').then(getCartsRes => {
                                this.successCartsLogic();
                                setTimeout(() => {
                                    this.resetCartsLogic();
                                }, 1000)
                            }).catch(getCartsError => {
                                this.failedCartsLogic();

                            });
                        }).catch(error => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response);
                            }
                            this.failedCartsLogic();
                        })
                    }

                }

            },

            factorCreation: function () {
                this.resetCartsLogic();
                this.startCartsLogic();
                console.log('factor creation');
                let factorCreatePromise = this.sendFactorCreationRequest();
                factorCreatePromise.then(response => {
                    window.console.log(response.data);
                    this.$router.push('/user/order');
                }).catch(error => {
                    this.failedCartsLogic();
                    console.log(error);
                    if (error.response) {
                        this.cartsFailed.message = 'خطایی رخ داد...' + error.response.data.detail;
                        console.log(error.response)

                        if(error.response.data.detail[0] == 'User has an active order.'){
                            this.$router.push('/user/order');
                        }
                    }
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
            activeCart: function () {
                return this.$store.getters.getCart;
            },
        }
    }
</script>

<style scoped>
    .main {
        background-color: #eee;
    }

    .cardsWrapper {
        border-radius: 10px;
        background-color: white;
        border: 1px solid #999;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-right:-15px;
    }

    .priceWrapper {
        border-radius: 10px;
        border: 1px solid #999;
        background-color: white;
        margin-right:15px;
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

    @media only screen and (max-width:991.8px) and (min-width: 0) {
        .priceWrapper {
            margin-right : 0;
            margin-top:15px;
        }

        .cardsWrapper {
            margin-right : 0;
        }
    }
</style>