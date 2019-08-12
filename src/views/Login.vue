<template>
    <div class="page-header"
         style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="card card-signup">
                        <form class="form" @submit.prevent="login()" v-if="loginOrReset">
                            <div class="header header-rose text-center">
                                <h4 class="card-title isansFont mb-0">
                                    ورود کاربر
                                    <br>
                                    یا
                                </h4>
                                <div class="social-line mt-0 mb-10">
                                    <router-link to="/register" class="btn customRegisterBtn isansFont pull-center">
                                        ثبت نام
                                    </router-link>
                                </div>
                            </div>
                            <div class="card-content">
                                <RectNotifBlock :message="loginLoading.message" type="warning" borderRound="true"
                                                v-if="loginLoading.value"></RectNotifBlock>

                                <RectNotifBlock :message="loginSuccess.message" type="success" borderRound="true"
                                                v-else-if="loginSuccess.value"></RectNotifBlock>

                                <RectNotifBlock :message="loginFailed.message" type="danger" borderRound="true"
                                                v-else-if="loginFailed.value"></RectNotifBlock>

                                <div v-if="!loginSuccess.value" class="input-group">
                  <span class="input-group-addon">
                    <i class="material-icons">email</i>
                  </span>
                                    <div class="form-group form-rose gadugiFont isansFont">
                                        <input required
                                               v-model="userToLogin.email"
                                               type="email"
                                               class="form-control"
                                               placeholder="ایمیل...">
                                        <span class="material-input"></span>
                                        <span class="text-center isansFont text-danger"
                                              v-if="!emailIsValid">
                      لطفا یک ایمیل معتبر وارد کنید
                    </span>
                                    </div>
                                </div>

                                <div v-if="!loginSuccess.value"
                                     class="input-group d-flex flex-row justify-content-between">
									<span class="input-group-addon">
										<i class="material-icons">lock_outline</i>
                                    </span>

                                    <div class="form-group form-rose isansFont gadugiFont">
                                        <input required
                                               v-model="userToLogin.password"
                                               :type="passType"
                                               placeholder="رمز عبور..."
                                               class="form-control">
                                        <span class="material-input"></span>

                                        <span class="text-center isansFont text-danger"
                                              v-if="!passwordIsValid">
                                           لطفا یک رمز عبور معتبر وارد کنید. حداقل 6 کاراکتر
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

                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ورود" :disabled="!formIsValid">
                                    </div>
                                    <div class="col-sm-6 text-center">
                                        <button @click.prevent="toggleResetPassword()"
                                                class="forgetPassButton btn btn-rose isansFont btn-simple btn-sm">
                                            رمز عبور خود را فراموش کردم
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div class="footer text-center"></div>
                        </form>
                        <form @submit.prevent="resetPassword()" class="form" v-else>
                            <div class="header header-rose text-center">
                                <h4 class="card-title isansFont mb-0">
                                    فراموشی رمز عبور
                                </h4>
                                <div class="social-line mt-0 mb-10"></div>
                            </div>
                            <div class="card-content">
                                <RectNotifBlock :message="loginLoading.message" type="warning" borderRound="true"
                                                v-if="loginLoading.value"></RectNotifBlock>

                                <RectNotifBlock :message="loginSuccess.message" type="success" borderRound="true"
                                                v-else-if="loginSuccess.value"></RectNotifBlock>

                                <RectNotifBlock :message="loginFailed.message" type="danger" borderRound="true"
                                                v-else-if="loginFailed.value"></RectNotifBlock>

                                <div v-if="!loginSuccess.value" class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <div class="form-group form-rose gadugiFont isansFont">
                                        <input required
                                               v-model="inputEmailForgetPass"
                                               type="email"
                                               class="form-control"
                                               placeholder="ایمیل خود را وارد کنید...">
                                        <span class="material-input"></span>
                                        <span class="text-center isansFont text-danger" v-if="!resetPassEmailIsValid">
                                                لطفا یک ایمیل معتبر وارد کنید
                                        </span>
                                    </div>
                                </div>

                                <div v-if="!loginSuccess.value" class="row">
                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ارسال ایمیل فراموشی" :disabled="!resetPassEmailIsValid">
                                    </div>
                                    <div class="col-sm-6 text-center">
                                        <button @click.prevent="toggleResetPassword()"
                                                class="forgetPassButton btn btn-rose isansFont btn-simple btn-sm">
                                            ورود
                                        </button>
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
    import axios from 'axios';

    export default {
        name: "Login",
        data: function () {
            return {

                passType: 'password',

                emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

                userToLogin: {
                    email: '',
                    password: '',
                },

                inputEmailForgetPass: '',

                loginOrReset: true,

                loginSuccess: {
                    value: false,
                    message: 'با موفقیت وارد شدید،چند لحظه صبر کنید...'
                },

                loginLoading: {
                    value: false,
                    message:
                        'در حال ورود، چند لحظه صبر کنید...'
                },

                loginFailed: {
                    value: false,
                    message: 'مشکلی در ورود رخ داد...'
                },
            }
        },
        components: {RectNotifBlock},
        computed : {
            emailIsValid() {
                return this.userToLogin.email.match(this.emailRegex);
            },

            passwordIsValid() {
                return this.userToLogin.password.length >= 6;
            },

            formIsValid(){
                return this.emailIsValid && this.passwordIsValid;
            },

            resetPassEmailIsValid() {
                return this.inputEmailForgetPass.match(this.emailRegex);
            }
        },
        methods: {

           resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = false;
                this.loginSuccess.value = false;
                this.loginSuccess.message = 'با موفقیت وارد شدید،چند لحظه صبر کنید...'
                this.loginFailed.message = 'مشکلی در ورود رخ داد...'
                this.loginLoading.message = 'در حال ورود، چند لحظه صبر کنید...'
                scrollTo(0, 0);
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.loginLoading.value = true;
                this.loginFailed.value = false;
                this.loginSuccess.value = false;
                scrollTo(0, 0);
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = true;
                this.loginSuccess.value = false;
                scrollTo(0, 0);
            },

            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.loginLoading.value = false;
                this.loginFailed.value = false;
                this.loginSuccess.value = true;
            },


            login: function () {
                window.console.log('login pressed');

                //loading logic updated
                this.startLoadingLogic();

                window.console.log('user input data : ', this.userToLogin);
                if (this.formIsValid) {
                    window.console.log("dispatching login with payload");
                    let loginPromise = this.$store.dispatch('login', this.userToLogin);

                    loginPromise.then((response) => {
                        console.log(response);

                        let userInfoPromise = this.$store.dispatch('getUserKey');

                        userInfoPromise.then((infoResponse) => {
                            console.log(infoResponse);
                            this.resetLoadingLogic();
                            this.$router.push('/');
                        }).catch((infoError) => {
                            console.log(infoError);
                            console.log(infoError.response);
                            if (infoError.response !== undefined) {
                                this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.' + '\n' + infoError.response.data.detail;
                            } else {
                                this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.';
                            }

                            this.failedLoadingLogic();
                        });

                    }).catch((err) => {
                        console.log(err);
                        if (err.response) {
                            this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.' + err.response.data.detail;
                        } else {
                            this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.';
                        }
                        console.log(err.response);

                        this.failedLoadingLogic();
                    })
                } else {
                    this.loginFailed.message = 'لطفا اطلاعات خود را به درستی پر کنید...';
                    this.failedLoadingLogic();
                }
            },

            togglePassType: function () {

                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            toggleResetPassword: function () {
                this.resetLoadingLogic();
                this.loginOrReset = !this.loginOrReset;
            },

            resetPassword: function () {
                this.resetLoadingLogic();
                this.loginLoading.message = 'چند لحظه صبر کنید...'
                this.startLoadingLogic();
                if (this.resetPassEmailIsValid) {

                    let payload = {
                        "email": this.inputEmailForgetPass,
                    };
                    console.log('payload', payload);

                    this.sendResetPassRequest(payload).then(response => {
                        console.log(response);
                        this.loginSuccess.message = 'ایمیل فراموشی رمز برای شما ارسال شد. لطفا ایمیل خود را چک کنید'
                        this.successLoadingLogic();
                    }).catch(error => {
                        this.failedLoadingLogic();
                        console.log(error);
                        this.loginFailed.message = 'خطایی رخ داد'
                        if (error.response) {
                            console.log(error.response);
                            this.loginFailed.message += error.response.data
                        }
                    });

                } else {
                    this.failedLoadingLogic();
                    this.inputForgetEmailError = true;
                    this.loginFailed.message = 'لطفا یک ایمیل معتبر وارد کنید'
                }
            },
            sendResetPassRequest: function (payload) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'auth/password-reset/',
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
            }
        },
        mounted() {
            scrollTo(0, 0);
        },
    }

</script>

<style scoped>
    .forgetPassButton {
        margin-top: 15px;
    }

    .card-signup .header {
        padding: 15px 0 !important;

    }

    .page-header {
        min-height: 100vh;
    }

    .card-content {
        padding: 0 20px !important;
    }

    .customRegisterBtn {
        background: none !important;
        color: white !important;
        border: 1px solid white;
        transition: all 0.3s ease-in-out;
    }

    .customRegisterBtn:hover {
        background-color: white !important;
        color: #e91e63 !important;
    }
</style>
