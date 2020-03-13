<template>
    <div class="page-header"
         style="background-image: url('../../sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="card card-signup">
                        <form class="form" @submit.prevent="login()" v-if="loginOrReset">
                            <div class="header header-rose text-center">
                                <h4 class="card-title isansFont">
                                    ورود به حساب کاربری
                                    <br>
                                </h4>
                            </div>
                            <div class="card-content">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                            <div class="form-group gadugiFont isansFont">
                                                <input v-model="$v.userToLogin.email.$model"
                                                       class="form-control"
                                                       placeholder="ایمیل...">
                                                <span class="material-input"/>
                                                <span class="text-center isansFont text-danger" v-if="emailIsInvalid">
                                                    لطفا یک ایمیل معتبر وارد کنید
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group d-flex flex-row justify-content-between">
                                            <span class="input-group-addon">
                                                <i class="material-icons">lock</i>
                                            </span>
                                            <div class="form-group isansFont gadugiFont">
                                                <input v-model="$v.userToLogin.password.$model"
                                                       :type="passType"
                                                       placeholder="رمز عبور..."
                                                       class="form-control">
                                                <span class="material-input"/>
                                                <span class="text-center isansFont text-danger" v-if="passwordIsInvalid">
                                                    لطفا یک رمز عبور معتبر وارد کنید. حداقل 6 کاراکتر
                                                </span>
                                            </div>
                                            <span class="input-group-addon" style="border-left:0;">
                                                <button type="button" class="btn btn-xs btn-simple btn-fab btn-fab-mini btn-round" @click="togglePassType()">
                                                    <i class="material-icons" v-if="passType == 'password'">visibility</i>
                                                    <i class="material-icons" v-else>visibility_off</i>
                                                    <div class="ripple-container"/>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ورود">
                                    </div>
                                    <div class="col-sm-6 text-center">
                                        <button @click.prevent="toggleResetPassword()" class="forgetPassButton btn btn-rose isansFont btn-simple btn-sm">
                                            رمز عبور خود را فراموش کردم
                                        </button>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 text-center mt-10 mb-10">
                                        <router-link to="/register" class="isansFont text-rose">حساب کاربری ندارید؟ برای ایجاد کلیک کنید.</router-link>
                                    </div>
                                </div>

                            </div>
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
                                    <div class="form-group gadugiFont isansFont">
                                        <input v-model="$v.userToLogin.email.$model"
                                               class="form-control"
                                               placeholder="ایمیل خود را وارد کنید...">
                                        <span class="material-input"/>
                                        <span class="text-center isansFont text-danger" v-if="emailIsInvalid">
                                                لطفا یک ایمیل معتبر وارد کنید
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ارسال ایمیل فراموشی">
                                    </div>
                                    <div class="col-sm-6 text-center">
                                        <button @click.prevent="toggleResetPassword()" class="forgetPassButton btn btn-rose isansFont btn-simple btn-sm">
                                            ورود
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {required, email, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "Login",
        validations: {
            userToLogin: {
                email: { required, email, minLength: minLength(1) },
                password: { required, minLength: minLength(6) }
            },
        },

        data() {
            return {
                passType: 'password',
                userToLogin: {
                    email: 'hadi.tabatabaei.aut@gmail.com',
                    password: 'hadi1234',
                },
                loginOrReset: true,
                submitted: false,
            }
        },

        methods: {
            async login() {
                window.console.log('login pressed');
                this.$v.$touch();
                this.submitted = true;

                console.log(this.loginFormIsInvalid);

                if (!this.loginFormIsInvalid) {
                    window.console.log("dispatching login with payload");
                    try {
                        this.$loading(true);
                        await this.$store.dispatch('login', this.userToLogin);
                        this.printMessage("شما با موفقیت وارد شدید.", "ورود: موفق", "success", 3000, "notif");
                        this.$router.push('/user')
                    } catch (e) {
                        console.log(e.response);
                        if(e.response && e.response.data) {
                            this.printMessage(e.response.data.detail, "ورود: خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "ورود: خطا", "error", 3000, "notif");
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {
                    this.$loading(false);
                    this.printMessage("لطفا اطلاعات ورودی خود را کنترل کنید.", "ورود: اخطار", "warn", 3000, "notif");
                }
            },

            stringifyError(errorObj) {
                let string = '<br>';
                for (let item in errorObj) {
                    string += errorObj[item].join('<br>') + '<br>';
                }
                return string;
            },

            togglePassType() {
                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            toggleResetPassword() {
                this.loginOrReset = !this.loginOrReset;
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },

            async resetPassword() {
                this.$loading(true);
                this.submitted = true;
                if (!this.emailIsInvalid) {
                    try {
                        let resetResult = await axios.post(`${this.$store.getters.getApi}/auth/password-reset/`, {"email" : this.userToLogin.email} ,this.$store.getters.httpConfig);
                        this.printMessage("تا لحظاتی دیگر یک ایمیل حاوی مراحب دریافت رمز جدید برایتان ارسال می شود. لطفا پوشه اسپم خود را نیز چک کنید.", "بازیابی رمز عبور: موفق", "success", 6000, "notif");
                        this.$loading(false);
                        console.log(resetResult);
                    } catch(e) {
                        this.$loading(false);
                        console.log(e.response);
                        if(e.response.data) {
                            this.printMessage(this.stringifyError(e.response.data), "بازیابی رمز عبور: خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "بازیابی رمز عبور: خطا", "error", 3000, "notif");
                        }
                    }
                } else {
                    this.$loading(false);
                    this.printMessage("لطفا ایمیل خود را به درستی وارد کنید.", "بازیابی رمز عبور: اخطار", "warn", 3000, "notif");
                }
            },
        },
        computed: {
            loginFormIsInvalid() {
                return this.submitted && this.$v.userToLogin.$invalid;
            },

            emailIsInvalid() {
                return this.submitted && this.$v.userToLogin.email.$error;
            },

            passwordIsInvalid() {
                return this.submitted && this.$v.userToLogin.password.$error;
            }
        },

        mounted() {
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
</style>
