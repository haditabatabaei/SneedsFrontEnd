<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="false"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            پنل مدیریت جلسات مشاوره
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="main profile-page">
            <div class="profile-content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <div class="profile">
                                <div class="avatar">
                                    <img src="http://193.176.241.131/sneedsAssets/img/marc.jpg" alt="Circle Image"
                                         class="img-circle img-responsive img-raised">
                                </div>
                                <div class="name">
                                    <h3 class="title isansFont">
                                        {{user.first_name}}

                                        {{user.last_name}}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-2 follow">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="isansFont text-center">
                                        تقویم شما
                                    </h3>
                                    <h5 class="isansFont text-center">
                                        جلسات مورد نیاز خود را در تقویم زیر انتخاب و آن هارا به سیستم اضافه کنید
                                    </h5>
                                </div>
                            </div>
                            <div class="row">
                                <ConsultantCalendar :consultantId="$store.getters.getUserInfo.consultant"></ConsultantCalendar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ConsultantCalendar from '@/components/Consultant/ConsultantCalendar'

    export default {
        name: "ConsultManagement",
        components: {ConsultantCalendar},
        data() {
            return {

            }
        },
        mounted() {
            scrollTo(0, 0);
        },
        methods: {

        },

        computed: {
            user: function () {
                return this.$store.getters.getUser;
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo;
            }
        }
    }
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .stickyPanel {
        position: sticky;
        top: 150px;
        margin-top: 60px;
    }

    @media only screen and (min-width: 767px) and (max-width: 992px) {

        .form-group button {
            font-size: 9px;
        }
    }

    @media only screen and (min-width: 0) and (max-width: 766.8px) {
        .stickyPanel {
            position: static;
        }

        .form-group button {
            font-size: 9px;
        }
    }

</style>