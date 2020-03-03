<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('http://185.209.243.97/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                                                     :src="slotDetail.consultant.profile_picture"
                                                     alt="consultant logo">
                                                <div class="cardConsultantBlock--info">
                                                    <h4 class="isansFont font-weight-bold">
                                                        <router-link
                                                                :to="'/consultants/' + getConsultantSlugFromUrl(slotDetail.consultant.url)">
                                                            مشاور :
                                                            {{slotDetail.consultant.first_name + ' ' +
                                                            slotDetail.consultant.last_name}}
                                                        </router-link>
                                                    </h4>
                                                    <p class="timeTogglerBtn isansFont--faNum">
                                                        {{getJalali(slotDetail.start_time).locale('fa').format('dddd MM MMMM') }}
                                                        |
                                                        ساعت
                                                        {{getJalali(slotDetail.start_time).locale('fa').format('HH:mm')}}
                                                        الی
                                                        {{getJalali(slotDetail.end_time).locale('fa').format('HH:mm')}}
                                                    </p>
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

                                    <p class="text-info isansFont--faNum" v-for="message in discount.messages">
                                        {{message}}
                                    </p>

                                    <p class="text-info isansFont--faNum" v-for="appliedCode in appliedCodes">
                                        <span>{{appliedCode.code}}</span>
                                        <button @click="removeDiscount(appliedCode.id)"
                                                class="btn btn-simple btn-fab btn-fab-mini">
                                            <i class="material-icons">close</i>
                                        </button>
                                    </p>

                                    <div class="priceWrapper--discountCodeBox">
                                        <form action="" method="" v-if="discount.isValid">
                                            <input
                                                    type="text"
                                                    name="discountCode"
                                                    class="isansFont"
                                                    placeholder="کد تخفیف دارم..."
                                                    v-model="discount.code">
                                            <button type="button" class="isansFont" @click="sendDiscountPostReq()">اعمال
                                                کد
                                            </button>
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

                discount: {
                    messages: [],
                    code: '',
                    isValid: true,
                },

                appliedCodes: []
            }
        }, created() {
            this.init();
        },
        mounted() {
        },
        methods: {

            init: function () {
                this.$loading(true);
                this.$store.dispatch('getCart').then(res => {
                    this.getAllDiscounts().then(disRes => {
                        this.appliedCodes = disRes.data;
                    }).catch(disErr => {
                        this.$notify({
                            type: "error",
                            group: 'notif',
                            text: 'خطایی هنگام ارتباط با سرور رخ داد',
                            duration: 3000
                        })
                    }).finally(() => {
                        this.$loading(false);
                    })
                }).catch(err => {
                    // this.failedCartsLogic();
                    this.$loading(false);
                    this.$notify({
                        type: "error",
                        group: 'notif',
                        text: 'خطایی هنگام ارتباط با سرور رخ داد',
                        duration: 3000
                    })
                })
            },

            removeElementFromArray(arr, value) {
                return arr.filter(function (val, index, arr) {
                    return arr[index] != value;
                });
            },

            removeSlotFromCard: function (slotId) {
                if (window.confirm('برای حذف این مورد مطمئنید ؟')) {
                    this.$loading(true);
                    console.log('remove slot with id', slotId);
                    this.activeCart.time_slot_sales = this.removeElementFromArray(this.activeCart.time_slot_sales, slotId);

                    if (this.activeCart.time_slot_sales.length == 0) {
                        console.log('entire cart must delete');
                        //entire cart must delete
                        this.$store.dispatch('deleteCart', this.activeCart.id).then(response => {
                            console.log(response);
                            this.$store.dispatch('getCart').then(getResponse => {
                                console.log(getResponse);
                                this.$notify({
                                    type: 'success',
                                    group: 'notif',
                                    duration: 3000,
                                    text: 'آیتم از سبد خرید شما با موفقیت حذف شد',
                                    title: 'حذف از سبد خرید : موفق'
                                })

                            }).catch(getError => {
                                console.log(getError);
                                if (getError.response) {
                                    console.log(getError.response.data);
                                }
                                this.$notify({
                                    type: 'error',
                                    group: 'notif',
                                    duration: 3000,
                                    text: 'خطایی هنگام حذف آیتم از سبد خرید رخ داد',
                                    title: 'حذف از سبد خرید : خطا'
                                })
                            }).finally(() => {
                                this.$loading(false)
                            })
                        }).catch(error => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response.data);
                            }
                            this.$loading(false)
                            this.$notify({
                                type: 'error',
                                group: 'notif',
                                duration: 3000,
                                text: 'خطایی هنگام حذف آیتم از سبد خرید رخ داد',
                                title: 'حذف از سبد خرید : خطا'
                            })
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
                                this.$notify({
                                    type: 'success',
                                    group: 'notif',
                                    duration: 3000,
                                    text: 'آیتم از سبد خرید شما با موفقیت حذف شد',
                                    title: 'حذف از سبد خرید : موفق'
                                })
                            }).catch(getCartsError => {
                                this.$notify({
                                    type: 'error',
                                    group: 'notif',
                                    duration: 3000,
                                    text: 'خطایی هنگام حذف آیتم از سبد خرید رخ داد',
                                    title: 'حذف از سبد خرید : خطا'
                                })
                            }).finally(() => {
                                this.$loading(false);
                            });
                        }).catch(error => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response);
                            }
                            this.$loading(false);

                            this.$notify({
                                type: 'error',
                                group: 'notif',
                                duration: 3000,
                                text: 'خطایی هنگام حذف آیتم از سبد خرید رخ داد',
                                title: 'حذف از سبد خرید : خطا',
                            })
                        })
                    }

                }

            },

            removeDiscount: function (discountId) {
                this.sendRemoveDiscountCodeReq(discountId).then(response => {
                    this.discount.messages = [];
                    this.discount.messages[0] = 'کد تخفیف اعمالی حذف شد.';
                    this.init();
                }).catch(error => {
                })
            },

            sendRemoveDiscountCodeReq: function (discountId) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'discount/cart-consultant-discounts/' + discountId + '/',
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        console.log('remove response:', response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response)
                        reject(error);
                    })
                })
            },

            factorCreation: function () {
                console.log('factor creation');
                this.$loading(true);
                this.sendFactorCreationRequest().then(response => {
                    window.console.log(response.data);
                    this.$router.push('/user/order');
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response)

                        if (error.response.data.detail[0] == 'User has an active order.') {
                            this.$router.push('/user/order');
                        } else {
                            this.$notify({
                                type: 'error',
                                group: 'notif',
                                duration: 3000,
                                text: 'خطایی هنگام اضافه کردن به سبد خرید رخ داد',
                                title: 'خطا'
                            })
                        }
                    } else {
                        this.$notify({
                            type: 'error',
                            group: 'notif',
                            duration: 3000,
                            text: 'خطایی هنگام اضافه کردن به سبد خرید رخ داد',
                            title: 'خطا'
                        })
                    }
                }).finally(() => {
                    this.$loading(false)
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

            getAllDiscounts: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'discount/cart-consultant-discounts/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log('list of discounts :', response)
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },

            sendDiscountPostReq: function () {
                console.log('discount in :', this.discount.code);
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'discount/cart-consultant-discounts/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                        data: {'code': this.discount.code}
                    }).then(response => {
                        console.log('response from post req :', response);
                        this.startCartsLogic();
                        let promise = this.$store.dispatch('getCart');
                        promise.then((res) => {
                            this.getAllDiscounts().then(disRes => {
                                this.appliedCodes = disRes.data;
                            });
                            this.resetCartsLogic();
                            console.log(res);
                            this.discount.messages = [];
                            this.discount.messages[0] = 'کد تخفیف اعمال شد.';
                            // this.discount.isValid = false;
                        }).catch((err) => {
                            this.failedCartsLogic();
                        });

                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                            if (error.response.data.code) {
                                this.discount.messages = error.response.data.code;

                            } else {
                                this.discount.messages = error.response.data.detail;
                            }
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
        margin:10px 20px;
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
