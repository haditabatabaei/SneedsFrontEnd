<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('http://185.209.243.97/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                        <div class="col-md-12 text-center">
                            <div class="filterButtons isansFont--faNum">
                                <button @click="filterBy('all')" :class="[{'active' : activeFilter === 'all'}]">
                                    همه
                                </button>
                                <button @click="filterBy('finished')"
                                        :class="[{'active' : activeFilter === 'finished'}]">
                                    برگزار شده
                                </button>
                                <button @click="filterBy('nostart')" :class="[{'active' : activeFilter === 'nostart'}]">
                                    برگزار نشده
                                </button>

                            </div>
                        </div>
                        <div class="col-md-12 text-center" style="margin-top:10px;"
                             v-if="reservedSessions.length === 0">

                            <p class="isansFont">جلسه ای برای نمایش وجود ندارد</p>
                            <router-link to="/consultants" class="btn btn-info btn-simple btn-lg text-center isansFont">
                                مشاهده مشاوران
                            </router-link>
                        </div>

                        <div class="col-md-12">
                            <ReservedSessionBlock v-for="session in shownReservedSessions"
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
                shownReservedSessions: [],
                activeFilter: 'all',
                videoRooms: [],
                availableRates: [],
                starRate: '',

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

            filterBy: function (param) {
                this.activeFilter = param;
                this.shownReservedSessions = [];
                switch (param) {
                    case 'all' :
                        this.shownReservedSessions = this.reservedSessions;
                        break;
                    case 'nostart' :
                        for (let i = 0; i < this.reservedSessions.length; i++) {
                            if (!this.reservedSessions[i].used) {
                                this.shownReservedSessions.push(this.reservedSessions[i]);
                            }
                        }
                        break;
                    case 'finished' :
                        for (let i = 0; i < this.reservedSessions.length; i++) {
                            if (this.reservedSessions[i].used) {
                                this.shownReservedSessions.push(this.reservedSessions[i]);
                            }
                        }
                        break;
                }
            },

            updateList: function () {
                this.$loading(true);
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
                        this.getVideoRooms().then((videoRes) => {
                            console.log(this.reservedSessions);
                            console.log('video rooms data:', videoRes.data)
                            this.videoRooms = videoRes.data;
                            for (let i = 0; i < this.reservedSessions.length; i++) {
                                let resultSession = this.getSessionRoomWithId(this.reservedSessions[i].id);
                                if (resultSession) {
                                    this.reservedSessions[i].login_url = resultSession.login_url
                                }
                            }
                            this.filterBy('all');
                        }).catch(() => {
                            this.$notify({
                                type : 'error',
                                group : 'notif',
                                duration:3000,
                                text : 'خطایی هنگام ارتباط با سرور رخ داد',
                                title : 'خطا'
                            })
                        }).finally(() => {this.$loading(false)});
                    }).catch(error => {
                        this.$loading(false);
                        this.$notify({
                            type : 'error',
                            group : 'notif',
                            duration:3000,
                            text : 'خطایی هنگام ارتباط با سرور رخ داد',
                            title : 'خطا'
                        })
                    });
                }).catch(() => {
                    this.$loading(false);
                    this.$notify({
                        type : 'error',
                        group : 'notif',
                        duration:3000,
                        text : 'خطایی هنگام ارتباط با سرور رخ داد',
                        title : 'خطا'
                    })
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
                    this.filterBy('all');
                    this.filterBy(this.activeFilter)
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
                        resolve(response);
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
        },
    }

</script>

<style scoped>
    .main {
        background-color: white;
        padding-bottom: 30px;
    }

    .filterButtons {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;

        margin-top: 30px;
        margin-bottom: 30px;

    }

    .filterButtons button {
        margin-right: 10px;
        margin-left: 10px;

        border-radius: 30px;
        border: none;
        padding: 10px 20px;
        color: #666;
        background: none;

        transition: all .1s ease-in;
    }

    .filterButtons button:hover {
        background-color: #f3f3f3;
    }

    .filterButtons button.active {
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
</style>