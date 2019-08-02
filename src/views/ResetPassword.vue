<template>
    <div class="page-header"
         style="background-image: url('webimages/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="card card-signup">
                        <form @submit.prevent="setNewPassword()" class="form">
                            <div class="header header-rose text-center">
                                <h4 class="card-title isansFont mb-0">
                                    تغییر رمز عبور
                                </h4>
                                <div class="social-line mt-0 mb-10"></div>
                            </div>
                            <div class="card-content">
                                <RectNotifBlock :message="loginLoading.message" type="warning" borderRound="true"
                                                v-if="loginLoading.value"   ></RectNotifBlock>

                                <RectNotifBlock :message="loginSuccess.message" type="success" borderRound="true"
                                                v-else-if="loginSuccess.value"></RectNotifBlock>

                                <RectNotifBlock :message="loginFailed.message" type="danger" borderRound="true"
                                                v-else-if="loginFailed.value"></RectNotifBlock>

                                <div v-if="!loginSuccess.value" class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">lock</i>
                                    </span>
                                    <div class="form-group form-rose gadugiFont isansFont">
                                        <input required
                                               v-model="inputNewPassword"
                                               :type="passType"
                                               class="form-control"
                                               placeholder="رمز عبور جدید خود را وارد کنید...">
                                        <span class="material-input"></span>
                                        <span class="text-center isansFont text-danger" v-if="inputNewPasswordError">
                                                لطفا یک رمز عبور معتبر وارد کنید
                                        </span>
                                    </div>
                                    <span class="input-group-addon" style="border-left:0;">
                                    <button type="button" class="btn btn-xs btn-simple btn-fab btn-fab-mini btn-round"
                                            @click="togglePassType()">
                                        <i class="material-icons" v-if="passType == 'password'">visibility</i>
                                        <i class="material-icons" v-else>visibility_off</i>
                                        <div class="ripple-container"></div>
                                    </button>
                                    </span>
                                </div>

                                <div v-if="!loginSuccess.value" class="row">
                                    <div class="col-sm-6 col-sm-offset-3 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ثبت رمز عبور">
                                    </div>
                                </div>

                            </div>
                            <div class="footer text-center"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import axios from 'axios'

    export default {
        name: "ResetPassword",
        components: {RectNotifBlock},
        data() {
            return {
                passType: 'password',

                inputNewPassword: '',
                inputNewPasswordError: false,

                loginSuccess: {
                    value: false,
                    message: 'رمز عبور جدید شما با موفقیت ثبت شد.به صفحه ورود ارجاع داده می شوید'
                },

                loginLoading: {
                    value: false,
                    message:
                        'چند لحظه صبر کنید...'
                },

                loginFailed: {
                    value: false,
                    message: 'مشکلی رخ داد...'
                },


            }
        },
        created() {
            console.log("token query parameter :", this.$route.query.token);
        },
        methods: {
            togglePassType: function () {

                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            setNewPassword: function () {
                this.resetLoadingLogic();
                this.startLoadingLogic();
                this.inputNewPasswordError = false;
                if (this.inputNewPassword) {
                    let payload = {
                        "password": this.inputNewPassword,
                        "token": this.$route.query.token
                    };
                    console.log('payload : ', payload);
                    this.sendResetPassRequest(payload).then(response => {
                        console.log(response);
                        this.successLoadingLogic();
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 1500)
                    }).catch(error => {
                        console.log(error);
                        this.failedLoadingLogic();
                        if (error.response) {
                            console.log(error.response);
                        }
                    })
                } else {
                    this.failedLoadingLogic();
                    this.inputNewPasswordError = true;
                }

            },

            sendResetPassRequest: function (payload) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'auth/password-reset/confirm/',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: payload,
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },
            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = false;
                this.loginSuccess.value = false;
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.loginLoading.value = true;
                this.loginFailed.value = false;
                this.loginSuccess.value = false;
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = true;
                this.loginSuccess.value = false;
            },

            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = false;
                this.loginSuccess.value = true;
            },

        }
    }
</script>

<style scoped>
    .card-signup .card-content {
        padding: 0 20px;
    }
</style>