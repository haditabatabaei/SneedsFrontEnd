<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            سبد خرید
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="main profile-page">
            <div class="profile-content">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <div class="profile">
                                <div class="avatar">
                                    <img src="../../public/webimages/marc.jpg" alt="Circle Image"
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
                                        سبد خرید شما
                                    </h3>
                                    <!--                                    <h5 class="isansFont text-center">-->
                                    <!--                                        جلسات مورد نیاز خود را در تقویم زیر انتخاب و آن هارا به سیستم اضافه کنید-->
                                    <!--                                    </h5>-->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">

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
    import axios from 'axios';

    export default {
        name: "UserCard",
        data: function () {
            return {
                cart: {}
            }
        }, created() {
            this.getCarts();
        },
        methods: {
            getCarts: function () {
                console.log('get carts called');
                let cartsPromise = this.sendGetCardRequest();
                cartsPromise.then(response => {
                    console.log('carts response :', response);
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response);
                    }
                })
            },
            sendGetCardRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'cart/carts/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.getUser
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo
            }
        }
    }
</script>

<style scoped>

</style>