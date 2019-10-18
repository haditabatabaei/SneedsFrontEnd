<template>
    <div class="page-header"
         style="background-image: url('http://195.248.243.68/sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
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

                                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="material-icons">email</i>
                  </span>
                                    <div class="form-group gadugiFont isansFont"
                                         :class="[{'form-danger' : $v.userToLogin.email.$error}, {'form-rose' : !$v.userToLogin.email.$dirty}, {'form-success' : !$v.userToLogin.email.$error}]">
                                        <input required
                                               v-model="$v.userToLogin.email.$model"
                                               class="form-control"
                                               placeholder="ایمیل...">
                                        <span class="material-input"></span>
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.userToLogin.email.$error">
                      لطفا یک ایمیل معتبر وارد کنید
                    </span>
                                    </div>
                                </div>

                                <div class="input-group d-flex flex-row justify-content-between">
									<span class="input-group-addon">
										<i class="material-icons">lock_outline</i>
                                    </span>

                                    <div class="form-group isansFont gadugiFont"
                                         :class="[{'form-danger' : $v.userToLogin.password.$error}, {'form-rose' : !$v.userToLogin.password.$dirty}, {'form-success' : !$v.userToLogin.password.$error}]">
                                        <input required
                                               v-model="$v.userToLogin.password.$model"
                                               :type="passType"
                                               placeholder="رمز عبور..."
                                               class="form-control">
                                        <span class="material-input"></span>

                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.userToLogin.password.$error">
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

                                <div class="row">

                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ورود"
                                               :disabled="$v.userToLogin.$anyError || !$v.userToLogin.$anyDirty" >
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

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <div class="form-group gadugiFont isansFont"
                                         :class="[{'form-danger' : $v.userToLogin.email.$error}, {'form-rose' : !$v.userToLogin.email.$dirty}, {'form-success' : !$v.userToLogin.email.$error}]">
                                        <input required
                                               v-model="$v.userToLogin.email.$model"
                                               class="form-control"
                                               placeholder="ایمیل خود را وارد کنید...">
                                        <span class="material-input"></span>
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.userToLogin.email.$error">
                                                لطفا یک ایمیل معتبر وارد کنید
                                        </span>
                                    </div>
                                </div>

                                <div class="row">
                                    <di class="col-sm-6 text-center">
                                            <input type="submit" class="btn btn-rose isansFont" value="ارسال ایمیل فراموشی"
                                                   :disabled="$v.userToLogin.email.$error || !$v.userToLogin.email.$dirty">
                                    </di>
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
    import {required, email, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "Login",
        validations: {
            userToLogin: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            },


        },
        data: function () {
            return {

                passType: 'password',

                emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

                userToLogin: {
                    email: '',
                    password: '',
                },

                loginOrReset: true,
            }
        },
        components: {RectNotifBlock},
        created() {

        },
        computed: {

        },
        methods: {

            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                scrollTo(0, 0);
            },


            login: function () {
                window.console.log('login pressed');

                this.$loading(true);
                if (!this.$v.userToLogin.$anyError) {
                    window.console.log("dispatching login with payload");
                    this.$store.dispatch('login', this.userToLogin).then((response) => {
                        this.$store.dispatch('getUserKey').then((infoResponse) => {
                            this.$notify({
                                group: 'notif',
                                duration: 3000,
                                type: 'success',
                                title : 'ورود : موفق',
                                text: 'شما با موفقیت وارد شدید.'
                            });
                            this.$router.push('/user/profile');
                        }).catch((infoError) => {
                            console.log(infoError);
                            console.log(infoError.response);


                            this.$notify({
                                group : 'notif',
                                duration: 3000,
                                type : 'error',
                                title: 'ورود : خطا',
                                text : 'خطایی در ارتباط با سرور رخ داد.' + infoError.response.data.detail
                            });

                        }).finally(() => {this.$loading(false);});

                    }).catch((err) => {
                        this.$notify({
                            group : 'notif',
                            duration: 3000,
                            type : 'error',
                            title: 'ورود : خطا',
                            text : 'خطایی در ارتباط با سرور رخ داد.' + err.response.data.detail
                        });
                        this.$loading(false);
                    })
                } else {
                    this.$loading(false);
                    this.$notify({
                        group : 'notif',
                        duration: 3000,
                        type : 'warn',
                        title : 'ورود : اخطار',
                        text : 'لطفا اطلاعات خود را به درستی پر کنید..'
                    });
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
                this.loginOrReset = !this.loginOrReset;
            },

            resetPassword: function () {
                this.$loading(true);
                if (!this.$v.userToLogin.email.$error) {
                    let payload = {
                        "email": this.userToLogin.email,
                    };
                    console.log('payload', payload);

                    this.sendResetPassRequest(payload).then(response => {
                        console.log(response);
                        this.$notify({
                            group : 'notif',
                            duration: 5000,
                            type : 'success',
                            title : 'بازیابی رمز عبور : موفق',
                            text : 'تا لحظات آینده یک ایمیل حاوی مراحل دریافت رمز جدید برایتان ارسال می شود. لطفا پوشه اسپم را نیز چک کنید.'
                        });
                    }).catch(error => {
                        console.log(error);

                        this.$notify({
                            group : 'notif',
                            duration: 3000,
                            type : 'error',
                            title : 'بازیابی رمز عبور : خطا',
                            text : 'خطایی هنگام ارتباط با سرور رخ داد'
                        });

                    }).finally(() => {this.$loading(false)});

                } else {
                    this.$loading(false);
                    this.$notify({
                        group : 'notif',
                        duration: 3000,
                        type : 'warn',
                        title : 'بازیابی رمز عبور : اخطار',
                        text : 'لطفا اطلاعات خود را به درستی پر کنید.'
                    });
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
