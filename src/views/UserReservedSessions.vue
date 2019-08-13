<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            جلسات رزرو شده شما
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="main profile-page">
            <div class="profile-content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center" style="margin-top:10px;"
                             v-if="reservedSessions.length === 0">

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

                            <p class="isansFont">جلسه ای برای نمایش وجود ندارد</p>
                            <router-link to="/consultants" class="btn btn-info btn-simple btn-lg text-center isansFont">
                                مشاهده مشاوران
                            </router-link>
                        </div>
                        <div class="card card-profile card-plain col-md-6 flexCard" v-for="session in reservedSessions">
                            <div class="card-image">
                                <router-link :to="'consultants/' + session.consultant.slug">
                                    <img class="img img-fluid"
                                         v-bind:src="session.consultant.profile_picture"
                                         alt="image">
                                </router-link>
                            </div>
                            <div class="col-md-7">
                                <div class="card-content">
                                    <h4 class="card-title isansFont"
                                        v-if="!isConsultant">
                                        مشاور :
                                        {{session.consultant.first_name + " " + session.consultant.last_name }}
                                    </h4>
                                    <h4 class="card-title isansFont" v-else>
                                        کاربر :
                                        {{session.sold_to.first_name + ' ' + session.sold_to.last_name}}
                                    </h4>
                                    <br>
                                    <p class="isansFont">
                                        تاریخ برگزاری :
                                        {{getJalali(session.start_time).locale('fa').format('YYYY/MM/DD dddd')}}
                                        <br>
                                        ساعت :
                                        <br>
                                        {{getJalali(session.start_time).locale('fa').format('HH:mm:ss')}}
                                        تا
                                        {{getJalali(session.end_time).locale('fa').format('HH:mm:ss')}}
                                    </p>

                                    <p v-if="session.used" class="text-success isansFont">
                                        وضعیت جلسه :
                                        برگزار شده
                                    </p>
                                    <p v-else class="text-danger isansFont">
                                        وضعیت جلسه :
                                        برگزار نشده
                                    </p>

                                    <div class="cart-flex-footer mt-10">
                                        <a class="isansFont btn btn-info btn-sm" href="#">
                                            ورود به جلسه
                                        </a>
                                        <router-link v-if="!isConsultant" class="btn btn-info isansFont btn-sm"
                                                     :to="'/consultants/' + session.consultant.slug">صفحه مشاور
                                        </router-link>
                                    </div>
                                    <p class="text-info isansFont">
                                        {{getJalali(session.start_time).locale('fa').fromNow()}}
                                    </p>
                                    <div class="rateWrapper" v-if="!isConsultant && !slotHasRate(session.id)">
                                        <StarRating v-model="session.starRate"
                                                    :rtl="true"
                                                    :star-size="25"
                                                    :rounded-corners="true">
                                        </StarRating>
                                        <button @click="submitRate(session.id,session.starRate)"
                                                class="isansFont btn btn-rose btn-sm btn-round">ثبت امتیاز
                                        </button>
                                    </div>
                                    <div v-else-if="!isConsultant && slotHasRate(session.id)">
                                        <p class="isansFont">
                                            شما به مشاور در این جلسه امتیاز {{slotHasRate(session.id)}}
                                            از 5 دادید
                                        </p>
                                    </div>
                                    <div v-else-if="isConsultant && slotHasRate(session.id)">
                                        <p class="isansFont">
                                            این کاربر به شما در این جلسه امتیاز {{slotHasRate(session.id)}} از 5 داده
                                            است
                                        </p>
                                    </div>
                                    <div v-else-if="isConsultant && !slotHasRate(session.id)">
                                        <p class="isansFont">
                                            این کاربر هنوز به شما در این جلسه امتیازی نداده است
                                        </p>
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
    import axios from 'axios'
    import jalali from 'jalali-moment'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import StarRating from 'vue-star-rating'

    export default {
        name: "UserReservedSessions",
        components: {RectNotifBlock, StarRating},
        data() {
            return {
                reservedSessions: [],
                availableRates: [],
                starRate: '',

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
        },
        computed: {
            jalaliNow: function () {
                return jalali();
            },
            showReserved: function () {
                return this.reservedSessions;
            },
            isConsultant: function () {
                return this.$store.getters.getUserInfo.is_consultant;
            }
        },
        created() {
            this.resetCartsLogic();
            this.startCartsLogic();
            this.getReservedTimes().then((responseSessions) => {
                this.getListOfRates().then(responseRates => {
                    for (let i = 0; i < responseSessions.data.length; i++) {
                        responseSessions.data[i]["starRate"] = null;
                    }
                    this.reservedSessions = responseSessions.data;

                    this.availableRates = responseRates.data;
                    console.log('reserved sessions:', this.reservedSessions);
                    console.log('rates :', this.availableRates);
                    this.resetCartsLogic();
                }).catch(error => {
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

            showStarRate: function () {
                console.log('star rate :', this.starRate)
            },

            getJalali: function (date) {
                return jalali(date);
            },

            slotHasRate: function (slotId) {
                for (let i = 0; i < this.availableRates.length; i++) {
                    if (this.availableRates[i].sold_time_slot == slotId) {
                        return this.availableRates[i].rate;
                    }
                }
                return false;
            },

            getReservedTimes: async function () {
                return new Promise((resolve, reject) => {
                    this.sendReservedTimesRequest().then(response => {
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error)
                    })
                })
            },

            sendReservedTimesRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'store/sold-time-slot-sales/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + this.$store.getters.getToken
                        }
                    }).then(response => {
                        console.log(response);
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            submitRate: function (soldSlotId, rate) {
                return new Promise((resolve, reject) => {
                    this.sendConsultantRate(soldSlotId, rate).then(response => {
                        console.log(response);
                        this.resetCartsLogic();
                        this.startCartsLogic();
                        this.getReservedTimes().then((responseSessions) => {
                            this.getListOfRates().then(responseRates => {
                                for (let i = 0; i < responseSessions.data.length; i++) {
                                    responseSessions.data[i]["starRate"] = null;
                                }
                                this.reservedSessions = responseSessions.data;
                                this.availableRates = responseRates.data;
                                console.log('reserved sessions:', this.reservedSessions);
                                console.log('rates :', this.availableRates);
                                this.resetCartsLogic();
                            }).catch(error => {
                                this.failedCartsLogic();
                            });
                        }).catch(() => {
                            this.failedCartsLogic();
                        });
                        resolve();
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject();
                    })
                })
            },

            sendConsultantRate: function (soldSlotId, rate) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/sold-time-slot-rates/',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                        },
                        data: {
                            "sold_time_slot": soldSlotId,
                            "rate": rate,
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getListOfRates: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/sold-time-slot-rates/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        }
                    }).then((response) => {
                        console.log(response);
                        resolve(response);
                    }).catch((error) => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
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
        },
    }

</script>

<style scoped>

    .rateWrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .flexCard {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .flexCard img {
        max-width: 150px;
    }

    .flexCard .card-image {
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .flexCard:hover {
        background-color: #eeeeee;
    }

    .cart-flex-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>