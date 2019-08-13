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
                                <router-link :to="'consultants/' + session.consultant_slug">
                                    <img class="img img-fluid" v-if="consultants[reservedSessions.indexOf(session)]"
                                         v-bind:src="consultants[reservedSessions.indexOf(session)].profile_picture"
                                         alt="image">
                                </router-link>
                            </div>
                            <div class="col-md-7">
                                <div class="card-content">
                                    <h4 class="card-title isansFont"
                                        v-if="consultants[reservedSessions.indexOf(session)]"> مشاور : {{
                                        consultants[reservedSessions.indexOf(session)].first_name + ' ' +
                                        consultants[reservedSessions.indexOf(session)].last_name }}</h4>
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
                                        <router-link class="isansFont btn btn-info"
                                                     :to="'/consultants/' + session.consultant_slug">مشاهده صفحه مشاور
                                        </router-link>
                                        <p class="text-info isansFont">
                                            {{getJalali(session.start_time).locale('fa').fromNow()}}</p>
                                    </div>
                                    <div class="rateWrapper">
                                        <button @click="submitRate(session.id,5)">rate 5</button>
                                        <button @click="submitRate(session.id,4)">rate 4</button>
                                        <button @click="submitRate(session.id,3)">rate 3</button>
                                        <button @click="submitRate(session.id,2)">rate 2</button>
                                        <button @click="submitRate(session.id,1)">rate 1</button>
                                        <button @click="submitRate(session.id,0)">rate 0</button>
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

    export default {
        name: "UserReservedSessions",
        components: {RectNotifBlock},
        data() {
            return {
                reservedSessions: [],
                consultants: [],
                inputRate: '',

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
            }
        },
        created() {

        },
        mounted() {
            scrollTo(0,0);
            this.resetCartsLogic();
            this.startCartsLogic();
            this.getReservedTimes().then(() => {
                console.log(this.reservedSessions);
                this.resetCartsLogic();
            }).catch(() => {
                this.failedCartsLogic();
            });
        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },

            getReservedTimes: async function () {
                return new Promise((resolve, reject) => {
                    this.sendReservedTimesRequest().then(async response => {
                        this.reservedSessions = response.data;
                        this.getConsultants().then(() => {
                            for (let i = 0; i < this.reservedSessions.length; i++) {
                                this.reservedSessions[i].consultant_person = this.consultants[i];
                            }
                            resolve();
                        }).catch(() => {

                        })

                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject()
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

            getConsultants: function () {
                return new Promise((resolve, reject) => {
                    let consultantsPromises = []
                    for (let i = 0; i < this.reservedSessions.length; i++) {
                        consultantsPromises.push(this.sendConsultantReqBySlug(this.reservedSessions[i].consultant_slug));
                    }

                    Promise.all(consultantsPromises).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    })
                });
            },


            sendConsultantReqBySlug: function (slug) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/' + slug,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                        },
                    }).then(response => {
                        this.consultants.push(response.data);
                        resolve(response);
                    }).catch(error => {
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
    .flexCard {
        display: flex;
        flex-direction: row;
        align-items: center;
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
        justify-content: space-between;
    }
</style>