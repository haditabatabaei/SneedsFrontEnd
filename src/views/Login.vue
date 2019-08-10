<template>
    <div class="page-header"
         style="background-image: url('webimages/bg3.jpg'); background-size: cover; background-position: top center;">
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
                                              v-if="inputErrors.emailError">
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
                                              v-if="inputErrors.passwordError">
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

                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ورود">

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
                                        <span class="text-center isansFont text-danger" v-if="inputForgetEmailError">
                                                لطفا یک ایمیل معتبر وارد کنید
                                        </span>
                                    </div>
                                </div>

                                <div v-if="!loginSuccess.value" class="row">
                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ارسال ایمیل فراموشی">
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

                inputErrors: {
                    emailError: false,
                    passwordError: false,
                },

                inputForgetEmailError: false,
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
        methods: {
            /*
              Input : -
              Output : -
              Functionality : resets input errors object to default false value
            */
            resetInputErrors: function () {
                for (let errorProperty in this.inputErrors) {
                    if (this.inputErrors.hasOwnProperty(errorProperty)) {
                        this.inputErrors[errorProperty] = false;
                    }
                }
                this.inputForgetEmailError = false;
            },

            /*
              Input : -
              Output : true / false
              Functionality : checks whether all errors are false or not
            */
            userCanLogin: function () {
                for (let errorProperty in this.inputErrors) {
                    if (this.inputErrors.hasOwnProperty(errorProperty)) {
                        if (this.inputErrors[errorProperty] === true) {
                            return false;
                        }
                    }
                }
                return true;
            },

            /*
              Input : -
              Output : -
              Functionality : updates user errors upon user input and validation
            */
            inputsValidation: function () {
                if (this.userToLogin.email == null || this.userToLogin.email.length === 0 || !this.userToLogin.email.match(this.emailRegex)) {
                    this.inputErrors.emailError = true;
                }

                if (this.userToLogin.password == null || this.userToLogin.password.length === 0 || this.userToLogin.password.length !== 6) {
                    this.inputErrors.passwordError = true;
                }

            },

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


            isLoginFormValid: function () {
                //Resetting error object
                this.resetInputErrors();

                //update user validation errors
                this.inputsValidation();

                return this.userCanLogin();
            },

            login: function () {
                window.console.log('login pressed');

                //loading logic updated
                this.startLoadingLogic();

                let loginFormValid = this.isLoginFormValid();
                window.console.log("user login is valid : ", loginFormValid);
                window.console.log('user input data : ', this.userToLogin);

                if (loginFormValid) {
                    window.console.log("dispatching login with payload");
                    let loginPromise = this.$store.dispatch('login', this.userToLogin);

                    loginPromise.then((response) => {
                        console.log(response);

                        let userInfoPromise = this.$store.dispatch('getUserKey');

                        userInfoPromise.then((infoResponse) => {
                            console.log(infoResponse);

                            this.successLoadingLogic();
                            setTimeout(() => {
                                this.resetLoadingLogic();
                                this.$router.push('/');
                            }, 2000)
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
                        console.log(err.response);
                        if (err.response !== undefined) {
                            this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.' + '\n' + err.response.data.detail;
                        } else {
                            this.loginFailed.message = 'خطایی در ارتباط با سرور رخ داد.';
                        }

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
                this.resetInputErrors();
                this.resetLoadingLogic();
                this.loginOrReset = !this.loginOrReset;
            },
            resetPassword: function () {
                this.resetLoadingLogic();
                this.loginLoading.message = 'چند لحظه صبر کنید...'
                this.startLoadingLogic();
                if (this.inputEmailForgetPass != undefined && this.inputEmailForgetPass != null && this.inputEmailForgetPass.length != 0 && this.inputEmailForgetPass.match(this.emailRegex)) {

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
            }, sendResetPassRequest: function (payload) {
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
