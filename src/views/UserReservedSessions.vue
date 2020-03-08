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
            <div class="col-md-12 text-center mt-10" v-if="reservedSessions.length === 0">
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
                    :rate="session.rate"
                    @update-list="updateList()"
                    @update-rates="updateRates()"
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
            }
        },
        computed: {
            isConsultant() {
                return this.$store.getters.getUserInfo.user_type === 'consultant';
            }
        },

        async created() {
            await this.updateList();
            console.log('activating video rooms interval');
            this.roomInterval = setInterval(() => {
                //remove false in production
                this.getVideoRoomsSyncReq();
            }, 1000 * 60)
        },

        destroyed() {
            console.log('deleting video rooms interval');
            clearInterval(this.roomInterval);
        },

        methods: {
            async updateRates() {
                for(let soldSlot of this.reservedSessions) {
                    try {
                        this.$loading(true);
                        console.log('getting rate of ', soldSlot.id);
                        let ratesResult = await axios.get(`${this.$store.getters.getApi}/comment/sold-time-slot-rates/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                        soldSlot.rate = ratesResult.data;
                    } catch (e) {
                        soldSlot.rate = null;
                    } finally {
                        this.$loading(false);
                    }
                }
                this.filterBy('all');
                this.filterBy(this.activeFilter);
                console.log(this.shownReservedSessions);
            },

            filterBy(param) {
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
                    this.$loading(true);

                    try {
                        this.$loading(true);
                        let soldSlotsResult = await axios.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/`, this.$store.getters.httpConfig);
                        this.reservedSessions = soldSlotsResult.data;
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {
                        this.$loading(false);
                    }

                    console.log('sold slot results ', this.reservedSessions);
                    for(let soldSlot of this.reservedSessions) {
                        try {
                            this.$loading(true);
                            console.log('getting rate of ', soldSlot.id);
                            let ratesResult = await axios.get(`${this.$store.getters.getApi}/comment/sold-time-slot-rates/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                            soldSlot.rate = ratesResult.data;
                        } catch (e) {
                            soldSlot.rate = null;
                        } finally {
                            this.$loading(false);
                        }

                        try {
                            this.$loading(true);
                            console.log('getting video of ', soldSlot.id);
                            let roomsResult = await axios.get(`${this.$store.getters.getApi}/videochat/rooms/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                            soldSlot.room = roomsResult.data;
                        } catch (e) {
                            soldSlot.room = null;
                        } finally {
                            this.$loading(false);
                        }


                    }

                    console.log("Check here ", this.reservedSessions);
                    this.filterBy('all');
                    this.$loading(false);

            },

            getJalali(date) {
                return jalali(date);
            },

            async getVideoRoomsSyncReq() {
                console.log('calling sync video rooms');
                for(let soldSlot of this.reservedSessions) {
                    try {
                        this.$loading(true);
                        console.log('getting video of ', soldSlot.id);
                        let roomsResult = await axios.get(`${this.$store.getters.getApi}/videochat/rooms/?sold_time_slot=${soldSlot.id}`, this.$store.getters.httpConfig);
                        soldSlot.room = roomsResult.data;
                    } catch (e) {
                        soldSlot.room = null;
                    } finally {
                        this.$loading(false);
                    }
                }
                this.filterBy('all');
                this.filterBy(this.activeFilter)
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
