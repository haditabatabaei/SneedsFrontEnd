<template>
    <div class="session-block">
        <img class="session-image"
             :src="session.consultant.profile_picture"
             :alt="session.consultant.first_name + ' ' + session.consultant.last_name"
             v-if="!isConsultant">
        <div class="session-image section-image--user" v-else>
            <i class="material-icons">person</i>
        </div>
        <div class="session-info isansFont">
            <h2 class="session-other-name isansFont" v-if="isConsultant">
                {{session.sold_to.first_name + " " + session.sold_to.last_name}}
            </h2>
            <h2 class="session-other-name isansFont" v-else>
                {{session.consultant.first_name + " " + session.consultant.last_name}}
            </h2>
            <p class="session-date" :class="[{'isansFont--faNum' : $store.getters.isiran}]">
                <time class="session-date-day">
                    <i class="material-icons">calendar_today</i>
                    {{sessionStartDate.format('dddd YYYY/MM/DD')}}
                </time>
                <time class="session-date-time">
                    <i class="material-icons">access_time</i>
                    {{sessionStartDate.format('HH:mm')}}
                    <span v-if="$store.getters.isiran" class="session-date-time--separator">تا</span>
                    <span v-else class="session-date-time--separator">till</span>
                    {{sessionStartDate.clone().add('50', 'minutes').format('HH:mm')}}
                </time>
            </p>
            <p class="session-remain session-ongoing" v-if="sessionIsOngoing">
                در حال برگزاری
            </p>
            <p class="session-remain" v-else
               :class="[{'isansFont--faNum': $store.getters.isiran}, sessionRemainingClass]">
                {{sessionStartDate.from(currentTime)}}
            </p>
        </div>
        <a :href="room.login_url" class="session-room-button active isansFont" v-if="activeRoom">
            ورود به جلسه
        </a>
        <a class="session-room-button isansFont" v-if="deactiveRoom">
            ورود به جلسه
        </a>

        <div class="session-rate" :class="[{'isansFont--faNum': $store.getters.isiran}]" v-if="hideRoom">
            <star-rating
                    v-if="rate != null && !isConsultant"
                    :rtl="$store.getters.isiran"
                    :star-size="20"
                    :padding="5"
                    :read-only="true"
                    style="background-color: #FCFCFC;padding:10px 10px 5px 15px; border-radius:20px"
                    inactive-color="#FCFCFC"
                    active-color="#F4CA64"
                    :showRating="false"
                    v-model="rate.rate"/>

            <star-rating
                    v-else-if="rate == null && !isConsultant"
                    :rtl="$store.getters.isiran"
                    :star-size="16"
                    :padding="5"
                    :showRating="false"
                    style="background-color: white;padding:5px 10px 10px 15px;border:1.5px solid #8C3DDB;border-radius:20px;"
                    border-color="#8C3DDB"
                    active-color="#8C3DDB"
                    :border-width="2"
                    @rating-selected="submitRate"
                    v-model="inputRate"/>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import StarRating from 'vue-star-rating'

    export default {
        name: "ReservedSessionBlock",
        components: {"star-rating": StarRating},
        props: {
            session: {
                type: Object
            },
            isConsultant: {
                type: Boolean
            },
            currentTime: {
                type: Object,
                default: () => this.getJalali().locale(this.$store.getters.locale)
            },
        },
        data() {
            return {
                interval: null,
                inputRate: 0,
                rate: null,
                room: null,
            }
        },
        async mounted() {
            console.log('session mounted ', this.session.id);
                this.getMyRoom(true);
                this.getMyRate(true);
                this.interval = setInterval(() => {
                    this.currentTime.add('1', 'minutes');
                    this.getMyRate(false);
                    this.getMyRoom(false);
                }, 1000 * 60);
        },
        beforeDestroy() {
            clearInterval(this.interval);
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            async getMyRate(overrideConditions) {
                if (this.readyToCheckForRate || overrideConditions) {
                    try {
                        //this.$loading(true);
                        let rateResult = (await this.$api.get(`${this.$store.getters.getApi}/comment/sold-time-slot-rates/?sold_time_slot=${this.session.id}`, this.$store.getters.httpConfig)).data;
                        console.log(`current session ${this.session.id} rate :`, rateResult);
                        this.rate = rateResult;
                    } catch (e) {
                        console.log(e);
                        console.log(`current session ${this.session.id} doesnt have rate`)
                    } finally {

                    }
                } else {
                    console.log(`no time or already has rate for getting session ${this.session.id} rate.`);
                }
            },

            async getMyRoom(overrideConditions) {
                if (this.readyToCheckForRoom || overrideConditions) {
                    try {
                        //this.$loading(true);
                        let roomResult = (await this.$api.get(`${this.$store.getters.getApi}/videochat/rooms/?sold_time_slot=${this.session.id}`, this.$store.getters.httpConfig)).data;
                        console.log(`current session ${this.session.id} room :`, roomResult);
                        this.room = roomResult;
                    } catch (e) {
                        console.log(e);
                        console.log(`current session ${this.session.id} doesnt have room`);
                    } finally {

                    }
                } else {
                    console.log(`no time or already has room for getting session ${this.session.id} room.`);
                }
            },

            async submitRate(rate) {
                console.log('submit rate for session', this.session.id, ' rate ', rate);
                try {
                    //this.$loading(true);
                    let result = await this.$api.post(
                        `${this.$store.getters.getApi}/comment/sold-time-slot-rates/`,
                        {"sold_time_slot": this.session.id, "rate": rate},
                        this.$store.getters.httpConfig
                    );
                    await this.getMyRate(true);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },
        },
        computed: {
            sessionEndDate() {
                return this.getJalali(this.session.end_time).locale(this.$store.getters.locale).add(5, 'minutes');
            },

            sessionStartDate() {
                return this.getJalali(this.session.start_time).locale(this.$store.getters.locale).subtract(5, 'minutes');
            },

            currentTimeAfterSessionEnd() {
                return this.currentTime.isAfter(this.sessionEndDate);
            },

            currentTimeBeforeSessionStart() {
                return this.currentTime.isBefore(this.sessionStartDate);
            },

            sessionIsOngoing() {
                return this.currentTime.isBetween(this.sessionStartDate, this.sessionEndDate);
            },

            diffBeforeOffsetInHours() {
                return this.sessionStartDate.diff(this.currentTime, 'hour');
            },

            nearBeforeTime() {
                return this.diffBeforeOffsetInHours > 2 && this.diffBeforeOffsetInHours <= 12;
            },

            veryNearBeforeTime() {
                return this.diffBeforeOffsetInHours >= 0 && this.diffBeforeOffsetInHours <= 2;
            },

            farBeforeTime() {
                return this.diffBeforeOffsetInHours > 12;
            },

            readyToCheckForRoom() {
                return this.sessionIsOngoing && this.rate == null;
            },

            readyToCheckForRate() {
                return this.sessionIsOngoing && this.rate == null && !this.isConsultant;
            },

            activeRoom() {
                return this.room != null && this.sessionIsOngoing;
            },

            deactiveRoom() {
                return this.currentTimeBeforeSessionStart && !this.hideRoom;
            },

            hideRoom() {
                return this.currentTimeAfterSessionEnd;
            },

            sessionRemainingClass() {
                if (this.farBeforeTime) {
                    return 'session-before--far';
                } else if (this.nearBeforeTime) {
                    return 'session-before--near';
                } else if (this.veryNearBeforeTime) {
                    return 'session-before--verynear';
                } else if (this.currentTimeAfterSessionEnd) {
                    return 'session-passed';
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>
    .session-block {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height: 100px;
        margin-top: 15px;
    }

    .session-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 15px;
        margin-left: 15px;
    }

    .section-image--user {
        width: 94px;
        height: 94px;
        background-color: #8E39CC;
        border: 6px solid #ECD9FF;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section-image--user i {
        font-size : 50px;
        color: #ECD9FF;
    }

    .session-info {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }

    .session-other-name {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        color: #303143;
    }

    .session-date {
        margin: 10px 0;
        display: flex;
        color: #585858;
    }

    .session-remain {
        margin: 0;
        font-size: 12px;
        padding: 2.5px 15px;
        border-radius: 15px;
    }

    .session-passed {
        background: #F2F2F2;
        color: #707070;
    }

    .session-before--near {
        background-color: #FFFCF4;
        color: #8C6D1F;
    }

    .session-before--verynear {
        background-color: #FFFEFA;
        color: #DC3030;
    }

    .session-before--far {
        background-color: #FAFDFF;
        color: #1B655E;
    }

    .session-ongoing {
        background-color: #1B655E;
        color: white;
    }

    .session-date-day {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-left: 15px;
    }

    .session-date-day i {
        font-size: 14px;
        margin-left: 5px;
        color: #B3B3B3;
    }

    .session-date-time {
        display: flex;
        align-items: center;
        font-size: 12px;
    }

    .session-date-time i {
        font-size: 14px;
        margin-left: 5px;
        color: #B3B3B3;
    }

    .session-date-time--separator {
        margin-right: 5px;
        margin-left: 5px;
    }

    .session-room-button {
        margin-right: auto;
        border: none;
        padding: 7px 25px;
        margin-left: 15px;
        border-radius: 10px;
        background-color: #F2F2F2;
        color: #B3B3B3;
    }

    .session-room-button.active {
        background: #9038CC;
        color: white;
    }

    .session-room-button.active:hover {
        box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.2);
    }

    .session-rate {
        margin-right: auto;
        margin-left: 30px;
    }

    @media only screen and (max-width: 576px) {
        .session-block {
            flex-wrap: wrap;
        }

        .session-rate {
            margin: auto;
        }

        .session-image {
            width: 75px;
            height: 75px;
        }

        .session-date {
            flex-direction: column;
        }

        .session-date-day {
            margin-left: 0;
        }

        .session-other-name {
            font-size: 14px;
        }
    }
</style>
