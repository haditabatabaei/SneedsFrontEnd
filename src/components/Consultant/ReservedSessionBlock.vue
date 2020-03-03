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
                <star-rating
                    v-model="inputRate"
                    :rtl="true"
                    :star-size="25"
                    :rounded-corners="true"
                />
                <button
                        @click="submitRate(session.id, inputRate)"
                        class="isansFont btn btn-rose btn-sm btn-round">
                    ثبت امتیاز
                </button>
            </div>
            <p v-else-if="canRate && isConsultant">
                کاربر امتیاز خود را ثبت نکرده است
            </p>
            <p v-else-if="!canRate && isConsultant">
                کاربر امتیاز خود را ثبت کرده است
            </p>
            <p v-else>
                شما امتیاز خود را ثبت کردید :
                {{rate.rate}}
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
        components: {"star-rating" :StarRating},
        props: {
            session: {
                type : Object
            },
            isConsultant: {
                type : Boolean
            },
            rate: {
                type : Object,
                default: () => null
            },
        },
        data() {
            return {
                inputRate : 0
            }
        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },
            async submitRate(soldSlotId, rate) {
                console.log('rate for ', soldSlotId, ' rate ', rate);
                try {
                    this.$loading(true);
                    let result = await axios.post(
                        `${this.$store.getters.getApi}/comment/sold-time-slot-rates/`,
                        {"sold_time_slot" : soldSlotId, "rate" : rate},
                        this.$store.getters.httpConfig
                    );
                    console.log('rate result emitting event for update :', result.data);
                    this.$emit('update-list');
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },
        },
        computed: {
            canRate: function () {
                return this.rate == null;
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
        width: calc(33% - 30px);
        margin: 50px 15px 15px 0;
        padding-bottom: 10px;
        min-height: 320px;
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
