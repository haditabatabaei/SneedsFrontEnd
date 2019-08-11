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
                                    <h3 class="isansFont text-center">
                                        سبد خرید شما
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
                                    <div v-if="activeCart == undefined" class="isansFont">سبد خرید شما خالی است.</div>
                                    <div v-else class="row card table-responsive">
                                        <table class="table table-shopping">
                                            <thead>
                                            <tr class="isansFont">
                                                <th>مشاور</th>
                                                <th class="th-description">تاریخ</th>
                                                <th class="th-description">ساعت شروع</th>
                                                <th>ساعت پایان</th>
                                                <th>مدت ( ساعت )</th>
                                                <th>هزینه</th>
                                                <th></th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="slotDetail in activeCart.time_slot_sales_detail"
                                                :data-slotId="slotDetail.id">
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
                                                <td class="td-actions">
                                                    <button type="button" rel="tooltip" data-placement="left"
                                                            title="حذف آیتم از سبد خرید" class="btn btn-simple"
                                                            data-original-title="Remove Item"
                                                            @click="removeSlotFromCard(slotDetail.id)">
                                                        <i class="material-icons">close</i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="td-total isansFont">
                                                    میزان تخفیف :
                                                    {{activeCart.time_slot_sales_discount}}
                                                    درصد
                                                </td>
                                                <td class="td-total isansFont">
                                                    جمع اولیه :
                                                </td>
                                                <td class="td-price isansFont">
                                                     <del class="text-danger">{{activeCart.subtotal}}</del>
                                                    <span style="font-size:12px;margin-right:5px">تومان</span>
                                                </td>
                                                <td class="td-total isansFont">
                                                    قابل پرداخت با اعمال تخفیف :
                                                </td>
                                                <td class="td-price isansFont">
                                                    <span class="text-success">{{activeCart.total}}</span>
                                                    <span style="font-size:12px;margin-right:5px">تومان</span>
                                                </td>
                                                <td class="text-right">
                                                    <button class="btn btn-info btn-round isansFont"
                                                            @click="factorCreation()">
                                                        <i class="material-icons">keyboard_arrow_left</i>
                                                        ایجاد فاکتور
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
                if(window.confirm('برای حذف این مورد مطمئنید ؟')){
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
                    if (error.response){
                        this.cartsFailed.message = 'خطایی رخ داد...'  + error.response.data.detail;
                        console.log(error.response)
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

</style>