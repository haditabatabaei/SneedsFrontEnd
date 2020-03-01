<template>
    <div class="container-fluid itemBlock">
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
            <div class="col-md-12 text-center" style="margin-top:10px;" v-if="reservedSessions.length === 0">
                <p class="isansFont">جلسه ای برای نمایش وجود ندارد</p>
                <router-link to="/consultants" class="btn btn-info btn-simple btn-lg text-center isansFont">
                    مشاهده مشاوران
                </router-link>
            </div>

            <div class="col-md-12" v-else>
                <reserved-session-block
                    v-for="(session, index) in shownReservedSessions"
                    :isConsultant="isConsultant"
                    :session="session"
                    :rate="session.starRate"
                    @update-list="updateList()"
                    :key="index"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'
    import ReservedSessionBlock from '@/components/Consultant/ReservedSessionBlock'

    export default {
        name: "UserReservedSessions",
        components: {ReservedSessionBlock},
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
                return this.$store.getters.getUserInfo.user_type === 'consultant';
            }
        },

        created() {
            this.updateList();
        },

        mounted() {
            scrollTo(0, 0);
            setTimeout(() => {
                console.log('setting sync video interval');
                setInterval( async () => {
                    await this.getVideoRoomsSyncReq();
                }, 1000 * 60);
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
                switch (param) {
                    case 'all' :
                        this.shownReservedSessions = this.reservedSessions;
                        break;
                    case 'nostart' :
                        this.shownReservedSessions = this.reservedSessions.filter(value => !value.used);
                        break;
                    case 'finished' :
                        this.shownReservedSessions = this.reservedSessions.filter(value => value.used);
                        break;
                }
            },

            async updateList() {
                try {
                    this.$loading(true);
                    let soldSlotsResult = await axios.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/`, this.$store.getters.httpConfig);
                    console.log('sold slot results ', soldSlotsResult);
                    for(let soldSlot of soldSlotsResult.data) {
                        console.log('getting rate of ', soldSlot.id);
                        let ratesResult = await axios.get(`${this.$store.getters.getApi}/comment/sold-time-slot-rates/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                        let roomsResult = await axios.get(`${this.$store.getters.getApi}/videochat/rooms/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                        soldSlot.rate = ratesResult.data[0];
                        soldSlot.room = roomsResult.data[0];
                        // if (ratesResult.data[0]) {
                        //     console.log('setting rate to', ratesResult.data[0].rate);
                        //     soldSlot["starRate"] = ratesResult.data[0].rate;
                        // } else {
                        //     soldSlot["starRate"] = null
                        //     console.log('star rate is null');
                        // }
                    }

                    // let rooms = await axios.get(`${this.$store.getters.getApi}/videochat/rooms/`,this.$store.getters.httpConfig);
                    // this.videoRooms = rooms.data;
                    // for(let soldSlot of soldSlotsResult.data) {
                    //     soldSlot["login_url"] = this.getSessionRoomWithId(soldSlot.id);
                    // }
                    console.log("Check here ", soldSlotsResult.data);
                    this.reservedSessions = soldSlotsResult.data;
                    this.filterBy('all');
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            getJalali: function (date) {
                return jalali(date);
            },

            getVideoRoomsSyncReq: async function () {
                console.log('calling sync video rooms');
                try {
                    let rooms = await axios.get(`${this.$store.getters.getApi}/videochat/rooms/`,this.$store.getters.httpConfig);
                    this.videoRooms = rooms.data;
                    for(let soldSlot of this.reservedSessions) {
                        soldSlot["login_url"] = this.getSessionRoomWithId(soldSlot.id);
                    }
                    this.filterBy('all');
                    this.filterBy(this.activeFilter)
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            getSessionRoomWithId: function (id) {
                for (let i = 0; i < this.videoRooms.length; i++) {
                    if (this.videoRooms[i].sold_time_slot == id)
                        return this.videoRooms[i].login_url;
                }
                return null;
            },
        },
    }

</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 15px;
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
