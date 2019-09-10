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

                        <ReservedSessionBlock v-for="session in reservedSessions"
                                              :isConsultant="isConsultant"
                                              :session="session"
                                              :rate="slotHasRate(session.id)"
                                              @update-list="updateList()"
                                              :key="session.id"
                        ></ReservedSessionBlock>

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
    import ReservedSessionBlock from '@/components/Consultant/ReservedSessionBlock'
    import StarRating from 'vue-star-rating'

    export default {
        name: "UserReservedSessions",
        components: {RectNotifBlock, ReservedSessionBlock, StarRating},
        data() {
            return {
                roomInterval: null,
                reservedSessions: [],
                videoRooms: [],
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
            this.updateList();
        },
        mounted() {
            scrollTo(0, 0);
            setTimeout(() => {
                console.log('setting sync video interval');
                setInterval(function () {
                    this.getVideoRoomsSyncReq();
                }.bind(this), 1000 * 60);
            }, 1000 * 10);
        },
        beforeDestroy() {
            clearInterval(this.roomInterval);
        },
        destroyed() {
            clearInterval(this.roomInterval);
        },
        methods: {

            updateList: function(){
                this.resetCartsLogic();
                this.startCartsLogic();
                this.getReservedTimes().then((responseSessions) => {
                    this.getListOfRates().then(responseRates => {
                        for (let i = 0; i < responseSessions.data.length; i++) {
                            responseSessions.data[i]["starRate"] = null;
                            responseSessions.data[i]["login_url"] = null;
                        }
                        this.reservedSessions = responseSessions.data;
                        this.availableRates = responseRates.data;
                        console.log('reserved sessions:', this.reservedSessions);
                        console.log('rates :', this.availableRates);

                        console.log('done');
                        this.getVideoRooms().then(() => {
                            console.log(this.reservedSessions);
                            this.resetCartsLogic();

                        }).catch(() => {
                            this.failedCartsLogic();
                        });
                    }).catch(error => {
                        this.failedCartsLogic();
                    });
                }).catch(() => {
                    this.failedCartsLogic();
                });
            },

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

            getVideoRoomsSyncReq: function () {
                console.log('calling sync video rooms');
                axios({
                    url: this.$store.getters.getApi + 'videochat/rooms/',
                    method: 'GET',
                    headers: {
                        'Authorization': 'JWT ' + this.$store.getters.getToken
                    }
                }).then(response => {
                    console.log('sync data from video rooms :', response.data)
                    for (let i = 0; i < this.reservedSessions.length; i++) {
                        let resultSession = this.getSessionRoomWithId(this.reservedSessions[i].id);
                        if (resultSession) {
                            this.reservedSessions[i].login_url = resultSession.login_url
                        }
                    }
                }).catch(error => {
                    console.log('sync data from video error', error);
                })
            },

            getVideoRooms: function () {
                console.log('sending video req');
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'videochat/rooms/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                        }
                    }).then(response => {
                        console.log('video rooms data:', response.data)
                        this.videoRooms = response.data;
                        for (let i = 0; i < this.reservedSessions.length; i++) {
                            let resultSession = this.getSessionRoomWithId(this.reservedSessions[i].id);
                            if (resultSession) {
                                this.reservedSessions[i].login_url = resultSession.login_url
                            }
                        }
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },

            updateRooms: function () {
                return new Promise((resolve, reject) => {
                    this.getVideoRooms().then(videosRes => {
                        this.videoRooms = videosRes.data;
                        for (let i = 0; i < this.reservedSessions.length; i++) {
                            let resultSession = this.getSessionRoomWithId(this.reservedSessions[i].id);
                            if (resultSession) {
                                this.reservedSessions[i].login_url = resultSession.login_url
                            } else {
                                this.reservedSessions[i].login_url = null;
                            }
                        }
                        resolve();
                    }).catch(videosErr => {
                        reject();
                    })
                })
            },

            getSessionRoomWithId: function (id) {
                for (let i = 0; i < this.videoRooms.length; i++) {
                    if (this.videoRooms[i].sold_time_slot == id)
                        return this.videoRooms[i];
                }
                return null;
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

    .main {
        background-color: #f1f1f1;
        padding-bottom:30px;
    }
</style>