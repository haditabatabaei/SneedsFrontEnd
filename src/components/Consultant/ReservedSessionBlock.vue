<template>
    <div class="col-md-4 reservedCard text-center">
        <img class="reservedCard--image" :src="session.consultant.profile_picture"
             :alt="session.consultant.first_name +' '+ session.consultant.last_name" v-if="!isConsultant">
        <h5 class="reservedCard--detail-name isansFont--faNum text-center noImageTitle" v-if="isConsultant">
            توسط :
            {{session.sold_to.first_name + " " + session.sold_to.last_name}}
        </h5>
        <h5 class="reservedCard--detail-name isansFont--faNum text-center" v-else>
            {{session.consultant.first_name + " " + session.consultant.last_name}}
        </h5>
        <p class="reservedCard--detail-remain isansFont--faNum"
           :class="[{'deactiveRemain': currentTimeAfterSession},{'nearBeforeTime' : nearBeforeTime}, {'farBeforeTime' : farBeforeTime}]">
            {{getJalali(session.start_time).locale('fa').fromNow()}}
        </p>
        <p class="reservedCard--detail-date isansFont--faNum">
            <time>
                {{getJalali(session.start_time).locale('fa').format('dddd YYYY/MM/DD')}}
            </time>
            <br>
            <span>از ساعت</span>
            <time :datetime="getJalali(session.start_time)">
                {{getJalali(session.start_time).locale('fa').format('HH:mm')}}
            </time>
            <span>تا</span>
            <time :datetime="getJalali(session.end_time)">
                {{getJalali(session.end_time).locale('fa').format('HH:mm')}}
            </time>
        </p>

        <div class="reservedCard--actions">
            <a :href="session.login_url" class="isansFont--faNum reservedCard--enterButton btn btn-success"
               v-if="session.login_url != null">ورود به جلسه</a>
            <button disabled class="isansFont--faNum reservedCard--enterButton btn btn-default"
                    v-else>ورود به جلسه
            </button>
        </div>

        <div class="isansFont--faNum reservedCard--rate text-center" v-if="session.used">
            <div class="col-md-12" v-if="canRate && !isConsultant">
                <StarRating
                        v-model="session.starRate"
                        :rtl="true"
                        :star-size="25"
                        :rounded-corners="true"
                ></StarRating>
                <button
                        @click="submitRate(session.id,session.starRate)"
                        class="isansFont btn btn-rose btn-sm btn-round">
                    ثبت امتیاز
                </button>
            </div>
            <p v-else-if="canRate && isConsultant">
                کاربر امتیاز خود را ثبت کرده است
            </p>
            <p v-else-if="!canRate && isConsultant">
                کاربر امتیاز خود را ثبت نکرده است
            </p>
            <p v-else>
                شما امتیاز خود را ثبت کردید :
                {{rate}}
            </p>
        </div>

    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import StarRating from 'vue-star-rating'

    export default {
        name: "ReservedSessionBlock",
        components: {StarRating},
        props: {
            session: {},
            isConsultant: {},
            rate: {},
        },
        data: function () {
            return {}
        },
        created() {
        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
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

            submitRate: function (soldSlotId, rate) {
                console.log('submitPressed');
                this.sendConsultantRate(soldSlotId, rate).then(response => {
                    console.log('response is here emitting update list event', response);
                    this.$emit('update-list');
                }).catch(error => {
                    console.log(error);
                    if (error.response)
                        console.log(error.response);
                })
            },
        },
        computed: {
            currentTimeBetweenSession: function () {
                return this.getJalali().isBetween(this.getJalali(this.session.start_time), this.getJalali(this.session.end_time));
            },
            canRate: function () {
                return this.rate === false;
            },
            currentTimeBeforeSession: function () {
                return this.getJalali().isBefore(this.getJalali(this.session.start_time));
            },
            currentTimeAfterSession: function () {
                return this.getJalali().isAfter(this.getJalali(this.session.end_time));
            },
            nearBeforeTime: function () {
                let diff = this.getJalali(this.session.start_time).diff(this.getJalali(), 'hour');
                return diff >= 0 && diff <= 12;
            },
            farBeforeTime: function () {
                let diff = this.getJalali(this.session.start_time).diff(this.getJalali(), 'hour');
                return diff > 12;
            }
        }
    }
</script>

<style scoped>
    .reservedCard {
        border-radius: 5px;

        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

        margin-top: 50px;

        width: calc(25% - 30px);

        margin-right: 15px;
        margin-left: 15px;

        height: 320px;
    }

    .reservedCard--image {
        border-radius: 20px;
        height: 110px;
        width: 110px;

        position: relative;
        top: -20px;

        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .reservedCard--detail-name {
        margin-top: -10px;
        margin-bottom: 15px;
        font-weight: bold;
    }

    .reservedCard--detail-name.noImageTitle {
        margin-top: 15px;
    }

    .reservedCard--detail-remain {
        border-radius: 20px;
        font-weight: bold;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .deactiveRemain {
        background-color: #f1f1f1;
        color: #bebebe;
    }

    .nearBeforeTime {
        background-color: #EAA5B0;
        color: #A25252;
    }

    .farBeforeTime {
        background-color: #FCFAB1;
        color: #A3871B;
    }

    .reservedCard--detail-date time {
        font-weight: bold;
    }

    .reservedCard--enterButton {
        border-radius: 10px;
        font-weight: bold;
        padding: 8px 20px;
        margin-top: 0;
    }

    .reservedCard--enterButton[disabled] {
        background-color: #f1f1f1;
        opacity: 1;
        color: #bebebe;
    }

    .reservedCard--rate .vue-star-rating {
        justify-content: center;
    }


    @media only screen and (max-width: 991.8px) {
        .reservedCard {
            width: 100%;
            margin-right: 0;
            margin-left: 0;
        }
    }
</style>