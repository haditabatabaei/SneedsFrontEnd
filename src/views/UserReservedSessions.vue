<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                        <div class="card card-profile card-plain col-md-6 flexCard" v-for="session in reservedSessions">
                            <div class="card-image">
                                <a href="#pablo">
                                    <img class="img img-fluid" src="../../public/webimages/marc.jpg" alt="image">
                                </a>
                            </div>
                            <div class="col-md-7">
                                <div class="card-content">
                                    <h4 class="card-title isansFont"> مشاور : {{session.consultant}}</h4>
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
                                                     :to="'/consultants/' + session.consultant">مشاهده صفحه مشاور
                                        </router-link>
                                        <p class="text-info isansFont">{{getJalali(session.start_time).locale('fa').fromNow()}}</p>
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

    export default {
        name: "UserReservedSessions",
        data() {
            return {
                reservedSessions: [],
            }
        },
        computed: {
          jalaliNow: function(){
              return jalali();
          }
        },
        created() {
            this.getReservedTimes();
        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },
            getReservedTimes: function () {
                return new Promise((resolve, reject) => {
                    this.sendReservedTimesRequest().then(response => {
                        this.reservedSessions = response.data;
                        resolve()
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
            sendConsultantReqById: function (id) {

            }
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

    .cart-flex-footer{
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
</style>