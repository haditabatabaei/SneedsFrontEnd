<template>
    <div class="page-header"
         style="background-image: url('../../sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2 col-sm-12">
                    <div class="card card-signup">
                        <h2 class="card-title text-center isansFont">ثبت نام</h2>
                        <h6 class="text-center">
                            <router-link to="/login" class="isansFont text-info">
                                حساب کاربری دارید؟ برای ورود کلیک کنید
                            </router-link>
                        </h6>
                        <div class="row">
                            <div class="col-md-12">
                                <form class="form" @submit.prevent="register()">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">email</i>
                                                    </span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                            v-model="$v.userToRegister.email.$model"
                                                            class="form-control gadugiFont isansFont"
                                                            name="email"
                                                            type="email"
                                                            placeholder="ایمیل">
                                                        <span class="material-input"/>
                                                        <span class="text-center isansFont text-danger" v-if="emailIsInvalid">
                                                            لطفا ایمیل خود را یک مقدار معتبر وارد کنید.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">phone</i>
                                                    </span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                            v-model="$v.userToRegister.phone_number.$model"
                                                            class="form-control gadugiFont isansFont"
                                                            name="phoneNumber"
                                                            placeholder="شماره تماس">
                                                        <span class="material-input"/>
                                                        <span class="text-center isansFont text-danger" v-if="phoneNumberIsInvalid">
                                                            لطفا شماره تماس خود را یک مقدار معتبر وارد کنید.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">lock</i>
                                                    </span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                v-model="$v.userToRegister.password.$model"
                                                                class="form-control gadugiFont isansFont"
                                                                name="phoneNumber"
                                                                type="password"
                                                                placeholder="رمز عبور">
                                                        <span class="material-input"/>
                                                        <span class="text-center isansFont text-danger" v-if="passwordIsInvalid">
                                                            لطفا رمز عبور خود را یک مقدار معتبر وارد کنید.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row actionRows">
                                            <div class="col-md-6 col-md-offset-3 text-center">
                                                <input type="submit" class="btn btn-rose isansFont" value="ثبت نام">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, email, minLength, helpers} from 'vuelidate/lib/validators'
    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig);
    export default {
        name: "Register",
        validations: {
            userToRegister: {
                email: {required, email, minLength: minLength(1)},
                phone_number: {required, iranianPhone, minLength: minLength(1)},
                password: {required, minLength: minLength(6)},
            },
        },
        data() {
            return {
                passType: 'password',
                userToRegister: {
                    email: 'hadi.tabatabaei.aut@gmail.com',
                    phone_number: '09031823553',
                    password: 'hadi1234',
                },
                submitted: false,
            }
        },
        methods: {

            togglePassType: function () {
                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            register: async function () {
                this.$v.$touch();
                this.submitted = true;

                if (!this.registerFormIsInvalid) {
                    try {
                        this.$loading(true);
                        await this.$store.dispatch('register', this.userToRegister);
                        this.printMessage("شما با موفقیت ثبت نام کردید ، به پروفایل خود منتقل خواهید شد.", "ثبت نام :‌ موفق", "success", 3000, "notif");
                        this.$router.push('/user');
                    } catch (e) {
                        console.log(e.response);
                        if(e.response.data) {
                            this.printMessage( this.stringifyError(e.response.data), "ثبت نام :‌ خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage( "خطایی هنگام ارتباط با سرور رخ داد.", "ثبت نام :‌ خطا", "error", 3000, "notif");
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {
                    this.$loading(false);
                    this.printMessage("لطفا اطلاعات خود را به درستی پر کنید...", "ثبت نام :‌ اخطار", "warn", 3000, "notif");
                }
            },

            stringifyError(errorObj) {
                let string = '<br>';
                for(let item in errorObj) {
                    string += errorObj[item].join('<br>') + '<br>';
                }
                return string;
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type : type,
                    duration: duration
                })
            },
        },
        computed: {
            registerFormIsInvalid() {
                return this.$v.userToRegister.$invalid;
            },

            emailIsInvalid() {
                return this.submitted && this.$v.userToRegister.email.$error;
            },

            phoneNumberIsInvalid() {
                return this.submitted && this.$v.userToRegister.phone_number.$error;
            },

            passwordIsInvalid() {
                return this.submitted && this.$v.userToRegister.password.$error;
            },
        },
        mounted() {
        }
        ,
    }
</script>

<style scoped>
    .page-header {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-header > .container {
        margin-bottom: 25px;
    }

    .card-signup .card-content {
        padding: 0 10px;
    }

    .filterCheckWrapper label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .filterCheckWrapper input[type="checkbox"] {
        width: 15px;
        height: 15px;
        margin: 5px;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .container {
        padding-top: 140px;
    }

    .card {
        margin-bottom: 0;
    }

    .page-header {
        height: initial;
    }

    span.check:before {
        margin-right: 10px !important;
        margin-left: -10px !important;
    }

    p.description {
        line-height: 25px;
        padding-left: 15px;
    }

    .row {
        margin-left: 0;
        margin-right: 0;
    }

    .actionRows {
        margin-bottom: 20px;
    }

    .englishInput {
        direction: ltr !important;
        text-align: right !important;
    }
</style>
